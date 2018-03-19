import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal } from './actions.js';

class NotStatic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoadCounter: 0,
            sliding: false,
            pos: 0,
            counter: 0,
            sliding: false,
            forward: false,
            backwards: false,
            noPrev: true,
            noNext: false,
            scrollPos: 0,
            scrollAtTop: true,
            scrollAtBottom: false,
            scrollingAllowed: false
        };
        this.prevImage = this.prevImage.bind(this)
        this.prevImageFrame = this.prevImageFrame.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.nextImageFrame = this.nextImageFrame.bind(this)
        this.scrollDown = this.scrollDown.bind(this)
        this.scrollUp = this.scrollUp.bind(this)
        this.scrollingDown = this.scrollingDown.bind(this)
        this.scrollingUp = this.scrollingUp.bind(this)
        this.scrollStop = this.scrollStop.bind(this)
    }

    componentDidMount() {
        this.props.windowMounted('notStatic');
        this.props.logInTerminal(`work > not static ~ activated`);
    }

    componentWillUnmount() {
        this.props.windowUnmounted('notStatic');
        this.props.logInTerminal(`work > not static ~ terminated`);
    }

    startBringingToFront(component) {
        if (this.refs.notStatic.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
            this.props.logInTerminal(`work > not static ~ selected`);
        }
    }

    prevImage() {
        if (!this.state.sliding && !this.state.noPrev) {
            this.setState({
                sliding: true,
                backwards: true,
                noNext: false
            }, () => {
                this.prevImageFrame()
                this.props.logInTerminal(`work > not static ~ previous frame selected`);
            })
        }
    }

    prevImageFrame() {
        if (this.state.counter < 690 && this.state.pos <= -5) {
            this.setState({
                pos: this.state.pos += 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.prevImageFrame);
            })
        } else {
            if (this.state.pos > -5) {
                this.setState({
                    noPrev: true
                })
            }
            this.setState({
                counter: 0,
                sliding: false,
                backwards: false
            })
            return;
        }
    }

    nextImage() {
        if (!this.state.sliding && !this.state.noNext) {
            this.setState({
                sliding: true,
                forward: true,
                noPrev: false
            }, () => {
                this.nextImageFrame()
                this.props.logInTerminal(`work > not static ~ next frame selected`);
            })
        }
    }

    nextImageFrame() {
        if (this.state.counter < 690 && this.state.pos >= -2065) {
            this.setState({
                pos: this.state.pos -= 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.nextImageFrame)
            })
        } else {
            if (this.state.pos < -2065) {
                this.setState({
                    noNext: true
                })
            }
            this.setState({
                counter: 0,
                sliding: false,
                forward: false
            })
            return;
        }
    }

    scrollDown() {
        if (!this.state.scrollAtBottom) {
            this.setState({
                scrollAtTop: false,
                scrollingAllowed: true
            }, () => {
                this.scrollingDown()
                this.props.logInTerminal(`work > not static ~ screenplay scrolling down`);
                this.refs.downButton.classList.add('videoControlSelected');
                this.refs.downArrow.classList.add('playing');
            })
        }
    }

    scrollingDown() {
        if (this.state.scrollingAllowed && this.state.scrollPos < 1750) {
            this.setState({
                scrollPos: this.state.scrollPos += 1
            }, () => {
                window.requestAnimationFrame(this.scrollingDown)
            })
        } else {
            if (this.state.scrollPos == 1750) {
                this.setState({
                    scrollingAllowed: false,
                    scrollAtBottom: true
                }, () => {
                    return;
                })
            }
        }
    }

    scrollUp() {
        if (!this.state.scrollAtTop) {
            this.setState({
                scrollAtBottom: false,
                scrollingAllowed: true
            }, () => {
                this.scrollingUp()
                this.props.logInTerminal(`work > not static ~ screenplay scrolling up`);
                this.refs.upButton.classList.add('videoControlSelected')
                this.refs.upArrow.classList.add('playing')
            })
        }
    }

    scrollingUp() {
        if (this.state.scrollingAllowed && this.state.scrollPos > 0) {
            this.setState({
                scrollPos: this.state.scrollPos -= 1
            }, () => {
                window.requestAnimationFrame(this.scrollingUp)
            })
        } else {
            if (this.state.scrollPos == 0) {
                this.setState({
                    scrollingAllowed: false,
                    scrollAtTop: true
                }, () => {
                    return;
                })
            }
        }
    }

    scrollStop(x) {
        this.setState({
            scrollingAllowed: false
        }, () => {
            this.refs[`${x}Button`].classList.remove('videoControlSelected')
            this.refs[`${x}Arrow`].classList.remove('playing')
        })
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'notStatic') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'notStatic') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'notStatic')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('notStatic'); this.props.handleMouseDown(e, 'notStatic')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window notStatic" ref="notStatic">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('notStatic')}>Esc</a>
                    <p className="windowTitle">Not Static</p>
                </div>

                <div className="notStaticScrollWrap">
                    <div style={{left: this.state.pos + 'px'}} className="notStaticImageWrapper" ref="notStaticImageWrapper">
                        <div className="notStaticImageWrap">
                            <img className="notStaticImage" src="images/notStatic1.jpg" alt="notStatic"/>
                        </div>
                        <div className="notStaticImageWrap">
                            <img className="notStaticImage" src="images/notStatic2.jpg" alt="notStatic"/>
                        </div>
                        <div className="notStaticImageWrap">
                            <img className="notStaticImage" src="images/notStatic3.jpg" alt="notStatic"/>
                        </div>
                        <div className="notStaticImageWrap">
                            <img className="notStaticImage" src="images/notStatic4.jpg" alt="notStatic"/>
                        </div>
                    </div>
                </div>

                <div className="notStaticTextWrap">
                    <div ref="scroll" id="notStaticText">
                        <div style={{bottom: this.state.scrollPos + 'px'}}>
                            <br/>
                            <p>Scene 1</p>
                            <br/>
                            <p>INT. BADLY LIT ROOM</p>
                            <p>Room contains wooden table. A whiskey glass is the only object on it.</p>
                            <p>overhead shot of whiskey glass on the table</p>
                            <p>side shot of whiskey glass, hand picks glass up (takes glass out of frame) drinks and then puts the glass back down</p>
                            <br/>
                            <p>Character (C) - The personified concept of Untitled 67 (Not Static).</p>
                            <br/>
                            <p>C: It’s a strange thing, beauty. Something that is aesthetically pleasing. Easy on the eye. To achieve beauty requires a lot of time. I need to build myself up, I need to remove excess and I need to be clean.</p>
                            <br/>
                            <p>takes a drink</p>
                            <br/>
                            <p>C: I am a particular space that compliments my figure.</p>
                            <br/>
                            <p>EXT. RAILWAY ARCH - DAY (SUNNY)</p>
                            <p>An uninhabited railway arch</p>
                            <p>far away shot, slowly moving towards</p>
                            <br/>
                            <p>CLOSE UP</p>
                            <p>cathode ray tube, text appears on screen, text reads <br/> > 185.4 miles</p>
                            <br/>
                            <br/>
                            <p>Scene 2</p>
                            <br/>
                            <p>EXT. OBSCENE GREEN WALL - DAY (SUNNY)</p>
                            <p>Wall is at the end of a street.</p>
                            <p>shot of green wall from the road</p>
                            <p>POV shot of C walking along the pavement with the wall on the left</p>
                            <br/>
                            <p>C: People say that beauty is in the eye of the beholder. But that’s rubbish, everyone knows when something is truly exquisite. It’s undeniable.</p>
                            <br/>
                            <p>INT. BADLY LIT ROOM</p>
                            <p>Whiskey glass is sat on the wooden table.</p>
                            <p>overhead whiskey shot</p>
                            <br/>
                            <p>C: Now that is beauty.</p>
                            <br/>
                            <p>EXT. RAILWAY ARCH - DAY (SUNNY)</p>
                            <p>An uninhabited railway arch</p>
                            <p>middle distance shot, slowly moving towards</p>
                            <br/>
                            <p>CLOSE UP</p>
                            <p>cathode ray tube, text appears on screen, text reads <br/> > 316kg</p>
                            <p>text removed</p>
                            <br/>
                            <br/>
                            <p>Scene 3</p>
                            <br/>
                            <p>INT. BADLY LIT ROOM</p>
                            <p>cut to shot of a hand drawing a circle in a notebook with pencil</p>
                            <br/>
                            <p>C: It’s a labour of love.</p>
                            <br/>
                            <p>keep showing clips of new circles being drawn</p>
                            <p>splice in close ups of cathode ray tubes but reduce throughout</p>
                            <p>circle clips keep repeating, getting faster and faster and building to a climax</p>
                            <br/>
                            <p>EXT. RAILWAY ARCH - DAY (OVERCAST)</p>
                            <p>An uninhabited railway arch</p>
                            <p>close shot, slowly moving towards</p>
                            <p>suddenly cuts to black</p>
                            <br/>
                            <br/>
                            <p>Scene 4</p>
                            <br/>
                            <p>SCREEN IS BLACK</p>
                            <br/>
                            <p>C: I can’t reach this. I’m moving towards a horizon that keeps on moving away from me. If there is a horizon then I am it. Am I just everything that I can see? Or am I more?</p>
                            <br/>
                            <p>CLOSE UP</p>
                            <p>cathode ray tube, text appears on screen, text reads <br/> > 60 days</p>
                            <br/>
                            <br/>
                            <p>Scene 5</p>
                            <br/>
                            <p>EXT. OBSCENE GREEN WALL - DAY (OVERCAST)</p>
                            <p>Wall is at the end of a street.</p>
                            <p>POV shot of C walking along the pavement with the wall on the left, camera turns to look at the wall</p>
                            <p>cut to shot of whole wall</p>
                            <p>back to POV, looks away from the wall</p>
                            <br/>
                            <p>EXT. OBSCENE GREEN WALL - DAY (SUNNY)</p>
                            <p>cut to shot of whole wall again</p>
                            <br/>
                            <br/>
                            <p>End.</p>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div id="notStaticTextControlWrap">

                        <div ref="upButton" className="videoControlsOption"
                             onMouseDown={() => this.scrollUp()}
                             onMouseUp={() => this.scrollStop('up')}
                        >
                            <div ref="upArrow" className="playIcon"></div>
                        </div>

                        <div ref="downButton" className="videoControlsOption"
                             onMouseDown={() => this.scrollDown()}
                             onMouseUp={() => this.scrollStop('down')}
                        >
                            <div ref="downArrow" className="playIcon"></div>
                        </div>

                    </div>
                </div>

                <div className="notStaticControlWrap">
                    {!this.state.backwards &&
                        <div className="videoControlsOption" onClick={() => this.prevImage()}>
                            <div className="playIcon" id="previous"></div>
                        </div>
                    }

                    {this.state.backwards &&
                        <div className="videoControlsOption videoControlSelected">
                            <div className="playIcon playing" id="previous"></div>
                        </div>
                    }

                    {!this.state.forward &&
                        <div className="videoControlsOption" onClick={() => this.nextImage()}>
                            <div className="playIcon"></div>
                        </div>
                    }

                    {this.state.forward &&
                        <div className="videoControlsOption videoControlSelected">
                            <div className="playIcon playing"></div>
                        </div>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topZIndex: state.topZIndex,
        allZIndex: state.allZIndex,
        worksVisible: state.worksVisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        windowMounted(component) {
            dispatch(windowMounted(component))
        },

        windowUnmounted(component) {
            dispatch(windowUnmounted(component))
        },

        bringWindowToFront(component) {
            dispatch(bringWindowToFront(component))
        },

        toggleWork(work) {
            dispatch(toggleWork(work))
        },

        logInTerminal(message) {
            dispatch(logInTerminal(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotStatic)

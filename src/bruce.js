import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal} from './actions.js';

class Bruce extends React.Component {
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
            noNext: false
        };
        this.prevImage = this.prevImage.bind(this)
        this.prevImageFrame = this.prevImageFrame.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.nextImageFrame = this.nextImageFrame.bind(this)
    }

    componentDidMount() {
        this.props.windowMounted('bruce');
        this.props.logInTerminal(`work > the worst bruce nauman in scotland ~ activated`);
    }

    componentWillUnmount() {
        this.props.windowUnmounted('bruce');
        this.props.logInTerminal(`work > the worst bruce nauman in scotland ~ terminated`);
    }

    startBringingToFront() {
        if (this.refs.bruce.style.zIndex != this.props.topZIndex) {
            console.log('fucking melt');
            this.props.bringWindowToFront('bruce');
            this.props.logInTerminal(`work > bruce ~ selected`);
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
                this.props.logInTerminal(`work > the worst bruce nauman in scotland ~ previous frame selected`);
            })
        }
    }

    prevImageFrame() {
        if (this.state.counter < 602 && this.state.pos <= -5) {
            this.setState({
                pos: this.state.pos += 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.prevImageFrame)
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
                this.props.logInTerminal(`work > the worst bruce nauman in scotland ~ next frame selected`);
            })
        }
    }

    nextImageFrame() {
        if (this.state.counter < 602 && this.state.pos >= -1205) {
             this.setState({
                pos: this.state.pos -= 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.nextImageFrame)
            })
        } else {
            if (this.state.pos < -1205) {
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


    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'bruce') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'bruce') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'bruce')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront(); this.props.handleMouseDown(e, 'bruce')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window bruce" ref="bruce">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('bruce')}>Esc</a>
                    <p className="windowTitle">The Worst Bruce Nauman in Scotland</p>
                </div>

                <div className="bruceScrollWrap">
                    <div style={{left: this.state.pos + 'px'}} className="bruceImageWrapper" ref="bruceImageWrapper">
                        <img className="bruceImage" src="images/nauman2.jpg" alt="bruce"/>
                        <img className="bruceImage" src="images/nauman1.jpg" alt="bruce"/>
                        <div className="toiletWrapper">
                            <img className="bruceImage" src="images/toilet_t.jpg" alt="bruce"/>
                            <img className="bruceImage" src="images/toilet_l.jpg" alt="bruce"/>
                        </div>
                    </div>
                </div>


                <div className="bruceControlWrap">
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

export default connect(mapStateToProps, mapDispatchToProps)(Bruce)

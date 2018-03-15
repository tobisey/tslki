import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';

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
            backwards: false
        };
        this.prevImage = this.prevImage.bind(this)
        this.prevImageFrame = this.prevImageFrame.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.nextImageFrame = this.nextImageFrame.bind(this)
    }

    componentDidMount() {
        this.props.windowMounted('notStatic');
    }

    componentWillUnmount() {
        this.props.windowUnmounted('notStatic');
    }

    startBringingToFront(component) {
        if (this.refs.notStatic.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    prevImage() {
        if (!this.state.sliding) {
            this.setState({
                sliding: true,
                backwards: true
            }, () => {
                this.prevImageFrame()
            })
        }
    }

    prevImageFrame() {
        if (this.state.counter < 690 && this.state.pos <= -5) {
            console.log(this.state.pos, this.state.counter);
            this.setState({
                pos: this.state.pos += 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.prevImageFrame)
            })
        } else {
            this.setState({
                counter: 0,
                sliding: false,
                backwards: false
            })
            return;
        }
    }

    nextImage() {
        if (!this.state.sliding) {
            this.setState({
                sliding: true,
                forward: true
            }, () => {
                this.nextImageFrame()
            })
        }
    }

    nextImageFrame() {
        if (this.state.counter < 690 && this.state.pos >= -2065) {
            console.log(this.state.pos, this.state.counter);
            this.setState({
                pos: this.state.pos -= 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.nextImageFrame)
            })
        } else {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotStatic)

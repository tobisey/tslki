import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';

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
            backwards: false
        };
        this.prevImage = this.prevImage.bind(this)
        this.prevImageFrame = this.prevImageFrame.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.nextImageFrame = this.nextImageFrame.bind(this)
    }

    componentDidMount() {
        this.props.windowMounted('bruce');
        setTimeout(() => {
            this.refs.bruce.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('bruce');
    }

    startBringingToFront(component) {
        if (this.refs.bruce.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    imageOnLoad() {
        this.setState({ imageLoadCounter: this.state.imageLoadCounter += 1}, () => {
            if (this.state.imageLoadCounter === 2) {
                this.setState({
                    widthToScroll: document.getElementsByClassName('bruceImageWrapper')[0].scrollWidth - 600
                }, () => {
                    console.log(this.state.widthToScroll);
                })
            }
        })
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
        if (this.state.counter < 602 && this.state.pos <= -5) {
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
        if (this.state.counter < 602 && this.state.pos >= -1205) {
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

        this.props.worksVisible.map(work => {
            if (work.name == 'bruce') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'bruce')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('bruce'); this.props.handleMouseDown(e, 'bruce')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window bruce" ref="bruce">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('bruce')}>Esc</a>
                    <p className="windowTitle">The Worst Bruce Nauman in Scotland</p>
                </div>

                <div className="bruceScrollWrap">
                    <div style={{left: this.state.pos + 'px'}} className="bruceImageWrapper" ref="bruceImageWrapper">
                        <img className="bruceImage" onLoad={() => this.imageOnLoad()} src="images/nauman2.jpg" alt="bruce"/>
                        <img className="bruceImage" onLoad={() => this.imageOnLoad()} src="images/nauman1.jpg" alt="bruce"/>
                        <div className="toiletWrapper">
                            <img className="bruceImage" onLoad={() => this.imageOnLoad()} src="images/toilet_t.jpg" alt="bruce"/>
                            <img className="bruceImage" onLoad={() => this.imageOnLoad()} src="images/toilet_l.jpg" alt="bruce"/>
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
        allZIndex: state. allZIndex,
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

export default connect(mapStateToProps, mapDispatchToProps)(Bruce)

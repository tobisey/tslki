import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class ThatKilledMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoadCounter: 0,
            sliding: false,
            pos: 0,
            counter: 0,
            currImg: 1,
            sliding: false,
            forward: false,
            backwards: false,
            noPrev: true,
            noNext: false
        };
        this.prevImage = this.prevImage.bind(this)
        this.prevImageFrame = this.prevImageFrame.bind(this)
        this.prevImageFramePano = this.prevImageFramePano.bind(this)
        this.nextImage = this.nextImage.bind(this)
        this.nextImageFrame = this.nextImageFrame.bind(this)
        this.nextImageFramePano = this.nextImageFramePano.bind(this)
    }

    componentDidMount() {
        this.props.windowMounted('thatKilledMe');
        this.props.logInTerminal(`work > that killed me ~ activated`);
        var vid = document.getElementsByClassName('vid')[0];
        vid.volume = 0.8;
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('thatKilledMe');
                }, 1000)
            }
        }
        var slideShow = document.getElementsByClassName('slideShow')[0];
        slideShow.play();
    }

    componentWillUnmount() {
        this.props.windowUnmounted('thatKilledMe');
        this.props.resetVid('thatKilledMe');
        this.props.logInTerminal(`work > that killed me ~ terminated`);
    }

    startBringingToFront() {
        if (this.refs.thatKilledMe.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront('thatKilledMe');
            this.props.logInTerminal(`work > that killed me ~ selected`);
        }
    }

    prevImage() {
        if (!this.state.sliding && !this.state.noPrev) {
            this.setState({
                sliding: true,
                backwards: true,
                noNext: false
            }, () => {
                if (this.state.currImg == 2) {
                    this.prevImageFramePano();
                    this.props.logInTerminal(`work > that killed me ~ previous frame selected`);

                } else {
                    this.prevImageFrame();
                    this.props.logInTerminal(`work > that killed me ~ previous frame selected`);
                }
            })
        }
    }

    prevImageFramePano() {
        if (this.state.counter < 1566 && this.state.pos <= -5) {
            this.setState({
                pos: this.state.pos += 2,
                counter: this.state.counter += 2
            }, () => {
                window.requestAnimationFrame(this.prevImageFramePano)
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
                backwards: false,
                currImg: this.state.currImg -= 1
            })
            return;
        }
    }

    prevImageFrame() {
        if (this.state.counter < 602.5 && this.state.pos <= -5) {
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
                backwards: false,
                currImg: this.state.currImg -= 1
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
                if (this.state.currImg == 1) {
                    this.nextImageFramePano();
                    this.props.logInTerminal(`work > that killed me ~ next frame selected`);

                } else {
                    this.nextImageFrame();
                    this.props.logInTerminal(`work > that killed me ~ next frame selected`);
                }
            })
        }
    }

    nextImageFramePano() {
        if (this.state.counter < 1566 && this.state.pos >= -3381) {
             this.setState({
                pos: this.state.pos -= 2,
                counter: this.state.counter += 2
            }, () => {
                window.requestAnimationFrame(this.nextImageFramePano)
            })
        } else {
            if (this.state.pos < -3380) {
                this.setState({
                    noNext: true
                })
            }
            this.setState({
                counter: 0,
                sliding: false,
                forward: false,
                currImg: this.state.currImg += 1
            })
            return;
        }
    }

    nextImageFrame() {
        if (this.state.counter < 602.5 && this.state.pos >= -3381) {
             this.setState({
                pos: this.state.pos -= 5,
                counter: this.state.counter += 5
            }, () => {
                window.requestAnimationFrame(this.nextImageFrame)
            })
        } else {
            if (this.state.pos < -3380) {
                this.setState({
                    noNext: true
                })
            }
            this.setState({
                counter: 0,
                sliding: false,
                forward: false,
                currImg: this.state.currImg += 1
            })
            return;
        }
    }

    rrVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'thatKilledMe') {
                if (work.playing || work.paused) {
                    this.refs.thatKilledMeVid.currentTime -= 5;
                    this.props.logInTerminal(`work > that killed me ~ video rewind`);
                    setTimeout(() => {
                        this.props.stopRr('thatKilledMe');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.thatKilledMeVid.play();
        this.props.logInTerminal(`work > that killed me ~ video play`);
    }

    pauseVids() {
        this.refs.thatKilledMeVid.pause();
        this.props.logInTerminal(`work > that killed me ~ video pause`);
    }

    stopVids() {
        this.refs.thatKilledMeVid.currentTime = 0;
        this.refs.thatKilledMeVid.pause();
        this.props.logInTerminal(`work > that killed me ~ video stop`);
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'thatKilledMe') {
                if (work.playing || work.paused) {
                    this.refs.thatKilledMeVid.currentTime += 5;
                    this.props.logInTerminal(`work > that killed me ~ video fast-forward`);
                    setTimeout(() => {
                        this.props.stopRr('thatKilledMe');
                    }, 200)
                }
            }
        })
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'thatKilledMe') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'thatKilledMe') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'thatKilledMe')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront(); this.props.handleMouseDown(e, 'thatKilledMe')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window thatKilledMe" ref="thatKilledMe">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('thatKilledMe')}>Esc</a>
                    <p className="windowTitle">That Killed Me</p>
                </div>

                <div className="thatKilledMeScrollWrap">
                    <div style={{left: this.state.pos + 'px'}} className="thatKilledMeImageWrapper" ref="thatKilledMeImageWrapper">
                        <img className="thatKilledMeImagePano" src="images/TKM1.jpg" alt="thatKilledMe"/>
                        <div className="thatKilledMeImageWrap">
                            <img className="thatKilledMeImage" src="images/TKM2.jpg" alt="thatKilledMe"/>
                        </div>
                        <div className="thatKilledMeImageWrap">
                            <img className="thatKilledMeImage" src="images/TKM3.jpg" alt="thatKilledMe"/>
                        </div>
                        <div className="thatKilledMeImageWrap">
                            <img className="thatKilledMeImage" src="images/TKM4.jpg" alt="thatKilledMe"/>
                        </div>
                        <div className="thatKilledMeImageWrap">
                            <img className="thatKilledMeImage" src="images/TKM5.jpg" alt="thatKilledMe"/>
                        </div>
                    </div>
                </div>


                <div className="thatKilledMeControlWrap">
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

                <div className="thatKilledMeCarmWrap">

                <video className="thatKilledMeVid vid" ref="thatKilledMeVid" src="/videos/thatKilledMeComp.mp4" width="614px" height="345px"></video>

                    <div className="videoControls">

                        <div className="buttons">
                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'thatKilledMe' && work.rr === false) {
                                return <div className="videoControlsOption" ref="rr"
                                onClick={() => {this.rrVids(); this.props.rr('thatKilledMe')}}>
                                <div className="rrIcon"></div>
                                <div className="rrIcon"></div>
                                </div>
                            } else if (work.name === 'thatKilledMe' && work.rr) {
                                return <div className="videoControlsOption videoControlSelected" ref="rr">
                                <div className="rrIcon rring"></div>
                                <div className="rrIcon rring"></div>
                                </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'thatKilledMe' && work.playing === false) {
                                return <div className="videoControlsOption" ref="play"
                                onClick={() => {this.playVids(); this.props.playing('thatKilledMe')}}>
                                <div className="playIcon"></div>
                                </div>
                            } else if (work.name === 'thatKilledMe' && work.playing) {
                                return <div className="videoControlsOption videoControlSelected" ref="play">
                                <div className="playIcon playing"></div>
                                </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'thatKilledMe' && work.paused === false) {
                                return <div className="videoControlsOption" ref="pause"
                                onClick={() => {this.pauseVids(); this.props.paused('thatKilledMe')}}>
                                <div className="pauseIcon"></div>
                                <div className="pauseIcon"></div>
                                </div>
                            } else if (work.name === 'thatKilledMe' && work.paused) {
                                return <div className="videoControlsOption videoControlSelected" ref="pause">
                                <div className="pauseIcon pausedStopped"></div>
                                <div className="pauseIcon pausedStopped"></div>
                                </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'thatKilledMe' && work.stopped === false) {
                                return <div className="videoControlsOption" ref="stop"
                                onClick={() => {this.stopVids(); this.props.stopped('thatKilledMe')}}>
                                <div className="stopIcon"></div>
                                </div>
                            } else if (work.name === 'thatKilledMe' && work.stopped) {
                                return <div className="videoControlsOption videoControlSelected" ref="stop">
                                <div className="stopIcon pausedStopped"></div>
                                </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'thatKilledMe' && work.ff === false) {
                                return <div className="videoControlsOption" ref="ff"
                                onClick={() => {this.ffVids(); this.props.ff('thatKilledMe')}}>
                                <div className="ffIcon"></div>
                                <div className="ffIcon"></div>
                                </div>
                            } else if (work.name === 'thatKilledMe' && work.ff) {
                                return <div className="videoControlsOption videoControlSelected" ref="ff">
                                <div className="ffIcon ffing"></div>
                                <div className="ffIcon ffing"></div>
                                </div>
                            }
                        })}
                        </div>

                        <div className="timeWrap">
                            <p className="time" ref="time">0.00%</p>
                        </div>

                    </div>
                </div>

                <div className="slideShowWrap">
                    <video loop className='slideShow' ref="slideShow" src="/videos/slideshowTSLKI.mp4" width="400px" height="299px"></video>
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
        },

        rr(component) {
            dispatch(rr(component))
        },

        stopRr(component) {
            dispatch(stopRr(component))
        },

        playing(component) {
            dispatch(playing(component))
        },

        paused(component) {
            dispatch(paused(component))
        },

        stopped(component) {
            dispatch(stopped(component))
        },

        ff(component) {
            dispatch(ff(component))
        },

        stopFf(component) {
            dispatch(stopFf(component))
        },

        resetVid(component) {
            dispatch(resetVid(component))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThatKilledMe)

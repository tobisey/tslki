import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class PoolTable extends React.Component {
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
        this.props.windowMounted('poolTable');
        this.props.logInTerminal(`work > pool table ~ activated`);
        var vid = document.getElementsByClassName('vid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('poolTable');
                }, 1000)
            }
        }
    }

    componentWillUnmount() {
        this.props.windowUnmounted('poolTable');
        this.props.resetVid('poolTable');
        this.props.logInTerminal(`work > pool table ~ terminated`);
    }

    startBringingToFront(component) {
        if (this.refs.poolTable.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
            this.props.logInTerminal(`work > pool table ~ selected`);
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
                this.props.logInTerminal(`work > pool table ~ previous frame selected`);
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
                this.props.logInTerminal(`work > pool table ~ next frame selected`);
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

    rrVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'poolTable') {
                if (work.playing || work.paused) {
                    this.refs.poolTableVidOne.currentTime -= 5;
                    this.refs.poolTableVidTwo.currentTime -= 5;
                    this.props.logInTerminal(`work > pool table ~ video rewind`);
                    setTimeout(() => {
                        this.props.stopRr('poolTable');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.poolTableVidOne.play();
        this.refs.poolTableVidTwo.play();
        this.props.logInTerminal(`work > pool table ~ video play`);
    }

    pauseVids() {
        this.refs.poolTableVidOne.pause();
        this.refs.poolTableVidTwo.pause();
        this.props.logInTerminal(`work > pool table ~ video pause`);
    }

    stopVids() {
        this.refs.poolTableVidOne.currentTime = 0;
        this.refs.poolTableVidTwo.currentTime = 0;
        this.refs.poolTableVidOne.pause();
        this.refs.poolTableVidTwo.pause();
        this.props.logInTerminal(`work > pool table ~ video stop`);
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'poolTable') {
                if (work.playing || work.paused) {
                    this.refs.poolTableVidOne.currentTime += 5;
                    this.refs.poolTableVidTwo.currentTime += 5;
                    this.props.logInTerminal(`work > pool table ~ video fast-forward`);
                    setTimeout(() => {
                        this.props.stopRr('poolTable');
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
            if (work.name == 'poolTable') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'poolTable') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'poolTable')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('poolTable'); this.props.handleMouseDown(e, 'poolTable')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window poolTable" ref="poolTable">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('poolTable')}>Esc</a>
                    <p className="windowTitle">Pool Table</p>
                </div>

                <div className="poolTableScrollWrap">
                    <div style={{left: this.state.pos + 'px'}} className="poolTableImageWrapper" ref="poolTableImageWrapper">
                        <div className="poolTableImageWrap">
                            <img className="poolTableImage" src="images/pT1.jpg" alt="poolTable"/>
                        </div>
                        <div className="poolTableImageWrap">
                            <img className="poolTableImage" src="images/pT2.jpg" alt="poolTable"/>
                        </div>
                        <div className="poolTableImageWrap">
                            <img className="poolTableImage" src="images/pT3.jpg" alt="poolTable"/>
                        </div>
                        <div className="poolTableImageWrap">
                            <img className="poolTableImage" src="images/pT4.jpg" alt="poolTable"/>
                        </div>
                    </div>
                </div>

                <div className="poolTableControlWrap">
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

                <div className="poolTableVidWindow">

                    <div className="poolTableVids">
                        <div className="poolTableVidWrap">
                            <video className="vid" ref='poolTableVidOne' src="/videos/poolTableVidLeft.mp4" width="320px" height="240px"></video>
                        </div>
                        <div className="poolTableVidWrap">
                            <video ref='poolTableVidTwo' src="/videos/poolTableVidRight.mp4" width="320px" height="240px"></video>
                        </div>
                    </div>

                    <div className="videoControls">

                        <div className="buttons">
                            {this.props.worksVisible && this.props.worksVisible.map(work => {
                                if (work.name === 'poolTable' && work.rr === false) {
                                    return <div className="videoControlsOption" ref="rr"
                                                onClick={() => {this.rrVids(); this.props.rr('poolTable')}}>
                                                <div className="rrIcon"></div>
                                                <div className="rrIcon"></div>
                                           </div>
                                } else if (work.name === 'poolTable' && work.rr) {
                                    return <div className="videoControlsOption videoControlSelected" ref="rr">
                                                <div className="rrIcon rring"></div>
                                                <div className="rrIcon rring"></div>
                                           </div>
                                }
                            })}

                            {this.props.worksVisible && this.props.worksVisible.map(work => {
                                if (work.name === 'poolTable' && work.playing === false) {
                                    return <div className="videoControlsOption" ref="play"
                                                onClick={() => {this.playVids(); this.props.playing('poolTable')}}>
                                                <div className="playIcon"></div>
                                           </div>
                                } else if (work.name === 'poolTable' && work.playing) {
                                    return <div className="videoControlsOption videoControlSelected" ref="play">
                                                <div className="playIcon playing"></div>
                                           </div>
                                }
                            })}

                            {this.props.worksVisible && this.props.worksVisible.map(work => {
                                if (work.name === 'poolTable' && work.paused === false) {
                                    return <div className="videoControlsOption" ref="pause"
                                                onClick={() => {this.pauseVids(); this.props.paused('poolTable')}}>
                                                <div className="pauseIcon"></div>
                                                <div className="pauseIcon"></div>
                                           </div>
                                } else if (work.name === 'poolTable' && work.paused) {
                                    return <div className="videoControlsOption videoControlSelected" ref="pause">
                                                <div className="pauseIcon pausedStopped"></div>
                                                <div className="pauseIcon pausedStopped"></div>
                                           </div>
                                }
                            })}

                            {this.props.worksVisible && this.props.worksVisible.map(work => {
                                if (work.name === 'poolTable' && work.stopped === false) {
                                    return <div className="videoControlsOption" ref="stop"
                                                onClick={() => {this.stopVids(); this.props.stopped('poolTable')}}>
                                                <div className="stopIcon"></div>
                                           </div>
                                } else if (work.name === 'poolTable' && work.stopped) {
                                    return <div className="videoControlsOption videoControlSelected" ref="stop">
                                                <div className="stopIcon pausedStopped"></div>
                                           </div>
                                }
                            })}

                            {this.props.worksVisible && this.props.worksVisible.map(work => {
                                if (work.name === 'poolTable' && work.ff === false) {
                                    return <div className="videoControlsOption" ref="ff"
                                                onClick={() => {this.ffVids(); this.props.ff('poolTable')}}>
                                                <div className="ffIcon"></div>
                                                <div className="ffIcon"></div>
                                           </div>
                                } else if (work.name === 'poolTable' && work.ff) {
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

export default connect(mapStateToProps, mapDispatchToProps)(PoolTable)

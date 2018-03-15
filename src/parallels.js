import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid, logInTerminal } from './actions.js';

class Parallels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('parallels');
        this.props.logInTerminal(`work > parallels ~ active`);
    }

    componentWillUnmount() {
        this.props.windowUnmounted('parallels');
        this.props.resetVid('parallels');
        this.props.logInTerminal(`work > parallels ~ inactive`);
    }

    startBringingToFront(component) {
        if (this.refs.parallels.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    rrVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'parallels') {
                if (work.playing || work.paused) {
                    this.refs.paraVidOne.currentTime -= 5;
                    this.refs.paraVidTwo.currentTime -= 5;
                    setTimeout(() => {
                        this.props.stopRr('parallels');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.paraVidOne.play();
        this.refs.paraVidTwo.play();
    }

    pauseVids() {
        this.refs.paraVidOne.pause();
        this.refs.paraVidTwo.pause();
    }

    stopVids() {
        this.refs.paraVidOne.currentTime = 0;
        this.refs.paraVidTwo.currentTime = 0;
        this.refs.paraVidOne.pause();
        this.refs.paraVidTwo.pause();
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'parallels') {
                if (work.playing || work.paused) {
                    this.refs.paraVidOne.currentTime += 5;
                    this.refs.paraVidTwo.currentTime += 5;
                    setTimeout(() => {
                        this.props.stopRr('parallels');
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
            if (work.name == 'parallels') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'parallels') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'parallels')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('parallels'); this.props.handleMouseDown(e, 'parallels')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="parallels" ref="parallels">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('parallels')}>Esc</a>
                    <p className="windowTitle">Parallels</p>
                </div>
                <div className="paraVids">
                    <div className="paraVidWrap">
                        <video className="vid" ref='paraVidOne' src="/videos/para-one.mp4" width="571px" height="311px" loop></video>
                    </div>
                    <div className="paraVidWrap">
                        <video ref='paraVidTwo' src="/videos/para-two.mp4" width="571px" height="311px" loop></video>
                    </div>
                </div>
                <div className="videoControls">

                    <div className="buttons">
                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'parallels' && work.rr === false) {
                                return <div className="videoControlsOption" ref="rr"
                                            onClick={() => {this.rrVids(); this.props.rr('parallels')}}>
                                            <div className="rrIcon"></div>
                                            <div className="rrIcon"></div>
                                       </div>
                            } else if (work.name === 'parallels' && work.rr) {
                                return <div className="videoControlsOption videoControlSelected" ref="rr">
                                            <div className="rrIcon rring"></div>
                                            <div className="rrIcon rring"></div>
                                       </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'parallels' && work.playing === false) {
                                return <div className="videoControlsOption" ref="play"
                                            onClick={() => {this.playVids(); this.props.playing('parallels')}}>
                                            <div className="playIcon"></div>
                                       </div>
                            } else if (work.name === 'parallels' && work.playing) {
                                return <div className="videoControlsOption videoControlSelected" ref="play">
                                            <div className="playIcon playing"></div>
                                       </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'parallels' && work.paused === false) {
                                return <div className="videoControlsOption" ref="pause"
                                            onClick={() => {this.pauseVids(); this.props.paused('parallels')}}>
                                            <div className="pauseIcon"></div>
                                            <div className="pauseIcon"></div>
                                       </div>
                            } else if (work.name === 'parallels' && work.paused) {
                                return <div className="videoControlsOption videoControlSelected" ref="pause">
                                            <div className="pauseIcon pausedStopped"></div>
                                            <div className="pauseIcon pausedStopped"></div>
                                       </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'parallels' && work.stopped === false) {
                                return <div className="videoControlsOption" ref="stop"
                                            onClick={() => {this.stopVids(); this.props.stopped('parallels')}}>
                                            <div className="stopIcon"></div>
                                       </div>
                            } else if (work.name === 'parallels' && work.stopped) {
                                return <div className="videoControlsOption videoControlSelected" ref="stop">
                                            <div className="stopIcon pausedStopped"></div>
                                       </div>
                            }
                        })}

                        {this.props.worksVisible && this.props.worksVisible.map(work => {
                            if (work.name === 'parallels' && work.ff === false) {
                                return <div className="videoControlsOption" ref="ff"
                                            onClick={() => {this.ffVids(); this.props.ff('parallels')}}>
                                            <div className="ffIcon"></div>
                                            <div className="ffIcon"></div>
                                       </div>
                            } else if (work.name === 'parallels' && work.ff) {
                                return <div className="videoControlsOption videoControlSelected" ref="ff">
                                            <div className="ffIcon ffing"></div>
                                            <div className="ffIcon ffing"></div>
                                       </div>
                            }
                        })}
                    </div>

                    <div className="timeWrap">
                        <p className="time" ref="time">&#8734;</p>
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
        },

        logInTerminal(message) {
            dispatch(logInTerminal(message))
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Parallels)

import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid, logInTerminal } from './actions.js';


class Rhythm2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('rhythm2');
        this.props.logInTerminal(`work > rhythm 2 ~ active`);
        var vid = document.getElementsByClassName('rhythm2Vid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('rhythm2');
                }, 1000)
            }
        }
    }

    componentWillUnmount() {
        this.props.windowUnmounted('rhythm2');
        this.props.resetVid('rhythm2');
        this.props.logInTerminal(`work > rhythm 2 ~ inactive`);
    }

    startBringingToFront(component) {
        if (this.refs.rhythm2.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    rrVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'rhythm2') {
                if (work.playing || work.paused) {
                    this.refs.rhythm2Vid.currentTime -= 5;
                    setTimeout(() => {
                        this.props.stopRr('rhythm2');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.rhythm2Vid.play();
        this.refs.rhythm2Vid.play();
    }

    pauseVids() {
        this.refs.rhythm2Vid.pause();
        this.refs.rhythm2Vid.pause();
    }

    stopVids() {
        this.refs.rhythm2Vid.currentTime = 0;
        this.refs.rhythm2Vid.currentTime = 0;
        this.refs.rhythm2Vid.pause();
        this.refs.rhythm2Vid.pause();
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'rhythm2') {
                if (work.playing || work.paused) {
                    this.refs.rhythm2Vid.currentTime += 5;
                    setTimeout(() => {
                        this.props.stopRr('rhythm2');
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
            if (work.name == 'rhythm2') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'rhythm2') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'rhythm2')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('rhythm2'); this.props.handleMouseDown(e, 'rhythm2')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window rhythm2" ref="rhythm2">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('rhythm2')}>Esc</a>
                    <p className="windowTitle">Rhythm 2</p>
                </div>
                <video className="rhythm2Vid" ref="rhythm2Vid" src="/videos/rhythm2.mp4" width="834px" height="469px"></video>

                <div className="videoControls">

                <div className="buttons">
                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'rhythm2' && work.rr === false) {
                            return <div className="videoControlsOption" ref="rr"
                                        onClick={() => {this.rrVids(); this.props.rr('rhythm2')}}>
                                        <div className="rrIcon"></div>
                                        <div className="rrIcon"></div>
                                   </div>
                        } else if (work.name === 'rhythm2' && work.rr) {
                            return <div className="videoControlsOption videoControlSelected" ref="rr">
                                        <div className="rrIcon rring"></div>
                                        <div className="rrIcon rring"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'rhythm2' && work.playing === false) {
                            return <div className="videoControlsOption" ref="play"
                                        onClick={() => {this.playVids(); this.props.playing('rhythm2')}}>
                                        <div className="playIcon"></div>
                                   </div>
                        } else if (work.name === 'rhythm2' && work.playing) {
                            return <div className="videoControlsOption videoControlSelected" ref="play">
                                        <div className="playIcon playing"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'rhythm2' && work.paused === false) {
                            return <div className="videoControlsOption" ref="pause"
                                        onClick={() => {this.pauseVids(); this.props.paused('rhythm2')}}>
                                        <div className="pauseIcon"></div>
                                        <div className="pauseIcon"></div>
                                   </div>
                        } else if (work.name === 'rhythm2' && work.paused) {
                            return <div className="videoControlsOption videoControlSelected" ref="pause">
                                        <div className="pauseIcon pausedStopped"></div>
                                        <div className="pauseIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'rhythm2' && work.stopped === false) {
                            return <div className="videoControlsOption" ref="stop"
                                        onClick={() => {this.stopVids(); this.props.stopped('rhythm2')}}>
                                        <div className="stopIcon"></div>
                                   </div>
                        } else if (work.name === 'rhythm2' && work.stopped) {
                            return <div className="videoControlsOption videoControlSelected" ref="stop">
                                        <div className="stopIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'rhythm2' && work.ff === false) {
                            return <div className="videoControlsOption" ref="ff"
                                        onClick={() => {this.ffVids(); this.props.ff('rhythm2')}}>
                                        <div className="ffIcon"></div>
                                        <div className="ffIcon"></div>
                                   </div>
                        } else if (work.name === 'rhythm2' && work.ff) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Rhythm2)

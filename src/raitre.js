import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class Raitre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('raitre');
        var vid = document.getElementsByClassName('raitreVid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('raitre');
                }, 1000)
            }
        }
    }

    componentWillUnmount() {
        this.props.windowUnmounted('raitre');
        this.props.resetVid('raitre');
    }

    startBringingToFront(component) {
        if (this.refs.raitre.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    rrVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'raitre') {
                if (work.playing || work.paused) {
                    this.refs.raitreVid.currentTime -= 5;
                    setTimeout(() => {
                        this.props.stopRr('raitre');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.raitreVid.play();
        this.refs.raitreVid.play();
    }

    pauseVids() {
        this.refs.raitreVid.pause();
        this.refs.raitreVid.pause();
    }

    stopVids() {
        this.refs.raitreVid.currentTime = 0;
        this.refs.raitreVid.currentTime = 0;
        this.refs.raitreVid.pause();
        this.refs.raitreVid.pause();
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'raitre') {
                if (work.playing || work.paused) {
                    this.refs.raitreVid.currentTime += 5;
                    setTimeout(() => {
                        this.props.stopRr('raitre');
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
            if (work.name == 'raitre') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'raitre') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'raitre')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('raitre'); this.props.handleMouseDown(e, 'raitre')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window raitre" ref="raitre">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('raitre')}>Esc</a>
                    <p className="windowTitle">Raitre</p>
                </div>
                <video className="raitreVid" ref="raitreVid" src="/videos/raitre web edit.mp4" width="614px" height="460px"></video>

                <div className="videoControls">

                <div className="buttons">
                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'raitre' && work.rr === false) {
                            return <div className="videoControlsOption" ref="rr"
                                        onClick={() => {this.rrVids(); this.props.rr('raitre')}}>
                                        <div className="rrIcon"></div>
                                        <div className="rrIcon"></div>
                                   </div>
                        } else if (work.name === 'raitre' && work.rr) {
                            return <div className="videoControlsOption videoControlSelected" ref="rr">
                                        <div className="rrIcon rring"></div>
                                        <div className="rrIcon rring"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'raitre' && work.playing === false) {
                            return <div className="videoControlsOption" ref="play"
                                        onClick={() => {this.playVids(); this.props.playing('raitre')}}>
                                        <div className="playIcon"></div>
                                   </div>
                        } else if (work.name === 'raitre' && work.playing) {
                            return <div className="videoControlsOption videoControlSelected" ref="play">
                                        <div className="playIcon playing"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'raitre' && work.paused === false) {
                            return <div className="videoControlsOption" ref="pause"
                                        onClick={() => {this.pauseVids(); this.props.paused('raitre')}}>
                                        <div className="pauseIcon"></div>
                                        <div className="pauseIcon"></div>
                                   </div>
                        } else if (work.name === 'raitre' && work.paused) {
                            return <div className="videoControlsOption videoControlSelected" ref="pause">
                                        <div className="pauseIcon pausedStopped"></div>
                                        <div className="pauseIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'raitre' && work.stopped === false) {
                            return <div className="videoControlsOption" ref="stop"
                                        onClick={() => {this.stopVids(); this.props.stopped('raitre')}}>
                                        <div className="stopIcon"></div>
                                   </div>
                        } else if (work.name === 'raitre' && work.stopped) {
                            return <div className="videoControlsOption videoControlSelected" ref="stop">
                                        <div className="stopIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'raitre' && work.ff === false) {
                            return <div className="videoControlsOption" ref="ff"
                                        onClick={() => {this.ffVids(); this.props.ff('raitre')}}>
                                        <div className="ffIcon"></div>
                                        <div className="ffIcon"></div>
                                   </div>
                        } else if (work.name === 'raitre' && work.ff) {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Raitre)

import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class Twelve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('twelve');
        setTimeout(() => {
            this.refs.twelve.style.zIndex = this.props.topZIndex;
        }, 1)
        var vid = document.getElementsByClassName('twelveVid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('twelve');
                }, 1000)
            }
        }
    }

    componentWillUnmount() {
        this.props.windowUnmounted('twelve');
        this.props.resetVid('twelve');
    }

    componentWillReceiveProps(nextProps) {
        nextProps.allZIndex.map(component => {
            if (component.name === 'twelve') {
                this.refs.twelve.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.twelve.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    rrVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'twelve') {
                if (work.playing || work.paused) {
                    this.refs.twelveVid.currentTime -= 5;
                    setTimeout(() => {
                        this.props.stopRr('twelve');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.twelveVid.play();
        this.refs.twelveVid.play();
    }

    pauseVids() {
        this.refs.twelveVid.pause();
        this.refs.twelveVid.pause();
    }

    stopVids() {
        this.refs.twelveVid.currentTime = 0;
        this.refs.twelveVid.currentTime = 0;
        this.refs.twelveVid.pause();
        this.refs.twelveVid.pause();
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'twelve') {
                if (work.playing || work.paused) {
                    this.refs.twelveVid.currentTime += 5;
                    setTimeout(() => {
                        this.props.stopRr('twelve');
                    }, 200)
                }
            }
        })
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'twelve') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'twelve')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('twelve'); this.props.handleMouseDown(e, 'twelve')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window twelve" ref="twelve">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('twelve')}>Esc</a>
                    <p className="windowTitle">12 Are Stolen</p>
                </div>
                <video className="twelveVid" ref="twelveVid" src="/videos/12 are stolen.mp4" width="614px" height="460px"></video>

                <div className="videoControls">

                <div className="buttons">
                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'twelve' && work.rr === false) {
                            return <div className="videoControlsOption" ref="rr"
                                        onClick={() => {this.rrVids(); this.props.rr('twelve')}}>
                                        <div className="rrIcon"></div>
                                        <div className="rrIcon"></div>
                                   </div>
                        } else if (work.name === 'twelve' && work.rr) {
                            return <div className="videoControlsOption videoControlSelected" ref="rr">
                                        <div className="rrIcon rring"></div>
                                        <div className="rrIcon rring"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'twelve' && work.playing === false) {
                            return <div className="videoControlsOption" ref="play"
                                        onClick={() => {this.playVids(); this.props.playing('twelve')}}>
                                        <div className="playIcon"></div>
                                   </div>
                        } else if (work.name === 'twelve' && work.playing) {
                            return <div className="videoControlsOption videoControlSelected" ref="play">
                                        <div className="playIcon playing"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'twelve' && work.paused === false) {
                            return <div className="videoControlsOption" ref="pause"
                                        onClick={() => {this.pauseVids(); this.props.paused('twelve')}}>
                                        <div className="pauseIcon"></div>
                                        <div className="pauseIcon"></div>
                                   </div>
                        } else if (work.name === 'twelve' && work.paused) {
                            return <div className="videoControlsOption videoControlSelected" ref="pause">
                                        <div className="pauseIcon pausedStopped"></div>
                                        <div className="pauseIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'twelve' && work.stopped === false) {
                            return <div className="videoControlsOption" ref="stop"
                                        onClick={() => {this.stopVids(); this.props.stopped('twelve')}}>
                                        <div className="stopIcon"></div>
                                   </div>
                        } else if (work.name === 'twelve' && work.stopped) {
                            return <div className="videoControlsOption videoControlSelected" ref="stop">
                                        <div className="stopIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'twelve' && work.ff === false) {
                            return <div className="videoControlsOption" ref="ff"
                                        onClick={() => {this.ffVids(); this.props.ff('twelve')}}>
                                        <div className="ffIcon"></div>
                                        <div className="ffIcon"></div>
                                   </div>
                        } else if (work.name === 'twelve' && work.ff) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Twelve)

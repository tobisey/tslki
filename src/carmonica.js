import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class Carmonica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('carmonica');
        setTimeout(() => {
            this.refs.carmonica.style.zIndex = this.props.topZIndex;
        }, 1)
        var vid = document.getElementsByClassName('carmVid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('carmonica');
                }, 1000)
            }
        }
    }

    componentWillUnmount() {
        this.props.windowUnmounted('carmonica');
        this.props.resetVid('carmonica');
    }

    componentWillReceiveProps(nextProps) {
        nextProps.allZIndex.map(component => {
            if (component.name === 'carmonica') {
                this.refs.carmonica.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.carmonica.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    rrVids() {
        if (this.props.worksVisible[1].playing || this.props.worksVisible[1].paused) {
            this.refs.carmVid.currentTime -= 5;
            this.refs.carmVid.currentTime -= 5;
            setTimeout(() => {
                this.props.stopRr('carmonica');
            }, 200)
        }
    }

    playVids() {
        this.refs.carmVid.play();
        this.refs.carmVid.play();
    }

    pauseVids() {
        this.refs.carmVid.pause();
        this.refs.carmVid.pause();
    }

    stopVids() {
        this.refs.carmVid.currentTime = 0;
        this.refs.carmVid.currentTime = 0;
        this.refs.carmVid.pause();
        this.refs.carmVid.pause();
    }

    ffVids() {
        if (this.props.worksVisible[1].playing || this.props.worksVisible[1].paused) {
            this.refs.carmVid.currentTime += 5;
            this.refs.carmVid.currentTime += 5;
            setTimeout(() => {
                this.props.stopFf('carmonica');
            }, 200)
        }
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'carmonica') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'carmonica')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('carmonica'); this.props.handleMouseDown(e, 'carmonica')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window carmonica" ref="carmonica">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('carmonica')}>Esc</a>
                    <p className="windowTitle">Carmonica Harmonicar</p>
                </div>

                <video className='carmVid' ref="carmVid" src="/videos/carmonica.mp4" width="629px" height="353px"></video>

                <div className="videoControls">

                <div className="buttons">
                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'carmonica' && work.rr === false) {
                            return <div className="videoControlsOption" ref="rr"
                                        onClick={() => {this.rrVids(); this.props.rr('carmonica')}}>
                                        <div className="rrIcon"></div>
                                        <div className="rrIcon"></div>
                                   </div>
                        } else if (work.name === 'carmonica' && work.rr) {
                            return <div className="videoControlsOption videoControlSelected" ref="rr">
                                        <div className="rrIcon rring"></div>
                                        <div className="rrIcon rring"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'carmonica' && work.playing === false) {
                            return <div className="videoControlsOption" ref="play"
                                        onClick={() => {this.playVids(); this.props.playing('carmonica')}}>
                                        <div className="playIcon"></div>
                                   </div>
                        } else if (work.name === 'carmonica' && work.playing) {
                            return <div className="videoControlsOption videoControlSelected" ref="play">
                                        <div className="playIcon playing"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'carmonica' && work.paused === false) {
                            return <div className="videoControlsOption" ref="pause"
                                        onClick={() => {this.pauseVids(); this.props.paused('carmonica')}}>
                                        <div className="pauseIcon"></div>
                                        <div className="pauseIcon"></div>
                                   </div>
                        } else if (work.name === 'carmonica' && work.paused) {
                            return <div className="videoControlsOption videoControlSelected" ref="pause">
                                        <div className="pauseIcon pausedStopped"></div>
                                        <div className="pauseIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'carmonica' && work.stopped === false) {
                            return <div className="videoControlsOption" ref="stop"
                                        onClick={() => {this.stopVids(); this.props.stopped('carmonica')}}>
                                        <div className="stopIcon"></div>
                                   </div>
                        } else if (work.name === 'carmonica' && work.stopped) {
                            return <div className="videoControlsOption videoControlSelected" ref="stop">
                                        <div className="stopIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'carmonica' && work.ff === false) {
                            return <div className="videoControlsOption" ref="ff"
                                        onClick={() => {this.ffVids(); this.props.ff('carmonica')}}>
                                        <div className="ffIcon"></div>
                                        <div className="ffIcon"></div>
                                   </div>
                        } else if (work.name === 'carmonica' && work.ff) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Carmonica)

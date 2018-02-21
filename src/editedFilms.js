import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class EditedFilms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmCounter: 1
        };
    }

    componentDidMount() {
        this.props.windowMounted('editedFilms');
        this.props.worksVisible.map(work => {
            if (work.name == 'editedFilms') {
                this.setState({
                    filmTotal: work.total
                })
            }
        })
    }

    componentWillUnmount() {
        this.props.windowUnmounted('editedFilms');
        this.props.resetVid('editedFilms');
    }

    componentWillReceiveProps(nextProps) {
        nextProps.allZIndex.map(component => {
            if (component.name === 'editedFilms') {
                this.refs.editedFilms.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.editedFilms.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'editedFilms') {
                if (work.playing || work.paused) {
                    this.refs.editedVid.currentTime -= 5;
                    setTimeout(() => {
                        this.props.stopRr('editedFilms');
                    }, 200)
                }
            }
        })
    }

    playVids() {
        this.refs.editedVid.play();
        this.refs.editedVid.play();
    }

    pauseVids() {
        this.refs.editedVid.pause();
        this.refs.editedVid.pause();
    }

    stopVids() {
        this.refs.editedVid.currentTime = 0;
        this.refs.editedVid.currentTime = 0;
        this.refs.editedVid.pause();
        this.refs.editedVid.pause();
    }

    ffVids() {
        this.props.worksVisible.map(work => {
            if (work.name == 'editedFilms') {
                if (work.playing || work.paused) {
                    this.refs.editedVid.currentTime += 5;
                    setTimeout(() => {
                        this.props.stopRr('editedFilms');
                    }, 200)
                }
            }
        })
    }

    changeFilm(val) {
        if ((this.state.filmCounter + val) < 1) {
            this.setState({
                filmCounter: this.state.filmTotal
            })
        } else if ((this.state.filmCounter + val) > this.state.filmTotal) {
            this.setState({
                filmCounter: 1
            })
        } else {
            this.setState({
                filmCounter: this.state.filmCounter += val
            })
        }
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'editedFilms') {
                left = work.x2;
                top = work.y2;
            }
        })

        var videoPath = `/videos/ef${this.state.filmCounter}.mp4`

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'editedFilms')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('editedFilms'); this.props.handleMouseDown(e, 'editedFilms')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window editedFilms" ref="editedFilms">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('editedFilms')}>Esc</a>
                    <p className="windowTitle">Edited Films</p>
                </div>

                <div className="editedVidWindow">
                    <video src={videoPath} autoplay></video>
                </div>

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
                    <h1 onClick={() => this.changeFilm(1)}>next</h1>
                    <h1 onClick={() => this.changeFilm(-1)}>prev</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditedFilms)

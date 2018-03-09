import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, rr, stopRr, playing, paused, stopped, ff, stopFf, resetVid } from './actions.js';

class EditedFilms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmCounter: 1,
            filmChanging: false,
            durationUp: false
        };
        this.changeFilm = this.changeFilm.bind(this);
        this.changeVidTime = this.changeVidTime.bind(this);
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
        var vid = document.getElementsByClassName('editedVid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('editedFilms');
                }, 1000)
            }
        }
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

    rrVids() {
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
        this.setState({
            durationUp: true
        })
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

    changeFilm(val, ref) {
        this.setState({
            durationUp: false
        }, () => {
            if ((this.state.filmCounter + val) < 1) {
                this.setState({
                    filmCounter: this.state.filmTotal
                }, () => {
                    this.props.resetVid('editedFilms')
                    this.changeVidTime();
            })
            } else if ((this.state.filmCounter + val) > this.state.filmTotal) {
                this.setState({
                    filmCounter: 1
                }, () => {
                    this.props.resetVid('editedFilms')
                    this.changeVidTime();
            })
            } else {
                this.setState({
                    filmCounter: this.state.filmCounter += val
                }, () => {
                    this.props.resetVid('editedFilms')
                    this.changeVidTime();
                })
            }
        })
    }

    changeVidTime() {
        var vid = document.getElementsByClassName('editedVid')[0];
        vid.ontimeupdate = () => {
            if (this.refs.time) {
                this.refs.time.innerHTML = ((vid.currentTime / vid.duration) * 100).toFixed(2) + '%';
            }
            if (vid.currentTime === vid.duration) {
                setTimeout(() => {
                    this.stopVids();
                    this.props.resetVid('editedFilms');
                }, 1000)
            }
        }
    }

    handleMouseDown(ref) {
        this.refs[ref].classList.add('videoControlSelected');
        this.refs[`${ref}Text`].classList.add('ediButDown');
    }

    handleMouseUp(ref) {
        this.refs[ref].classList.remove('videoControlSelected');
        this.refs[`${ref}Text`].classList.remove('ediButDown');
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
                    <video className="editedVid" ref="editedVid" src={videoPath}></video>
                </div>

                <div className="videoControls">

                <div className="buttons">
                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'editedFilms' && work.rr === false) {
                            return <div className="videoControlsOption" ref="rr"
                                        onClick={() => {this.rrVids(); this.props.rr('editedFilms')}}>
                                        <div className="rrIcon"></div>
                                        <div className="rrIcon"></div>
                                   </div>
                        } else if (work.name === 'editedFilms' && work.rr) {
                            return <div className="videoControlsOption videoControlSelected" ref="rr">
                                        <div className="rrIcon rring"></div>
                                        <div className="rrIcon rring"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'editedFilms' && work.playing === false) {
                            return <div className="videoControlsOption" ref="play"
                                        onClick={() => {this.playVids(); this.props.playing('editedFilms')}}>
                                        <div className="playIcon"></div>
                                   </div>
                        } else if (work.name === 'editedFilms' && work.playing) {
                            return <div className="videoControlsOption videoControlSelected" ref="play">
                                        <div className="playIcon playing"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'editedFilms' && work.paused === false) {
                            return <div className="videoControlsOption" ref="pause"
                                        onClick={() => {this.pauseVids(); this.props.paused('editedFilms')}}>
                                        <div className="pauseIcon"></div>
                                        <div className="pauseIcon"></div>
                                   </div>
                        } else if (work.name === 'editedFilms' && work.paused) {
                            return <div className="videoControlsOption videoControlSelected" ref="pause">
                                        <div className="pauseIcon pausedStopped"></div>
                                        <div className="pauseIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'editedFilms' && work.stopped === false) {
                            return <div className="videoControlsOption" ref="stop"
                                        onClick={() => {this.stopVids(); this.props.stopped('editedFilms')}}>
                                        <div className="stopIcon"></div>
                                   </div>
                        } else if (work.name === 'editedFilms' && work.stopped) {
                            return <div className="videoControlsOption videoControlSelected" ref="stop">
                                        <div className="stopIcon pausedStopped"></div>
                                   </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'editedFilms' && work.ff === false) {
                            return <div className="videoControlsOption" ref="ff"
                                        onClick={() => {this.ffVids(); this.props.ff('editedFilms')}}>
                                        <div className="ffIcon"></div>
                                        <div className="ffIcon"></div>
                                   </div>
                        } else if (work.name === 'editedFilms' && work.ff) {
                            return <div className="videoControlsOption videoControlSelected" ref="ff">
                                        <div className="ffIcon ffing"></div>
                                        <div className="ffIcon ffing"></div>
                                   </div>
                        }
                    })}

                </div>

                <div className="ediScreenWrap">

                    <div ref="prev" className="ediBut videoControlsOption"
                         onClick={() => this.changeFilm(-1)}
                         onMouseDown={() => this.handleMouseDown('prev')}
                         onMouseUp={() => this.handleMouseUp('prev')}>
                         <h1 className="ediButUp" ref="prevText">PREV</h1>
                    </div>

                    <div ref="next" className="ediBut videoControlsOption"
                         onClick={() => this.changeFilm(1)}
                         onMouseDown={() => this.handleMouseDown('next')}
                         onMouseUp={() => this.handleMouseUp('next')}>
                         <h1 className="ediButUp" ref="nextText">NEXT</h1>
                    </div>

                    <div className="filmNoWrap">
                        <p className="time" ref="filmNo">{this.state.filmCounter}</p>
                    </div>

                    {!this.state.durationUp &&
                        <div className="timeWrap">
                            <p className="time">0.00%</p>
                        </div>
                    }
                    {this.state.durationUp &&
                        <div className="timeWrap">
                            <p ref="time" className="time">0.00%</p>
                        </div>
                    }

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

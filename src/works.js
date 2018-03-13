import React from 'react';
import { connect } from 'react-redux';
import { toggleWorksMenu, toggleWork, windowMounted, windowUnmounted, bringWindowToFront } from './actions.js';

class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollCountUp: 2,
            scrollCountDown: 9
        };
        this.worksHandleKeyDown = this.worksHandleKeyDown.bind(this);
        this.worksHandleMouseEnter = this.worksHandleMouseEnter.bind(this);
        this.worksHandleMouseLeave = this.worksHandleMouseLeave.bind(this);
        this.worksCheckToHighlight = this.worksCheckToHighlight.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.worksHandleKeyDown);
        this.setState({current: 1});
        this.props.windowMounted('works');
        this.props.worksLED();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.worksHandleKeyDown);
        this.props.windowUnmounted('works');
        this.props.worksLED();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.allZIndex.map(component => {
            if (component.name === 'works') {
                this.refs.works.style.zIndex = component.zIndex
            }
        });
    }

    worksHandleKeyDown(e) {
        if (e.keyCode === 40) {
            if (this.state.current >= this.state.scrollCountDown) {
                this.refs.scrollable.scrollTop += 44;
                if (this.state.scrollCountDown < 12) {
                    this.setState({
                        scrollCountUp: this.state.scrollCountUp += 1,
                        scrollCountDown: this.state.scrollCountDown += 1,
                    })
                }
            }
            var current = this.refs[this.state.current];
            var newState = this.state.current + 1;
            if (newState > 13) {
                newState = 13;
            }
            var next = this.refs[newState + ''];
            this.setState({current: newState}, () => {
                current.classList.remove('highlighted');
                next.classList.add('highlighted');
            })
        }

        if (e.keyCode === 38) {
            if (this.state.current <= this.state.scrollCountUp) {
                this.refs.scrollable.scrollTop -= 44;
                if (this.state.scrollCountUp > 2) {
                    this.setState({
                        scrollCountUp: this.state.scrollCountUp -= 1,
                        scrollCounDown: this.state.scrollCountDown -= 1,
                    })
                }
            }
            var current = this.refs[this.state.current];
            var newState = this.state.current - 1;
            if (newState < 1) {
                newState = 1;
            }
            var next = this.refs[newState + ''];
            this.setState({current: newState}, () => {
                current.classList.remove('highlighted');
                next.classList.add('highlighted');
            })
        }

        if (e.keyCode === 13) {
            this.props.toggleWork(this.state.current, 'keydown');
            for (var val in this.refs) {
                if (val == this.state.current) {
                    if (!this.refs[val].classList.contains('open')) {
                        setTimeout(() => {
                            this.refs[this.state.current].classList.add('highlighted');
                        }, 1);
                    }
                }
            }

        }
    }

    worksHandleMouseEnter(x) {
        for (var val in this.refs) {
            if (this.refs[val].classList.contains('highlighted')) {
                this.refs[val].classList.remove('highlighted');
            }
        }
        this.setState({
            current: x
        }, () => this.refs[x].classList.add('highlighted'))
    }

    worksHandleMouseLeave(x) {
        this.refs[x].classList.remove('highlighted');
    }

    worksCheckToHighlight(x) {
        for (var val in this.refs) {
            if (val == x) {
                if (this.refs[val].classList.contains('open')) {
                    setTimeout(() => {
                        this.refs[x].classList.add('highlighted');
                    }, 1);
                }
            }
        }
    }

    worksResumeCurrent() {
        this.refs[this.state.current].classList.add('highlighted');
    }

    closeWorks() {
        this.setState({current: 1});
        this.props.toggleWorksMenu(this.props.worksMenuVisible);
    }

    startBringingToFront(component) {
        if (this.refs.works.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'works') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseDown={(e) => this.startBringingToFront('works')}
                 ref="works" className="works">

                <div className="escWorksWrapper"
                    onMouseDown={(e) => {this.props.handleMouseDown(e, 'works'); this.startBringingToFront('works')}}
                    onMouseMove={(e) => this.props.handleDrag(e, 'works')}
                    onMouseUp={(e) => this.props.handleMouseUp(e)}
                    onMouseLeave={(e) => this.props.handleMouseLeave(e)}>
                    <div className="esc">
                        <a className="escButton" onClick={() => {this.closeWorks()}}>Esc</a>
                    </div>
                </div>

                <div className="scrollable" ref="scrollable" onMouseLeave={() => this.worksResumeCurrent()}>

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'bruce' && work.visible === false) {
                            return <div className="linkWrapper" ref="1"
                                        onMouseEnter={() => this.worksHandleMouseEnter(1)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(1)}
                                        onClick={() => {this.props.toggleWork('bruce'); this.worksCheckToHighlight(1)}}>
                                        <a>The Worst Bruce Nauman in Scotland</a>
                                    </div>
                        } else if (work.name === 'bruce' && work.visible) {
                            return <div className="linkWrapper open" ref="1"
                                        onMouseEnter={() => this.worksHandleMouseEnter(1)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(1)}
                                        onClick={() => {this.props.toggleWork('bruce'); this.worksCheckToHighlight(1)}}>
                                        <a>The Worst Bruce Nauman in Scotland</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'lift' && work.visible === false) {
                            return <div className="linkWrapper" ref="2"
                                        onMouseEnter={() => this.worksHandleMouseEnter(2)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(2)}
                                        onClick={() => {this.props.toggleWork('lift'); this.worksCheckToHighlight(2)}}>
                                        <a>Are We Saying The Lift Is Or Isn't Art?</a>
                                    </div>
                        } else if (work.name === 'lift' && work.visible) {
                            return <div className="linkWrapper open" ref="2"
                                        onMouseEnter={() => this.worksHandleMouseEnter(2)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(2)}
                                        onClick={() => {this.props.toggleWork('lift'); this.worksCheckToHighlight(2)}}>
                                        <a>Are We Saying The Lift Is Or Isn't Art?</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'carmonica' && work.visible === false) {
                            return <div className="linkWrapper" ref="3"
                                        onMouseEnter={() => this.worksHandleMouseEnter(3)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(3)}
                                        onClick={() => {this.props.toggleWork('carmonica'); this.worksCheckToHighlight(3)}}>
                                        <a>Carmonica Harmonicar</a>
                                    </div>
                        } else if (work.name === 'carmonica' && work.visible) {
                            return <div className="linkWrapper open" ref="3"
                                        onMouseEnter={() => this.worksHandleMouseEnter(3)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(3)}
                                        onClick={() => {this.props.toggleWork('carmonica'); this.worksCheckToHighlight(3)}}>
                                        <a>Carmonica Harmonicar</a>
                                    </div>
                        }
                    })}

                    <div className="linkWrapper" ref="4"
                        onMouseEnter={() => this.worksHandleMouseEnter(4)}
                        onMouseLeave={() => this.worksHandleMouseLeave(4)}>
                        <a href="#">Not Static</a>
                    </div>

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'font' && work.visible === false) {
                            return <div className="linkWrapper" ref="5"
                                        onMouseEnter={() => this.worksHandleMouseEnter(5)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(5)}
                                        onClick={() => {this.props.toggleWork('font'); this.worksCheckToHighlight(5)}}>
                                        <a>The Font (24 Hours Of Non-Work)</a>
                                    </div>
                        } else if (work.name === 'font' && work.visible) {
                            return <div className="linkWrapper open" ref="5"
                                        onMouseEnter={() => this.worksHandleMouseEnter(5)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(5)}
                                        onClick={() => {this.props.toggleWork('font'); this.worksCheckToHighlight(5)}}>
                                        <a>The Font (24 Hours Of Non-Work)</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'parallels' && work.visible === false) {
                            return <div className="linkWrapper" ref="6"
                                        onMouseEnter={() => this.worksHandleMouseEnter(6)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(6)}
                                        onClick={() => {this.props.toggleWork('parallels'); this.worksCheckToHighlight(6)}}>
                                        <a>Parallels</a>
                                    </div>
                        } else if (work.name === 'parallels' && work.visible) {
                            return <div className="linkWrapper open" ref="6"
                                        onMouseEnter={() => this.worksHandleMouseEnter(6)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(6)}
                                        onClick={() => {this.props.toggleWork('parallels'); this.worksCheckToHighlight(6)}}>
                                        <a>Parallels</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'editedFilms' && work.visible === false) {
                            return <div className="linkWrapper" ref="7"
                                        onMouseEnter={() => this.worksHandleMouseEnter(7)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(7)}
                                        onClick={() => {this.props.toggleWork('editedFilms'); this.worksCheckToHighlight(7)}}>
                                        <a>Edited Films</a>
                                    </div>
                        } else if (work.name === 'editedFilms' && work.visible) {
                            return <div className="linkWrapper open" ref="7"
                                        onMouseEnter={() => this.worksHandleMouseEnter(7)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(7)}
                                        onClick={() => {this.props.toggleWork('editedFilms'); this.worksCheckToHighlight(7)}}>
                                        <a>Edited Films</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'pillows' && work.visible === false) {
                            return <div className="linkWrapper" ref="8"
                                        onMouseEnter={() => this.worksHandleMouseEnter(8)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(8)}
                                        onClick={() => {this.props.toggleWork('pillows'); this.worksCheckToHighlight(8)}}>
                                        <a>Pillows</a>
                                    </div>
                        } else if (work.name === 'pillows' && work.visible) {
                            return <div className="linkWrapper open" ref="8"
                                        onMouseEnter={() => this.worksHandleMouseEnter(8)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(8)}
                                        onClick={() => {this.props.toggleWork('pillows'); this.worksCheckToHighlight(8)}}>
                                        <a>Pillows</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'pink' && work.visible === false) {
                            return <div className="linkWrapper" ref="9"
                                        onMouseEnter={() => this.worksHandleMouseEnter(9)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(9)}
                                        onClick={() => {this.props.toggleWork('pink'); this.worksCheckToHighlight(9)}}>
                                        <a>Pink</a>
                                    </div>
                        } else if (work.name === 'pink' && work.visible) {
                            return <div className="linkWrapper open" ref="9"
                                        onMouseEnter={() => this.worksHandleMouseEnter(9)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(9)}
                                        onClick={() => {this.props.toggleWork('pink'); this.worksCheckToHighlight(9)}}>
                                        <a>Pink</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'breakWork' && work.visible === false) {
                            return <div className="linkWrapper" ref="10"
                                        onMouseEnter={() => this.worksHandleMouseEnter(10)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(10)}
                                        onClick={() => {this.props.toggleWork('breakWork'); this.worksCheckToHighlight(10)}}>
                                        <a>Break</a>
                                    </div>
                        } else if (work.name === 'breakWork' && work.visible) {
                            return <div className="linkWrapper open" ref="10"
                                        onMouseEnter={() => this.worksHandleMouseEnter(10)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(10)}
                                        onClick={() => {this.props.toggleWork('breakWork'); this.worksCheckToHighlight(10)}}>
                                        <a>Break</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'twelve' && work.visible === false) {
                            return <div className="linkWrapper" ref="11"
                                        onMouseEnter={() => this.worksHandleMouseEnter(11)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(11)}
                                        onClick={() => {this.props.toggleWork('twelve'); this.worksCheckToHighlight(11)}}>
                                        <a>Twelve Are Stolen</a>
                                    </div>
                        } else if (work.name === 'twelve' && work.visible) {
                            return <div className="linkWrapper open" ref="11"
                                        onMouseEnter={() => this.worksHandleMouseEnter(11)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(11)}
                                        onClick={() => {this.props.toggleWork('twelve'); this.worksCheckToHighlight(11)}}>
                                        <a>Twelve Are Stolen</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'rhythm2' && work.visible === false) {
                            return <div className="linkWrapper" ref="12"
                                        onMouseEnter={() => this.worksHandleMouseEnter(12)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(12)}
                                        onClick={() => {this.props.toggleWork('rhythm2'); this.worksCheckToHighlight(12)}}>
                                        <a>Rhythm 2</a>
                                    </div>
                        } else if (work.name === 'rhythm2' && work.visible) {
                            return <div className="linkWrapper open" ref="12"
                                        onMouseEnter={() => this.worksHandleMouseEnter(12)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(12)}
                                        onClick={() => {this.props.toggleWork('rhythm2'); this.worksCheckToHighlight(12)}}>
                                        <a>Rhythm 2</a>
                                    </div>
                        }
                    })}

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'raitre' && work.visible === false) {
                            return <div className="linkWrapper" ref="13"
                                        onMouseEnter={() => this.worksHandleMouseEnter(13)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(13)}
                                        onClick={() => {this.props.toggleWork('raitre'); this.worksCheckToHighlight(13)}}>
                                        <a>Raitre</a>
                                    </div>
                        } else if (work.name === 'raitre' && work.visible) {
                            return <div className="linkWrapper open" ref="13"
                                        onMouseEnter={() => this.worksHandleMouseEnter(13)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(13)}
                                        onClick={() => {this.props.toggleWork('raitre'); this.worksCheckToHighlight(13)}}>
                                        <a>Raitre</a>
                                    </div>
                        }
                    })}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        worksMenuVisible: state.worksMenuVisible,
        worksVisible: state.worksVisible,
        topZIndex: state.topZIndex,
        allZIndex: state. allZIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleWorksMenu(visible) {
            dispatch(toggleWorksMenu(visible))
        },

        toggleWork(work) {
            dispatch(toggleWork(work))
        },

        windowMounted(component) {
            dispatch(windowMounted(component))
        },

        windowUnmounted(component) {
            dispatch(windowUnmounted(component))
        },

        bringWindowToFront(component) {
            dispatch(bringWindowToFront(component))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Works)

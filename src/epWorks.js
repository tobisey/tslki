import React from 'react';
import { connect } from 'react-redux';
import { toggleWorksMenu, toggleWork, windowMounted, windowUnmounted, bringWindowToFront, logInTerminal } from './actions.js';

class EpWorks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollCountUp: 2,
            scrollCountDown: 3
        };
        this.worksHandleKeyDown = this.worksHandleKeyDown.bind(this);
        this.worksHandleMouseEnter = this.worksHandleMouseEnter.bind(this);
        this.worksHandleMouseLeave = this.worksHandleMouseLeave.bind(this);
        this.worksCheckToHighlight = this.worksCheckToHighlight.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.worksHandleKeyDown);
        this.props.logInTerminal(`menu > list of works ~ activated`);
        this.setState({current: 1});
        this.props.windowMounted('epWorks');
        this.props.worksLED();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.worksHandleKeyDown);
        this.props.logInTerminal(`menu > list of works ~ terminated`);
        this.props.windowUnmounted('epWorks');
        this.props.worksLED();
    }

    worksHandleKeyDown(e) {
        if (e.keyCode === 40) {
            if (this.state.current == 3) {
                return;
            }
            if (this.state.current >= this.state.scrollCountDown) {
                this.refs.scrollable.scrollTop += 44;
                if (this.state.scrollCountDown < 3) {
                    this.setState({
                        scrollCountUp: this.state.scrollCountUp += 1,
                        scrollCountDown: this.state.scrollCountDown += 1,
                    })
                }
            }
            var current = this.refs[this.state.current];
            var newState = this.state.current + 1;
            if (newState > 3) {
                newState = 3;
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

    startBringingToFront() {
        if (this.refs.epWorks.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront('epWorks');
            this.props.logInTerminal(`menu > list of works ~ selected`);
        }
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'epWorks') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'epWorks') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseDown={(e) => this.startBringingToFront('epWorks')}
                 ref="epWorks" className="epWorks">

                <div className="escWorksWrapper"
                    onMouseDown={(e) => {this.props.handleMouseDown(e, 'epWorks'); this.startBringingToFront('epWorks')}}
                    onMouseMove={(e) => this.props.handleDrag(e, 'epWorks')}
                    onMouseUp={(e) => this.props.handleMouseUp(e)}
                    onMouseLeave={(e) => this.props.handleMouseLeave(e)}>
                    <div className="esc">
                        <a className="escButton" onClick={() => {this.closeWorks()}}>Esc</a>
                    </div>
                </div>

                <div className="epScrollable" ref="scrollable" onMouseLeave={() => this.worksResumeCurrent()}>

                    {this.props.worksVisible && this.props.worksVisible.map(work => {
                        if (work.name === 'EP' && work.visible === false) {
                            return <div className="linkWrapper" ref="14"
                                        onMouseEnter={() => this.worksHandleMouseEnter(14)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(14)}
                                        onClick={() => {this.props.toggleWork('EP'); this.worksCheckToHighlight(14)}}>
                                        <a>EP</a>
                                    </div>
                        } else if (work.name === 'EP' && work.visible) {
                            return <div className="linkWrapper open" ref="14"
                                        onMouseEnter={() => this.worksHandleMouseEnter(14)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(14)}
                                        onClick={() => {this.props.toggleWork('EP'); this.worksCheckToHighlight(14)}}>
                                        <a>EP</a>
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
                        if (work.name === 'poolTable' && work.visible === false) {
                            return <div className="linkWrapper" ref="15"
                                        onMouseEnter={() => this.worksHandleMouseEnter(15)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(15)}
                                        onClick={() => {this.props.toggleWork('poolTable'); this.worksCheckToHighlight(15)}}>
                                        <a>Pool Table</a>
                                    </div>
                        } else if (work.name === 'poolTable' && work.visible) {
                            return <div className="linkWrapper open" ref="15"
                                        onMouseEnter={() => this.worksHandleMouseEnter(15)}
                                        onMouseLeave={() => this.worksHandleMouseLeave(15)}
                                        onClick={() => {this.props.toggleWork('poolTable'); this.worksCheckToHighlight(15)}}>
                                        <a>Pool Table</a>
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
        allZIndex: state.allZIndex
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
        },

        logInTerminal(message) {
            dispatch(logInTerminal(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpWorks)

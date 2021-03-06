import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal } from './actions.js';

class Lift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('lift');
        this.props.logInTerminal(`work > are we saying the lift is or isn't art? ~ activated`);
    }

    componentWillUnmount() {
        this.props.windowUnmounted('lift');
        this.props.logInTerminal(`work > are we saying the lift is or isn't art? ~ terminated`);
    }

    startBringingToFront(component) {
        if (this.refs.lift.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
            this.props.logInTerminal(`work > are we saying the lift is or isn't art? ~ selected`);
        }
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'lift') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'lift') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'lift')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('lift'); this.props.handleMouseDown(e, 'lift')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window lift" ref="lift">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('lift')}>Esc</a>
                    <p className="windowTitle">Are We Saying The Lift Is Or Isn't Art?</p>
                </div>

                <div className="liftImageWrapper">
                    <img className="liftImage" src="images/mirror_lift.jpeg" alt="mirror_lift"/>
                    <img className="liftImage" src="images/mdf_lift.jpeg" alt="mdf_lift"/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lift)

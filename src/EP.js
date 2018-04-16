import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal } from './actions.js';

class EP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('EP');
        this.props.logInTerminal(`work > EP ~ activated`);
    }

    componentWillUnmount() {
        this.props.windowUnmounted('EP');
        this.props.logInTerminal(`work > EP ~ terminated`);
    }

    startBringingToFront(component) {
        if (this.refs.EP.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
            this.props.logInTerminal(`work > EP ~ selected`);
        }
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'EP') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'EP') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'EP')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('EP'); this.props.handleMouseDown(e, 'EP')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window EP" ref="EP">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('EP')}>Esc</a>
                    <p className="windowTitle">EP</p>
                </div>

                <img className="EPImage" src="./images/EP.jpg" alt="EP mobile app"/>

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

export default connect(mapStateToProps, mapDispatchToProps)(EP)

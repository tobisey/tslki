import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';

class Pillows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('pillows');
        setTimeout(() => {
            this.refs.pillows.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('pillows');
    }

    startBringingToFront(component) {
        if (this.refs.pillows.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'pillows') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'pillows') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'pillows')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('pillows'); this.props.handleMouseDown(e, 'pillows')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window pillows" ref="pillows">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('pillows')}>Esc</a>
                    <p className="windowTitle">Pillows</p>
                </div>

                <img className="pillowsImage" src="images/pillows.jpg" alt="pillows"/>

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pillows)

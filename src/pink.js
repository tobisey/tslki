import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';


class Pink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('pink');
        setTimeout(() => {
            this.refs.pink.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('pink');
    }

    componentWillReceiveProps(nextProps) {
        nextProps.allZIndex.map(component => {
            if (component.name === 'pink') {
                this.refs.pink.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.pink.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'pink') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'pink')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('pink'); this.props.handleMouseDown(e, 'pink')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window pink" ref="pink">

                <div className="smallXWrapper">
                    <a className="smallX" onClick={() => this.props.toggleWork('pink')}>Esc</a>
                    <p className="smallTitle">Pink</p>
                </div>
                <video src="/videos/pink-web-edit.mp4" width="614px" height="460px" controls></video>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topZIndex: state.topZIndex,
        allZIndex: state. allZIndex,
        dragging: state.dragging,
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

export default connect(mapStateToProps, mapDispatchToProps)(Pink)

import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';

class Break extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('breakWork');
        setTimeout(() => {
            this.refs.breakWork.style.zIndex = this.props.topZIndex;
        }, 1)
        var vid = document.getElementsByClassName('breakVid')[0];
        vid.play();
    }

    componentWillUnmount() {
        this.props.windowUnmounted('breakWork');
    }

    startBringingToFront(component) {
        if (this.refs.breakWork.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'breakWork') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'breakWork') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'breakWork')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('breakWork'); this.props.handleMouseDown(e, 'breakWork')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window breakWork" ref="breakWork">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('breakWork')}>Esc</a>
                    <p className="windowTitle">Break</p>
                </div>

                <video className='breakVid' ref="breakVid" src="/videos/break.mp4" width="860px" height="487px"></video>

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Break)

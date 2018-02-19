import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';

class Parallels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('parallels');
        setTimeout(() => {
            this.refs.parallels.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('parallels');
    }

    componentWillReceiveProps(nextProps) {
        nextProps.allZIndex.map(component => {
            if (component.name === 'parallels') {
                this.refs.parallels.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.parallels.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'parallels') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'parallels')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('parallels'); this.props.handleMouseDown(e, 'parallels')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window parallels" ref="parallels">

                <div className="smallXWrapper">
                    <a className="paraX" onClick={() => this.props.toggleWork('parallels')}>Esc</a>
                    <p className="paraTitle">Parallels</p>
                </div>
                <div className="paraVidsWrapper">
                <div className="paraVidWrap" ref="paraVidOne">
                    <video className='paraVid' src="/videos/para-one.mp4" width="574px" height="312px" controls></video>
                </div>
                <div className="paraVidWrap" ref="paraVidTwo">
                    <video className='paraVid' src="/videos/para-two.mp4" width="574px" height="312px" controls></video>
                </div>
                </div>
                <div className="controlsRow">
                    <div className="controlsOption" ref="shades"><a onClick={() => {this.props.changeSelectedOutfit('shades'); this.highlightSelectedOutfitButton('shades')}}>Glasses</a></div>
                    <div className="controlsOption" ref="speedo"><a onClick={() => {this.props.changeSelectedOutfit('speedo'); this.highlightSelectedOutfitButton('speedo')}}>Speedo</a></div>
                    <div className="controlsOption on" ref="lowEnd"><a onClick={() => {this.props.changeSelectedOutfit('lowEnd'); this.highlightSelectedOutfitButton('lowEnd')}}>LowEnd</a></div>
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
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Parallels)

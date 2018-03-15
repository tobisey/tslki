import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork, logInTerminal } from './actions.js';

class Font extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('font');
        this.props.logInTerminal(`work > the font (24 hours of non work) ~ activated`);
        var audio = document.getElementsByClassName('fontAudio')[0];
        audio.play();
        this.props.logInTerminal(`work > the font (24 hours of non work) ~ audio play`);
    }

    componentWillUnmount() {
        this.props.windowUnmounted('font');
        this.props.logInTerminal(`work > the font (24 hours of non work) ~ terminated`);
    }

    startBringingToFront(component) {
        if (this.refs.font.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
            this.props.logInTerminal(`work > the font (24 hours of non work) ~ selected`);
        }
    }

    render() {

        var left;
        var top;
        var zValue;

        this.props.worksVisible.map(work => {
            if (work.name == 'font') {
                left = work.x2;
                top = work.y2;
            }
        })

        this.props.allZIndex.map(work => {
            if (work.name == 'font') {
                zValue = work.zIndex;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px', zIndex: zValue}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'font')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('font'); this.props.handleMouseDown(e, 'font')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window font" ref="font">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('font')}>Esc</a>
                    <p className="windowTitle">The Font (24 Hours Of Non-Work)</p>
                </div>

                <img className="fontImage" src="images/font.jpg" alt="font"/>
                <audio className='fontAudio' ref="fontAudio" src="audio/font_audio.m4a"></audio>

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

export default connect(mapStateToProps, mapDispatchToProps)(Font)

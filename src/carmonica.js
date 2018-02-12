import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront } from './actions.js';

class Carmonica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('carmonica');
        setTimeout(() => {
            this.refs.carmonica.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('carmonica');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        nextProps.allZIndex.map(component => {
            if (component.name === 'carmonica') {
                this.refs.carmonica.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.carmonica.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {
        return (
            <div onClick={() => this.startBringingToFront('carmonica')} className="window carmonica" ref="carmonica">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showCarmonica}>Esc</a>
                    <p className="smallTitle">Carmonica Harmonicar</p>
                </div>
                <video src="/videos/carmonica.mp4" width="638px" height="384px" controls></video>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topZIndex: state.topZIndex,
        allZIndex: state. allZIndex
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
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carmonica)

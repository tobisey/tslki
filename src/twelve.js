import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront } from './actions.js';

class Twelve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('twelve');
        setTimeout(() => {
            this.refs.twelve.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('twelve');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        nextProps.allZIndex.map(component => {
            if (component.name === 'twelve') {
                this.refs.twelve.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.twelve.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {
        return (
            <div onClick={() => this.startBringingToFront('twelve')} className="window twelve" ref="twelve">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showTwelve}>Esc</a>
                    <p className="smallTitle">12 Are Stolen</p>
                </div>
                <video src="/videos/12 are stolen.mp4" width="614px" height="460px" controls></video>
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

export default connect(mapStateToProps, mapDispatchToProps)(Twelve)

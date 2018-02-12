import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront } from './actions.js';


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
        console.log(nextProps)
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
        return (
            <div onClick={() => this.startBringingToFront('pink')} className="window pink" ref="pink">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showPink}>Esc</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pink)

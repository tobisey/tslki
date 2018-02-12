import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront } from './actions.js';

class Raitre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.windowMounted('raitre');
        setTimeout(() => {
            this.refs.raitre.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('raitre');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        nextProps.allZIndex.map(component => {
            if (component.name === 'raitre') {
                this.refs.raitre.style.zIndex = component.zIndex
            }
        });
    }

    startBringingToFront(component) {
        if (this.refs.raitre.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    render() {
        return (
            <div onClick={() => this.startBringingToFront('raitre')} className="window raitre" ref="raitre">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showRaitre}>Esc</a>
                    <p className="smallTitle">Raitre</p>
                </div>
                <video src="/videos/raitre web edit.mp4" width="614px" height="460px" controls></video>
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

export default connect(mapStateToProps, mapDispatchToProps)(Raitre)

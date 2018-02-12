import React from 'react';
import { connect } from 'react-redux';
import { defaults, toggleWorksMenu } from './actions.js';
import Outfits from './outfits.js'
import Works from './works.js'
import Carmonica from './carmonica.js'
import Pink from './pink.js'
import Twelve from './twelve.js'
import Raitre from './raitre.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navHandleKeyDown = this.navHandleKeyDown.bind(this)
        this.worksLED = this.worksLED.bind(this)
    }

    componentDidMount() {
        this.props.defaults();
        window.addEventListener("keydown", this.navHandleKeyDown);
    }

    navHandleKeyDown(e) {
        if (e.keyCode === 87) {
            this.props.toggleWorksMenu(this.props.worksMenuVisible);
            this.worksLED();
        }
    }

    worksLED() {
        if (this.refs['worksDot'].classList.contains('dotHighlighted')) {
            this.refs['worksDot'].classList.remove('dotHighlighted');
            this.refs['worksSmallerDot'].classList.remove('smallerDotHighlighted');
        } else {
            this.refs['worksDot'].classList.add('dotHighlighted');
            this.refs['worksSmallerDot'].classList.add('smallerDotHighlighted');
        }
    }

    render() {

        return (
            <div>
            <div className="nav">
                <div className="corpseWrapper">
                    <img className="corpse" src="/images/corpse.png" alt="corpse"/>
                </div>
                <div className="title">
                    <p>Tobias Seymour &</p>
                    <p>Lachlan Kosaniukinnes</p>
                </div>
                <div className="navLinks">
                    <div className="linkWrapper"><div className="dot" ref="worksDot"><div className="smallerDot" ref="worksSmallerDot"></div></div><a onClick={() => {this.props.toggleWorksMenu(this.props.worksMenuVisible); this.worksLED()}}>Works</a></div>
                    <div className="linkWrapper"><div className="dot" ref="cvDot"><div className="smallerDot" ref="cvSmallerDot"></div></div><a onClick={() => this.cvHandleClick()}>CV</a></div>
                    <div className="linkWrapper"><div className="dot" ref="emailDot"><div className="smallerDot" ref="emailSmallerDot"></div></div><a onClick={() => this.emailHandleClick()}>mail@tslki.com</a></div>
                </div>
            </div>
                <Outfits />
                {this.props.worksMenuVisible && <Works
                    worksLED ={this.worksLED}
                />}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'carmonica' && work.visible) {
                        return <Carmonica />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'pink' && work.visible) {
                        return <Pink />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'twelve' && work.visible) {
                        return <Twelve />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'raitre' && work.visible) {
                        return <Raitre />
                    }
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        worksMenuVisible: state.worksMenuVisible,
        worksVisible: state.worksVisible && state.worksVisible,
        topZIndex: state.topZIndex,
        allZIndex: state.allZIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        defaults() {
            dispatch(defaults())
        },

        toggleWorksMenu(visible) {
            dispatch(toggleWorksMenu(visible))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

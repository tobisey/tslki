import React from 'react';
import { connect } from 'react-redux';
import { defaults, toggleWorksMenu, closeTopWindow, toggleMouseDown, toggleDragging, setInitialCoords, setDragCoords } from './actions.js';
import Outfits from './outfits.js'
import Works from './works.js'
import Carmonica from './carmonica.js'
import Parallels from './parallels.js'
import Ef1 from './ef1.js'
import Ef2 from './ef2.js'
import Ef3 from './ef3.js'
import Ef4 from './ef4.js'
import Ef5 from './ef5.js'
import Ef6 from './ef6.js'
import Pink from './pink.js'
import Break from './break.js'
import Twelve from './twelve.js'
import Raitre from './raitre.js'
import EditedFilms from './editedFilms.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navHandleKeyDown = this.navHandleKeyDown.bind(this)
        this.worksLED = this.worksLED.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    componentDidMount() {
        this.props.defaults();
        window.addEventListener("keydown", this.navHandleKeyDown);
    }

    navHandleKeyDown(e) {
        if (e.keyCode === 87) {
            this.props.toggleWorksMenu(this.props.worksMenuVisible);
        }

        if (e.keyCode === 27) {
            this.props.closeTopWindow(this.props.worksMenuVisible);
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

    // DRAGGING FUNCTIONALITY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    handleMouseDown(e, component) {

        var elem = document.getElementsByClassName(component);

        if (component == 'works') {
            var posY = elem[0].offsetTop - 100;
        } else {
            var posY = elem[0].offsetTop;
        }

        var posX = elem[0].offsetLeft;

        this.props.toggleDragging(true);

        var coords = {
            x: e.clientX - parseInt(posX),
            y: e.clientY - parseInt(posY)
        };

        this.props.setInitialCoords(coords, component);

        e.stopPropagation();
        e.preventDefault();
    }

    handleDrag(e, component) {

        if (!this.props.dragging) {
            return
        }

        var oldLeft;
        var oldTop;

        this.props.worksVisible.map(work => {
            if (work.name == component) {
                oldLeft = work.x;
                oldTop = work.y;
            }
        })

        var newCoords = {
            x: e.clientX - oldLeft,
            y: e.clientY - oldTop
        }

        this.props.setDragCoords(newCoords, component);

        e.stopPropagation();
        e.preventDefault();
    }

    handleMouseUp(e) {

        if (this.props.dragging) {
            this.props.toggleDragging(false);

            e.stopPropagation();
            e.preventDefault();
        }

    }

    handleMouseLeave(e) {

        if (this.props.dragging) {
            this.props.toggleDragging(false);

            e.stopPropagation();
            e.preventDefault();
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
                    <div className="linkWrapper"><div className="dot" ref="worksDot"><div className="smallerDot" ref="worksSmallerDot"></div></div><a onClick={() => this.props.toggleWorksMenu(this.props.worksMenuVisible)}>Works</a></div>
                    <div className="linkWrapper"><div className="dot" ref="cvDot"><div className="smallerDot" ref="cvSmallerDot"></div></div><a onClick={() => this.cvHandleClick()}>CV</a></div>
                    <div className="linkWrapper"><div className="dot" ref="emailDot"><div className="smallerDot" ref="emailSmallerDot"></div></div><a onClick={() => this.emailHandleClick()}>mail@tslki.com</a></div>
                </div>
            </div>
                <Outfits />
                {this.props.worksMenuVisible && <Works
                    worksLED ={this.worksLED}
                    handleMouseDown = {this.handleMouseDown}
                    handleMouseUp = {this.handleMouseUp}
                    handleDrag = {this.handleDrag}
                    handleMouseLeave = {this.handleMouseLeave}
                />}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'carmonica' && work.visible) {
                        return <Carmonica ref="carmonica"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'parallels' && work.visible) {
                        return <Parallels ref="parallels"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'editedFilms' && work.visible) {
                        return <EditedFilms ref="editedFilms"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'break' && work.visible) {
                        return <Break ref="break"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'pink' && work.visible) {
                        return <Pink ref="pink"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'twelve' && work.visible) {
                        return <Twelve ref="twelve"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'raitre' && work.visible) {
                        return <Raitre ref="raitre"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
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
        allZIndex: state.allZIndex,
        dragging: state.dragging && state.dragging,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        defaults() {
            dispatch(defaults())
        },

        toggleWorksMenu(visible) {
            dispatch(toggleWorksMenu(visible))
        },

        closeTopWindow(visible) {
            dispatch(closeTopWindow(visible))
        },

        toggleDragging(what) {
            dispatch(toggleDragging(what))
        },

        setInitialCoords(coords, component) {
            dispatch(setInitialCoords(coords, component))
        },

        setDragCoords(coords, component) {
            dispatch(setDragCoords(coords, component))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

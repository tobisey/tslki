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
import Twelve from './twelve.js'
import Raitre from './raitre.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navHandleKeyDown = this.navHandleKeyDown.bind(this)
        this.worksLED = this.worksLED.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseDownWorks = this.handleMouseDownWorks.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDragWorks = this.handleDragWorks.bind(this)
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

        var posX = elem[0].offsetLeft;
        var posY = elem[0].offsetTop;

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

    handleMouseDownWorks(e) {
        var elem = document.getElementsByClassName('escWorksWrapper');
        var posX = elem[0].parentNode.offsetLeft - 20;
        var posY = elem[0].parentNode.offsetTop - 110;

        console.log(posX, posY);

        this.props.toggleDragging(true);

        var coords = {
            x: e.clientX - parseInt(posX),
            y: e.clientY - parseInt(posY)
        };

        this.props.setInitialCoords(coords, 'works');

        e.stopPropagation();
        e.preventDefault();
    }

    handleDragWorks(e) {

        if (!this.props.dragging) {
            return
        }

        var oldLeft;
        var oldTop;

        this.props.worksVisible.map(work => {
            if (work.name == 'works') {
                oldLeft = work.x;
                oldTop = work.y;
            }
        })

        var newCoords = {
            x: (e.clientX += 20) - oldLeft,
            y: (e.clientY += 10) - oldTop
        }

        this.props.setDragCoords(newCoords, 'works');

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
                    handleMouseDownWorks = {this.handleMouseDownWorks}
                    handleMouseUp = {this.handleMouseUp}
                    handleDragWorks = {this.handleDragWorks}
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
                    if (work.name === 'ef1' && work.visible) {
                        return <Ef1 ref="ef1"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'ef2' && work.visible) {
                        return <Ef2 ref="ef2"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'ef3' && work.visible) {
                        return <Ef3 ref="ef3"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'ef4' && work.visible) {
                        return <Ef4 ref="ef4"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'ef5' && work.visible) {
                        return <Ef5 ref="ef5"
                            handleMouseDown = {this.handleMouseDown}
                            handleMouseUp = {this.handleMouseUp}
                            handleDrag = {this.handleDrag}
                            handleMouseLeave = {this.handleMouseLeave}
                        />
                    }
                })}
                {this.props.worksVisible && this.props.worksVisible.map((work) => {
                    if (work.name === 'ef6' && work.visible) {
                        return <Ef6 ref="ef6"
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

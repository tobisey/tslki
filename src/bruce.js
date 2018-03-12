import React from 'react';
import { connect } from 'react-redux';
import { windowMounted, windowUnmounted, bringWindowToFront, toggleWork } from './actions.js';

class Bruce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLoadCounter: 0,
            sliding: false
        };
        this.handleMouseDownSlide = this.handleMouseDownSlide.bind(this);
        // this.handleMouseUpSlide = this.handleMouseUpSlide.bind(this);
        // this.handleMouseLeaveSlide = this.handleMouseLeaveSlide.bind(this);
        // this.handleSlide = this.handleSlide.bind(this);
    }

    componentDidMount() {
        this.props.windowMounted('bruce');
        setTimeout(() => {
            this.refs.bruce.style.zIndex = this.props.topZIndex;
        }, 1)
    }

    componentWillUnmount() {
        this.props.windowUnmounted('bruce');
    }

    startBringingToFront(component) {
        if (this.refs.bruce.style.zIndex != this.props.topZIndex) {
            this.props.bringWindowToFront(component);
        }
    }

    imageOnLoad() {
        this.setState({ imageLoadCounter: this.state.imageLoadCounter += 1}, () => {
            if (this.state.imageLoadCounter === 2) {
                this.setState({
                    widthToScroll: document.getElementsByClassName('bruceImageWrapper')[0].scrollWidth - 600
                }, () => {
                    console.log(this.state.widthToScroll);
                })
            }
        })
    }

    handleMouseDownSlide(e) {
        console.log('clientx', e.clientX);
        var posX = document.getElementsByClassName('slider')[0].getBoundingClientRect().x;
        var cX = e.clientX
        console.log('posx', posX);
        e.stopPropagation();

        this.setState({sliding: true}, () => {
            this.setState({
                x: cX - posX
            }, () => {
                console.log('statex', this.state.x);
            });
        })
    }

    handleMouseUpSlide(e) {
        e.stopPropagation();
        this.setState({
            sliding: false
        })
    }

    handleMouseLeaveSlide(e) {
        e.stopPropagation();
        this.setState({
            sliding: false
        })
    }

    handleSlide(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!this.state.sliding) {
            return;
        }
        if (e.clientX - document.getElementsByClassName('bruce')[0].getBoundingClientRect().x > 265) {
            console.log('227');
            return;
        }
        if (e.clientX - document.getElementsByClassName('bruce')[0].getBoundingClientRect().x < 54) {
            console.log('15');
            return;
        }
        this.refs.slider.style.left = (e.clientX - document.getElementsByClassName('bruce')[0].getBoundingClientRect().x) - this.state.x + 'px';
    }

    render() {

        var left;
        var top;

        this.props.worksVisible.map(work => {
            if (work.name == 'bruce') {
                left = work.x2;
                top = work.y2;
            }
        })

        return (
            <div style={{left: left + 'px', top: top + 'px'}}
                 onMouseMove={(e) => this.props.handleDrag(e, 'bruce')}
                 onMouseUp={(e) => this.props.handleMouseUp(e)}
                 onMouseDown={(e) => {this.startBringingToFront('bruce'); this.props.handleMouseDown(e, 'bruce')}}
                 onMouseLeave={(e) => this.props.handleMouseLeave(e)}
                 className="window bruce" ref="bruce">

                <div className="escWrapper">
                    <a className="windowEsc" onClick={() => this.props.toggleWork('bruce')}>Esc</a>
                    <p className="windowTitle">The Worst Bruce Nauman in Scotland</p>
                </div>

                <div className="bruceScrollWrap">
                    <div className="bruceImageWrapper" ref="bruceImageWrapper">
                        <img className="bruceImage" onLoad={() => this.imageOnLoad()} src="images/nauman1.jpg" alt="bruce"/>
                        <img className="bruceImage" onLoad={() => this.imageOnLoad()} src="images/nauman2.jpg" alt="bruce"/>
                    </div>
                </div>

                <div className="sliderWrapper" ref="sliderWrapper">
                    <div className="gap"></div>
                    <div className="slider" ref="slider"
                        onMouseDown={(e) => this.handleMouseDownSlide(e)}
                        onMouseUp={(e) => this.handleMouseUpSlide(e)}
                        onMouseMove={(e) => this.handleSlide(e)}
                        >
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topZIndex: state.topZIndex,
        allZIndex: state. allZIndex,
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

export default connect(mapStateToProps, mapDispatchToProps)(Bruce)

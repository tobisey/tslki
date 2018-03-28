import React from 'react';
import { connect } from 'react-redux';
import { changeSelectedOutfit, logInTerminal } from './actions.js'

class Outfits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.outfitsHandleKeyDown = this.outfitsHandleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.outfitsHandleKeyDown);
    }

    outfitsHandleKeyDown(e) {
        if (e.keyCode === 71 && this.props.selectedOutfit != 'glasses') {
            this.props.changeSelectedOutfit('glasses');
            this.highlightSelectedOutfitButton('glasses');
        }

        if (e.keyCode === 83 && this.props.selectedOutfit != 'speedo') {
            this.props.changeSelectedOutfit('speedo');
            this.highlightSelectedOutfitButton('speedo');
        }

        if (e.keyCode === 76 && this.props.selectedOutfit != 'lowEnd') {
            this.props.changeSelectedOutfit('lowEnd');
            this.highlightSelectedOutfitButton('lowEnd');
        }

        if (e.keyCode === 72 && this.props.selectedOutfit != 'hats') {
            this.props.changeSelectedOutfit('hats');
            this.highlightSelectedOutfitButton('hats');
        }

        if (e.keyCode === 68 && this.props.selectedOutfit != 'driving') {
            this.props.changeSelectedOutfit('driving');
            this.highlightSelectedOutfitButton('driving');
        }

        if (e.keyCode === 66 && this.props.selectedOutfit != 'busta') {
            this.props.changeSelectedOutfit('busta');
            this.highlightSelectedOutfitButton('busta');
        }
    }

    highlightSelectedOutfitButton(outfit) {

            for (var val in this.refs) {
                if (val === 'glasses' || val === 'speedo' || val === 'lowEnd' || val === 'hats' || val === 'driving' || val === 'busta') {
                    if (this.refs[val].classList.contains('on')) {
                        this.refs[val].classList.remove('on')
                    }
                }
                this.refs[outfit].classList.add('on');
            }
            this.props.logInTerminal(`outfits > ${outfit} ~ selected`);

    }

    clickedToSelect(outfit) {
        if (this.props.selectedOutfit == outfit) {
            return;
        } else {
            this.props.changeSelectedOutfit(outfit);
            this.highlightSelectedOutfitButton(outfit);
        }
    }

    outfitClick(who) {
        if (who == 'one') {
            this.props.logInTerminal(`artist > tobi - aka boaby aka the real mark hamill`);
        } else {
            this.props.logInTerminal(`artist > lachlan - aka sack aka yak aka fife dog aka fìobha cù`);
        }
    }

    render() {

        const { selectedOutfit } = this.props

        var outfitBackgroundOne = require('images/' + selectedOutfit + '1.gif');
        var outfitBackgroundTwo = require('images/' + selectedOutfit + '2.gif');

        return (
            <div className="outfits">
                <div onClick={() => this.outfitClick('one')} className="outfitsImageWrap" ref="outfitOne"><img className="outfitImage" src={outfitBackgroundOne}/></div>
                <div onClick={() => this.outfitClick('two')} className="outfitsImageWrap" ref="outfitTwo"><img className="outfitImage" src={outfitBackgroundTwo}/></div>

                <div className="controls">
                    <div className="controlsRow">
                        <div className="controlsOption" ref="glasses"><a onClick={() => this.clickedToSelect('glasses')}>Glasses</a></div>
                        <div className="controlsOption" ref="speedo"><a onClick={() => this.clickedToSelect('speedo')}>Speedo</a></div>
                        <div className="controlsOption on" ref="lowEnd"><a onClick={() => this.clickedToSelect('lowEnd')}>LowEnd</a></div>
                    </div>
                    <div className="controlsRow">
                        <div className="controlsOption" ref="hats"><a onClick={() => this.clickedToSelect('hats')}>Hats</a></div>
                        <div className="controlsOption" ref="driving"><a onClick={() => this.clickedToSelect('driving')}>Driving</a></div>
                        <div className="controlsOption" ref="busta"><a onClick={() => this.clickedToSelect('busta')}>Busta</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedOutfit: state.selectedOutfit && state.selectedOutfit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSelectedOutfit(outfit) {
            dispatch(changeSelectedOutfit(outfit))
        },

        logInTerminal(message) {
            dispatch(logInTerminal(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Outfits)

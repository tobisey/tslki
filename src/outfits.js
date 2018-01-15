import React from 'react';

export default class Outfits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'lowEnd'
        };
    }

    handleClick(x) {
        if (this.state.current != x) {
            this.refs[this.state.current].classList.remove('on');
            for (var val in this.refs) {
                if (val == x) {
                    this.setState({current: x}, () => {
                        this.refs[x].classList.add('on');
                        this.refs.outfitOne.style.backgroundImage = `url('images/${x}1.gif')`
                        this.refs.outfitTwo.style.backgroundImage = `url('images/${x}2.gif')`
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="outfits">
                <div className="outfitsImageWrap" ref="outfitOne"></div>
                <div className="outfitsImageWrap" ref="outfitTwo"></div>

                <div className="controls">
                    <div className="controlsRow">
                        <div className="controlsOption" ref="shades"><a onClick={() => this.handleClick('shades')}>Shades</a></div>
                        <div className="controlsOption" ref="speedo"><a onClick={() => this.handleClick('speedo')}>Speedo</a></div>
                        <div className="controlsOption on" ref="lowEnd"><a onClick={() => this.handleClick('lowEnd')}>LowEnd</a></div>
                    </div>
                    <div className="controlsRow">
                        <div className="controlsOption" ref="hats"><a onClick={() => this.handleClick('hats')}>Hats</a></div>
                        <div className="controlsOption" ref="driving"><a onClick={() => this.handleClick('driving')}>Driving</a></div>
                        <div className="controlsOption" ref="busta"><a onClick={() => this.handleClick('busta')}>Busta</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

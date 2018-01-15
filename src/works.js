import React from 'react';

export default class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="works">
                <div className="x"><a onClick={this.props.showWorks}>Esc</a></div>
                <div className="scrollable">
                    <div className="linkWrapper"><a href="#">The Worst Bruce Nauman in Scotland</a></div>
                    <div className="linkWrapper"><a href="#">Are We Saying The Lift Is Or Isn't Art?</a></div>
                    <div className="linkWrapper"><a onClick={this.props.showCarmonica}>Carmonica Harmonicar</a></div>
                    <div className="linkWrapper"><a href="#">Not Static</a></div>
                    <div className="linkWrapper"><a href="#">The Font (24 Hours Of Non-Work)</a></div>
                    <div className="linkWrapper"><a href="#">Parallels</a></div>
                    <div className="linkWrapper"><a href="#">Edited Films</a></div>
                    <div className="linkWrapper"><a href="#">Pillows</a></div>
                    <div className="linkWrapper"><a onClick={this.props.showPink}>Pink</a></div>
                    <div className="linkWrapper"><a href="#">Break</a></div>
                    <div className="linkWrapper"><a onClick={this.props.showTwelve}>12 Are Stolen</a></div>
                    <div className="linkWrapper"><a href="#">Rhythm 2</a></div>
                    <div className="linkWrapper"><a onClick={this.props.showRaitre}>Raitre</a></div>
                </div>
            </div>
        )
    }
}

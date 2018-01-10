import React from 'react';

export default class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="works">
                <div><a className="x" onClick={this.props.showWorks}>(esc)</a></div>
                <div className="scrollable">
                    <div><a href="#">the worst bruce nauman in scotland</a></div>
                    <div><a href="#">are we saying the lift is or isn't art?</a></div>
                    <div><a onClick={this.props.showCarmonica}>carmonica harmonicar</a></div>
                    <div><a href="#">not static</a></div>
                    <div><a href="#">the font (24 hours of non-work)</a></div>
                    <div><a href="#">parallels</a></div>
                    <div><a href="#">edited films</a></div>
                    <div><a href="#">pillows</a></div>
                    <div><a onClick={this.props.showPink}>pink</a></div>
                    <div><a href="#">break</a></div>
                    <div><a onClick={this.props.showTwelve}>12 are stolen</a></div>
                    <div><a href="#">rhythm 2</a></div>
                    <div><a onClick={this.props.showRaitre}>raitre</a></div>
                </div>
            </div>
        )
    }
}

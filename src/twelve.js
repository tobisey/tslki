import React from 'react';

export default class Twelve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="window twelve">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showTwelve}>Esc</a>
                    <p className="smallTitle">12 Are Stolen</p>
                </div>
                <video src="/videos/12 are stolen.mp4" width="614px" height="460px" controls></video>
            </div>
        )
    }
}

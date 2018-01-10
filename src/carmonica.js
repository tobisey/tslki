import React from 'react';

export default class Carmonica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="window carmonica">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showCarmonica}>(esc)</a>
                    <p className="smallTitle">// carmonica harmonicar</p>
                </div>
                <video src="/videos/carmonica.mp4" width="638px" height="384px" controls></video>
            </div>
        )
    }
}

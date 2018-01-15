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
                    <a className="smallX" onClick={this.props.showCarmonica}>Esc</a>
                    <p className="smallTitle">Carmonica Harmonicar</p>
                </div>
                <video src="/videos/carmonica.mp4" width="638px" height="384px" controls></video>
            </div>
        )
    }
}

import React from 'react';

export default class Pink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="window pink">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showPink}>Esc</a>
                    <p className="smallTitle">Pink</p>
                </div>
                <video src="/videos/pink-web-edit.mp4" width="614px" height="460px" controls></video>
            </div>
        )
    }
}

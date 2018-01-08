import React from 'react';

export default class Raitre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="window raitre">
                <div className="smallXWrapper">
                    <a className="smallX" onClick={this.props.showRaitre}>(Esc)</a>
                    <p className="smallTitle">// raitre</p>
                </div>
                <video src="/videos/raitre web edit.mp4" width="614px" height="460px" controls></video>
            </div>
        )
    }
}

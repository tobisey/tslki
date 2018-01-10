import React from 'react';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="nav">
                <div className="corpsePerspective">
                    <img className="corpse" src="/images/corpse.png" alt="corpse"/>
                </div>
                <div className="title">
                    <p>Tobias Seymour &</p>
                    <p>Lachlan Kosaniukinnes</p>
                </div>
                <div className="navLinks">
                    <div><div className="dot"></div><a onClick={this.props.showWorks}>Works</a></div>
                    <div><div className="dot"></div><a href="#">CV</a></div>
                    <div><div className="dot"></div><a href="#">mail@tslki.com</a></div>
                </div>
            </div>
        )
    }
}

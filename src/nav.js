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
                    <div className="linkWrapper"><div className="dot"></div><a id="lkOne" onClick={this.props.showWorks}>Works</a></div>
                    <div className="linkWrapper"><div className="dot" id="dTwo"></div><a id="lkTwo" href="#">CV</a></div>
                    <div className="linkWrapper" id="lkThree"><div className="dot" id="dThree"></div><a href="#">mail@tslki.com</a></div>
                </div>
            </div>
        )
    }
}

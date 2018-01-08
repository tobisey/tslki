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
                <p>tobias seymour &</p>
                <p>lachlan kosaniukinnes</p>
                <div><a onClick={this.props.showWorks}>works</a></div>
                <div><a href="#">cv</a></div>
                <div><a href="#">mail@tslki.com</a></div>
            </div>
        )
    }
}

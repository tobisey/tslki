import React from 'react';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // navHandleClick(x) {
    //     if (this.state.current != x) {
    //         if (this.state.current) {
    //             this.refs[this.state.current].classList.remove('dotHighlighted');
    //         }
    //         for (var val in this.refs) {
    //             if (val == x) {
    //                 this.setState({current: x}, () => {
    //                     this.refs[x].classList.add('dotHighlighted');
    //                 });
    //             }
    //         }
    //     }
    //
    //     if (x === 'works') {
    //         this.props.showWorks();
    //     }
    // }

    worksHandleClick() {
        if (this.refs['works'].classList.contains('dotHighlighted')) {
            this.refs['works'].classList.remove('dotHighlighted');
        } else {
            this.refs['works'].classList.add('dotHighlighted');
        }
        this.props.showWorks()
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
                    <div className="linkWrapper"><div className="dot" ref="works"></div><a onClick={() => this.worksHandleClick()}>Works</a></div>
                    <div className="linkWrapper"><div className="dot" ref="cv"></div><a onClick={() => this.cvHandleClick()}>CV</a></div>
                    <div className="linkWrapper"><div className="dot" ref="email"></div><a onClick={() => this.emailHandleClick()}>mail@tslki.com</a></div>
                </div>
            </div>
        )
    }
}

import React from 'react';

export default class Works extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.worksHandleKeyDown = this.worksHandleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.worksHandleKeyDown);
        console.log(this.state.current);
        this.setState({current: 1})
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.worksHandleKeyDown)
    }

    worksHandleKeyDown(e) {
        console.log(this.state);
        if (e.keyCode === 40) {
            var current = this.refs[this.state.current];
            var newState = this.state.current + 1;
            if (newState > 13) {
                newState = 1;
            }
            var next = this.refs[newState + ''];
            this.setState({current: newState}, () => {
                current.classList.remove('highlighted');
                next.classList.add('highlighted');
            })
        }

        if (e.keyCode === 38) {
            var current = this.refs[this.state.current];
            var newState = this.state.current - 1;
            if (newState < 1) {
                newState = 13;
            }
            var next = this.refs[newState + ''];
            this.setState({current: newState}, () => {
                current.classList.remove('highlighted');
                next.classList.add('highlighted');
            })
        }

        if (e.keyCode === 13) {
            if (this.state.current === 3) {
                this.props.showCarmonica();
            }

            if (this.state.current === 9) {
                this.props.showPink();
            }

            if (this.state.current === 11) {
                this.props.showTwelve();
            }

            if (this.state.current === 13) {
                this.props.showRaitre();
            }
        }

        if (e.keyCode === 27) {
            this.setState({current: 1});
            this.props.hideWorks();
        }
    }

    handleClick(x) {
        this.refs[this.state.current + ''].classList.remove('highlighted');
        for (var val in this.refs) {
            if (val == x) {
                this.setState({current: x}, () => {
                    this.refs[x].classList.add('highlighted');
                })
            }
        }

        if (x === 3) {
            this.props.showCarmonica();
        }

        if (x === 9) {
            this.props.showPink();
        }

        if (x === 11) {
            this.props.showTwelve();
        }

        if (x === 13) {
            this.props.showRaitre();
        }
    }

    closeWorks() {
        this.setState({current: 1});
        this.props.hideWorks();
    }

    render() {
        return (
            <div className="works">
                <div className="x"><a onClick={() => {this.closeWorks()}}>Esc</a></div>
                <div className="scrollable">
                    <div className="linkWrapper highlighted" ref="1"><a href="#">The Worst Bruce Nauman in Scotland</a></div>
                    <div className="linkWrapper" ref="2"><a href="#">Are We Saying The Lift Is Or Isn't Art?</a></div>
                    <div className="linkWrapper" ref="3"><a onClick={() => {this.handleClick(3)}}>Carmonica Harmonicar</a></div>
                    <div className="linkWrapper" ref="4"><a href="#">Not Static</a></div>
                    <div className="linkWrapper" ref="5"><a href="#">The Font (24 Hours Of Non-Work)</a></div>
                    <div className="linkWrapper" ref="6"><a href="#">Parallels</a></div>
                    <div className="linkWrapper" ref="7"><a href="#">Edited Films</a></div>
                    <div className="linkWrapper" ref="8"><a href="#">Pillows</a></div>
                    <div className="linkWrapper" ref="9"><a onClick={() => {this.handleClick(9)}}>Pink</a></div>
                    <div className="linkWrapper" ref="10"><a href="#">Break</a></div>
                    <div className="linkWrapper" ref="11"><a onClick={() => {this.handleClick(11)}}>12 Are Stolen</a></div>
                    <div className="linkWrapper" ref="12"><a href="#">Rhythm 2</a></div>
                    <div className="linkWrapper" ref="13"><a onClick={() => {this.handleClick(13)}}>Raitre</a></div>
                </div>
            </div>
        )
    }
}

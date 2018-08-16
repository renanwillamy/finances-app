import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { name, handleClick } = this.props
        return (
            <div>
                <button onClick={handleClick}>
                    {name}
                </button>
            </div>
        );
    }

}

export default Button;
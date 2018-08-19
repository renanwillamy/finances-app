import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { id, name, handleClick, classNameButton } = this.props
        return (
                <button id={id} onClick={handleClick} className={classNameButton}>
                    {name}
                </button>
        );
    }

}

export default Button;
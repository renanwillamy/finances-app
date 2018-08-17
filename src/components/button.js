import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { id, name, handleClick, classNameButton } = this.props
        return (
            <div>
                <button id={id} onClick={handleClick} className={classNameButton}>
                    {name}
                </button>
            </div>
        );
    }

}

export default Button;
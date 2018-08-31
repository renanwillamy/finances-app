import React, {Component} from 'react';

class CustomInput extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {label,inputValue,fieldName, errorMessage, onChangeFunction } = this.props
        return (
            <div>
                <label htmlFor={fieldName}>
                    {label}:</label>
                <input type="text" className={(errorMessage.length > 0 ? 'error-fields' : '')} name={fieldName} value={inputValue}
                       onChange={onChangeFunction}/>
                <br/>
                <span className={'form-span-error'} hidden={(errorMessage.length <= 0)}>{errorMessage}</span>
            </div>
        );
    }

}

export default CustomInput;
import React, {Component} from 'react';
import Utils from "../Utils";
import DatePicker from "react-datepicker/es";

class CustomDatePicker extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {label,inputValue,fieldName, errorMessage, onChangeFunction } = this.props
        let className = (errorMessage && errorMessage.length > 0) ? 'error-fields' : '';
        return (
            <div>
                <label htmlFor={label}>
                    Due Date:</label>
                <DatePicker
                    className={className}
                    required={true}
                    name={fieldName}
                    selected={inputValue}
                    onChange={onChangeFunction}
                    dateFormatCalendar={Utils.DATE_FORMAT}
                    dateFormat={Utils.DATE_FORMAT}
                />
                <span className={'form-span-error'} hidden={(!errorMessage||errorMessage.length <= 0)}>{errorMessage}</span>
            </div>
        );
    }

}

export default CustomDatePicker;
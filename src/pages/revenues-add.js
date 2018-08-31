import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import Button from '../components/button'
import Utils from '../Utils'
import validator from 'validator'
import {withAlert} from 'react-alert'
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import CustomInput from "../components/custom-input";
import CustomDatePicker from "../components/custom-date-picker";

class RevenueAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: '',
            sourceName: '',
            dueDate: null,
            receivedDate: null,
            information: '',
            errorName: '',
            errorValue: '',
            errorSource: '',
            errorDueDate: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleReceivedDateChange = this.handleReceivedDateChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.createRevenue = this.createRevenue.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }


    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleValueChange(event) {
        if (validator.isFloat(event.target.value) || event.target.value === '') {
            this.setState({amount: event.target.value});
        }
    }

    handleSourceChange(event) {
        this.setState({sourceName: event.target.value});
    }

    handleDueDateChange(date) {
        this.setState({
            dueDate: date
        })
    }

    handleReceivedDateChange(date) {
        this.setState({
            receivedDate: date
        })
    }

    goBack() {
        this.props.history.push('/revenues');
    }

    showMessage(isSuccess) {
        if (isSuccess) {
            this.props.alert.success("Created")
            this.setState({
                name: '',
                amount: '',
                sourceName: '',
                dueDate: null,
                receivedDate: null,
                information: ''
            })
        } else {
            this.props.alert.error("Error")
        }
    }

    validate() {
        const {name, amount, dueDate, sourceName, receivedDate, information} = this.state
        let validated = true;
        if (name.length < 2) {
            this.setState({errorName: 'The name must contain more then two characters'});
            validated = false;
        } else {
            this.setState({errorName: ''});
        }

        if (amount.length === 0) {
            this.setState({errorValue: 'The amount must be greater than 0'});
            validated = false;
        } else {
            this.setState({errorValue: ''});
        }

        if (sourceName.length < 2) {
            this.setState({errorSource: 'The source name must contain more then two characters'});
            validated = false;
        } else {
            this.setState({errorSource: ''});
        }

        if (!dueDate) {
            this.setState({errorDueDate: 'The due date is required'});
            validated = false;
        } else {
            this.setState({errorDueDate: ''});
        }

        return validated;
    }

    createRevenue() {
        const {name, amount, dueDate, receivedDate, information} = this.state

        if (this.validate()) {
            let date = receivedDate ? receivedDate.valueOf(): 0
            axios.post(Utils.URL_BASE + '/revenue', {
                name: name,
                amount: amount,
                sourceName: '',
                dueDate: dueDate.valueOf(),
                receivedDate: date,
                information: information,
            })
                .then(function (response) {
                    return response.data.data > 0;

                }).then((result) =>
                this.showMessage(result)
            )
                .catch(function (error) {
                    console.log(error)
                });
        }

    }

    render() {
        const {
            name, amount, sourceName, dueDate, receivedDate, errorName, errorValue,
            errorDueDate, errorSource
        } = this.state;
        return (
            <div className={'container'}>
                <form className={'form shadow'}>
                    <CustomInput label={'Name'} errorMessage={errorName} fieldName={'name'} inputValue={name}
                                 onChangeFunction={this.handleNameChange}/>

                    <CustomInput label={'Amount'} errorMessage={errorValue} fieldName={'revenueValue'}
                                 inputValue={amount}
                                 onChangeFunction={this.handleValueChange}/>

                    <CustomInput label={'Source'} errorMessage={errorSource} fieldName={'source'}
                                 inputValue={sourceName}
                                 onChangeFunction={this.handleSourceChange}/>

                    <CustomDatePicker label={'Due Date'} errorMessage={errorDueDate} fieldName={'dueDate'}
                                      inputValue={dueDate}
                                      onChangeFunction={this.handleDueDateChange}/>

                    <CustomDatePicker label={'Received Date'} fieldName={'receivedDate'}
                                      inputValue={receivedDate}
                                      onChangeFunction={this.handleReceivedDateChange}/>

                    <div className={'form-buttons'}>
                        <Button name={'Create'} classNameButton={'button-blue'} handleClick={this.createRevenue}/>
                        <Button name={'Back'} handleClick={this.goBack} classNameButton={'button-blue'}/>
                    </div>

                </form>
            </div>
        );
    }
}

export default withAlert(RevenueAdd);
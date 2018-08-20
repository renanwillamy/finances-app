import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import Button from '../components/button'
import Utils from '../Utils'
import {withAlert} from 'react-alert'
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

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
        this.setState({amount: event.target.value});
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

    showMessage(isSuccess){
        if(isSuccess){
            this.props.alert.success("Created")
            this.setState({
                name: '',
                amount: '',
                sourceName: '',
                dueDate: null,
                receivedDate: null,
                information: ''
            })
        }else {
            this.props.alert.error("Error")
        }
    }

    createRevenue() {
        const {name, amount, dueDate, receivedDate, information} = this.state

        axios.post(Utils.URL_BASE + '/revenue', {
            name: name,
            amount: amount,
            sourceName: '',
            dueDate: dueDate.valueOf(),
            receivedDate: receivedDate.valueOf(),
            information: information,
        })
            .then(function (response) {
                if (response.data.data > 0) {
                   return true

                } else {
                    return false;
                }

            }).then((result)=>
                this.showMessage(result)
        )
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        const {name, amount, sourceName, dueDate, receivedDate} = this.state;
        return (
            <div className={'container'}>
                <form className={'form shadow'}>
                    <div>
                        <label htmlFor={'name'}>
                            Name:</label>
                        <input type="text" name="name" value={name} onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        <label htmlFor={'revenueValue'}>
                            Value:</label>
                        <input type="text" name="revenueValue" value={amount} onChange={this.handleValueChange}/>
                    </div>
                    <div>
                        <label htmlFor={'revenueValue'}>
                            Source:</label>
                        <input type="text" name="revenueValue" value={sourceName} onChange={this.handleSourceChange}/>
                    </div>
                    <div>
                        <label htmlFor={'dueDate'}>
                            Due Date:</label>
                        <DatePicker
                            name={'dueDate'}
                            selected={dueDate}
                            onChange={this.handleDueDateChange}
                            dateFormatCalendar={Utils.DATE_FORMAT}
                            dateFormat={Utils.DATE_FORMAT}
                        />
                    </div>
                    <div>
                        <label htmlFor={'receivedDate'}>
                            Received Date:</label>
                        <DatePicker
                            name={'receivedDate'}
                            selected={receivedDate}
                            onChange={this.handleReceivedDateChange}
                            dateFormatCalendar={Utils.DATE_FORMAT}
                            dateFormat={Utils.DATE_FORMAT}
                        />
                    </div>
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
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import Button from '../components/button'
import Utils from '../Utils'
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

class RevenueEdit extends Component {
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
    }

    componentDidMount() {
        const {match} = this.props;
        this.getRevenueById(match.params.id);
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

    getRevenueById(id) {
        axios.get(Utils.URL_BASE + '/revenues/' + id)
            .then(function (response) {
               let rev = response.data.data;
                return {
                    id: rev.id,
                    name: rev.name,
                    amount: rev.amount,
                    sourceName: '',
                    dueDate: moment(parseInt(rev.dueDate)),
                    receivedDate: moment(parseInt(rev.receivedDate)),
                    information: rev.information
                }

            }).then((revenue) => {
            this.setState(revenue)
        })
            .catch(function (error) {
                console.log(error)
            });
    }

    goBack() {
        this.props.history.push('/revenues');
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
                        <Button name={'Edit'} classNameButton={'button-blue'}/>
                        <Button name={'Back'} handleClick={this.goBack} classNameButton={'button-blue'}/>
                    </div>

                </form>
            </div>
        );
    }
}

export default RevenueEdit;
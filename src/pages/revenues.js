import React, {Component} from 'react'
import ReactTable from "react-table"
import Button from "../components/button"
import axios from "axios"
import moment from 'moment'
import 'react-table/react-table.css'
import './revenues.css'
import Utils from '../Utils'
import ModalConfirm from "../components/modal-confirm"

class Revenue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            revenues: [],
            revenueId: 0,
            showModal: false
        }
        this.goToEditPage = this.goToEditPage.bind(this)
        this.goToNew = this.goToNew.bind(this)
        this.confirmModalClick = this.confirmModalClick.bind(this)
        this.closeConfirmModal = this.closeConfirmModal.bind(this)
        this.listRevenues = this.listRevenues.bind(this)
        this.deleteRevenue = this.deleteRevenue.bind(this)
    }

    goToEditPage(value) {
        this.props.history.push(`/revenues/${value}`)
    }

    componentDidMount() {
        this.listRevenues()
    }

    listRevenues() {
        axios.get(Utils.URL_BASE + '/revenues')
            .then(function (response) {
                let list = []
                response.data.data.map((item) => {
                    list.push({
                        id: item.id,
                        name: item.name,
                        amount: item.amount,
                        sourceName: '',
                        dueDate: moment(parseInt(item.dueDate)).format('DD/MM/YYYY'),
                        receivedDate: item.receivedDate > 0 ? moment(parseInt(item.receivedDate))
                            .format('DD/MM/YYYY'):'',
                        information: item.information
                    })
                })
                return list
            }).then((list) => {
            this.setState({
                revenues: list
            })
        })
            .catch(function (error) {
                console.log(error)
            })
    }

    goToNew() {
        this.props.history.push(`/revenues-new`)
    }

    render() {
        const {revenues} = this.state

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        },
            {
                Header: 'Value',
                accessor: 'amount', // String-based value accessors!
                Cell: props => <span className='number'>{props.value}</span>
            },
            {
                Header: 'Source Name',
                accessor: 'sourceName'
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate'
            },
            {
                Header: 'Received Date',
                accessor: 'receivedDate'
            },
            {
                Header: 'Information',
                accessor: 'information'
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                filterable: false,
                Cell: row => (
                    <div className={'horizontal-buttons'}>
                    <Button name={'Edit'} classNameButton={'button-blue'}
                            handleClick={() => this.goToEditPage(row.row._original.id)}
                    />
                        <Button name={'Remove'} classNameButton={'button-red'}
                                handleClick={() => this.openConfirmModal(row.row._original.id)}
                        />
                    </div>
                )
            }
        ]

        return (
            <div className={'container table'}>
                <ReactTable
                    data={revenues}
                    columns={columns}
                    defaultPageSize={10}
                    filterable
                    className="-striped -highlight"
                />
                <Button id={'button-add'} handleClick={this.goToNew}
                        name={'New'} classNameButton={'button-blue'}/>
                {this.state.showModal ? <ModalConfirm title={'Delete Revenue'}
                              content={'Are you sure you want to delete this revenue?'}
                              handleConfirm={this.confirmModalClick} handleCloseButton={this.closeConfirmModal}
                />:null}
            </div>

        )
    }

    confirmModalClick(){
       this.deleteRevenue(this.state.revenueId)
    }

    deleteRevenue(id) {
        axios.delete(Utils.URL_BASE + '/revenue/'+id)
            .then(()=>this.listRevenues())
            .then(()=>this.closeConfirmModal())
            .catch(function (error) {
                console.log(error)
            })
    }

    openConfirmModal(id) {
        this.setState({
            revenueId: id,
            showModal: true
        })
    }
    closeConfirmModal(){
        this.setState({
            showModal: false
        })
    }
}

export default Revenue
import React, { Component } from 'react';
import ReactTable from "react-table";
import Button from "../components/button";
import 'react-table/react-table.css'
import './revenues.css';

class Revenue extends Component {
    constructor(props) {
        super(props);
        this.goToEditPage = this.goToEditPage.bind(this);
        this.goToNew = this.goToNew.bind(this);
    }

    goToEditPage(value) {
        this.props.history.push(`/revenues/${value}`)        
    }

    goToNew() {
        this.props.history.push(`/revenues-new`)        
    }

    render() {
        const data = [{
            name: 'Aluguel',
            revValue: 800.50,
            sourceName: 'José Maria',
            dueDate: '12/07/2017',
            receivedDate: '11/07/2017',
            information: 'Some information about the revenue',
            id: 12
        }]

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        },
        {
            Header: 'Value',
            accessor: 'revValue', // String-based value accessors!
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
                <Button name={'Edit'} classNameButton={'button-blue'}
                    handleClick={() => this.goToEditPage(row.row._original.id)}
                />
            )
        }
        ]

        return (
            <div className={'container table'}>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    filterable
                    className="-striped -highlight"
                />
                <Button id={'button-add'} handleClick={this.goToNew}
                 name={'New'} classNameButton={'button-blue'} />
            </div>

        );
    }
}

export default Revenue;
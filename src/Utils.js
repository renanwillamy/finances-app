import  { Component } from 'react';


class Utils extends Component {
    static DATE_FORMAT = 'DD/MM/YYYY'

    static convertToDate(date) {
        var array = date.split('/')
        return array[2]+'-'+array[1]+'-'+array[0]
    }
}

export default Utils;
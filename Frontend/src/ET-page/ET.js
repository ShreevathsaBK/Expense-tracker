import React, { Component } from 'react'
import axios from 'axios'
import DisplaySpend from './displayspend.js'
import FormSpend from './spendform.js'
import Welcome from './welcome.js'
import BarPlot from './barchart.js'
import PiePlot from './piechart.js'
import Reminder from './reminder.js'
import GeneratePDF from './generatepdf.js'


class ExpenseTracker extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            isloggedin: false,
            category: '',
            amount: 0,
            date: '',
            time: '',
            note: '',
            month: '',
            year: '',
            spends: [],
            remind: [],
            barData: [],
            pieData: [],
            pdfData: [],
            remindDate: '',
            remindNotes: ''
        }
    }


    componentDidMount() {
        var token = localStorage.getItem("TOKEN");
        if (token === "" || token === null) {
            localStorage.setItem("TOKEN", "");
        }

        else {
            axios.post('http://localhost:5000/TokenIsValid', { token: token })
                .then(response => {
                    if (response.data.success) {
                        axios.post('http://localhost:5000/getData', { id: response.data.user.id })
                            .then(data_response => {
                                this.setState({
                                    remind: data_response.data.reminder,
                                    spends: data_response.data.spend,
                                    username: response.data.user.username,
                                    email: response.data.user.email,
                                    isloggedin: true
                                })

                            })
                    }
                })
        }

        let newData = []
        for (let i = 0; i <= 31; i++)
            newData.push({ day: i, Money_Spent: 0 })
        this.setState({
            barData: newData
        })
    }

    formSubmit = e => {
        e.preventDefault();
        e.target.reset();

        var data = new Object();

        data._id = (new Date()).getTime();
        data.category = this.state.category
        data.amount = this.state.amount
        data.date = this.state.date
        data.time = this.state.time
        data.note = this.state.note


        this.setState(prevState => ({
            spends: [...prevState.spends, data]
        }))

        const token = localStorage.getItem("TOKEN");
        axios.post('http://localhost:5000/TokenIsValid', { token: token })
            .then(token_res => {
                if (token_res.data.success) {
                    axios.post('http://localhost:5000/spendData', { data: data, id: token_res.data.user.id })
                }
            })


    }

    remindFormSubmit = e => {
        e.preventDefault();
        e.target.reset();

        var remindData = new Object();
        remindData.r_id = (new Date()).getTime();
        remindData.remindDate = this.state.remindDate
        remindData.remindNotes = this.state.remindNotes

        this.setState(prevState => ({
            remind: [...prevState.remind, remindData]
        }))

        const token = localStorage.getItem("TOKEN");
        axios.post('http://localhost:5000/TokenIsValid', { token: token })
            .then(token_res => {
                if (token_res.data.success) {
                    axios.post('http://localhost:5000/remindData', { remindData: remindData, id: token_res.data.user.id })
                }
            })

    }

    delete = e => {
        const itemId = e.currentTarget.id;
        this.setState(prevState => ({
            spends: prevState.spends.filter(spend => spend._id != itemId)
        }))

        const token = localStorage.getItem("TOKEN");
        axios.post('http://localhost:5000/TokenIsValid', { token: token })
            .then(token_res => {
                if (token_res.data.success) {
                    axios.post('http://localhost:5000/deleteSpend', { itemid: itemId, userid: token_res.data.user.id })
                }
            })


    }

    deleteRemind = e => {
        const remindId = e.currentTarget.id;
        this.setState(prevState => ({
            remind: prevState.remind.filter(reminder => reminder.r_id != remindId)
        }))

        const token = localStorage.getItem("TOKEN");
        axios.post('http://localhost:5000/TokenIsValid', { token: token })
            .then(token_res => {
                if (token_res.data.success) {
                    axios.post('http://localhost:5000/deleteRemind', { remind_id: remindId, userid: token_res.data.user.id })
                }
            })
    }

    logout = e => {
        localStorage.setItem("TOKEN", "");
        this.setState({
            isloggedin: false
        })
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    plotBar = e => {
        e.preventDefault();
        const spendData = [...this.state.spends]
        let newData = []
        for (let i = 0; i <= 31; i++)
            newData.push({ day: i, Money_Spent: 0 })

        let date, year, month, day;
        for (let i in spendData) {
            date = spendData[i].date.split("-")
            year = date[0]
            month = date[1]
            day = Number(date[2])
            if (year === this.state.year && Number(month) === Number(this.state.month)) {
                newData[day].Money_Spent += Number(spendData[i].amount)
            }

        }

        this.setState({
            barData: newData
        })


    }

    plotPie = e => {
        e.preventDefault();
        const spendData = [...this.state.spends]
        let pieSpend = []
        const categories = ["food", "groceries", "health", "vehicles", "entertainment", "other"]
        for (let j = 0; j < 6; j++)
            pieSpend.push({ category: categories[j], Money_Spent: 0 })

        let date, year, month, day;
        for (let i in spendData) {
            date = spendData[i].date.split("-")
            year = date[0]
            month = date[1]
            day = Number(date[2])
            if (year === this.state.year && Number(month) === Number(this.state.month)) {
                for (let k = 0; k < 6; k++) {
                    if (spendData[i].category === pieSpend[k].category)
                        pieSpend[k].Money_Spent += Number(spendData[i].amount)
                }
            }
        }

        this.setState({
            pieData: pieSpend
        })
    }

    gpdf = e => {
        const spendData = [...this.state.spends]
        let pdfData = []
        let date, year, month, day;
        for (let i in spendData) {
            console.log(spendData[i].amount)
            date = spendData[i].date.split("-")
            year = date[0]
            month = date[1]
            day = Number(date[2])
            if (year === this.state.year && Number(month) === Number(this.state.month)) {
                pdfData.push(spendData[i]);
            }

        }
        this.setState({
            pdfData: pdfData
        })
        return this.state.pdfData
    }

    render() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const categories = ["food", "groceries", "health", "vehicles", "entertainment", "other"]
        if (this.state.isloggedin) {
            return (
                <div className='main'>
                    <Welcome username={this.state.username} spends={this.state.spends} logout={this.logout} />
                    <div className="level-one-container">
                        <div className="level-one-left">
                            <FormSpend change={this.change} categories={categories} formsubmit={this.formSubmit} />
                        </div>

                        <div className="level-one-right">
                            <DisplaySpend spends={this.state.spends} delete={this.delete} />
                        </div>
                    </div>

                    <div className='level-two-container'>
                        <div className='level-two-left'>
                            <BarPlot months={months} bardata={this.state.barData} change={this.change} plotbar={this.plotBar} />
                        </div>

                        <div className='level-two-right'>
                            <PiePlot months={months} categories={categories} pieData={this.state.pieData} change={this.change} plotpie={this.plotPie} />
                        </div>
                    </div>

                    <div className='level-three-container'>
                        <div className='level-three-left'>
                            <Reminder remindformsubmit={this.remindFormSubmit} remindData={this.state.remind} deleteremind={this.deleteRemind} change={this.change}></Reminder>
                        </div>
                        <div className='level-three-right'>
                            <GeneratePDF uname={this.state.username} monthname={this.state.month} months={months} pdfData={this.state.pdfData} gpdf={this.gpdf} change={this.change} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <h1 className='logout'> You have logged out, Login to access the page </h1>
            )
        }


    }


}

export default ExpenseTracker;
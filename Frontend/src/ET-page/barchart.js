import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';

class BarPlot extends Component {
    render() {
        const date = new Date()
        const year = String(date.getFullYear())
        return (
            <React.Fragment>
                <h3> Bar chart </h3>
                <div>
                    <form onSubmit={this.props.plotbar} autoComplete="off">
                        <label htmlFor="mm"> Month</label>
                        <select type="text" id="mm" name="month" placeholder="select the month" onChange={this.props.change} required>
                            {this.props.months.map((month, index) => (
                                <option key={index} value={String(index + 1)}>{month}</option>
                            ))}
                        </select>

                        <label htmlFor="yyyy"> Year</label>
                        <input type="text" id="yyyy" name="year" placeholder={year} onChange={this.props.change} required></input>

                        <input type="submit" value="Plot"></input>
                    </form>
                </div>

                <BarChart width={450} height={350} data={this.props.bardata} margin={{ top: 0, right: 0, left: 10, bottom: 0 }} >
                    <XAxis dataKey="day" stroke="white" />
                    <YAxis stroke="white" />
                    <Legend />
                    <Tooltip />
                    <Bar dataKey="Money_Spent" fill={'#4caf50'} />
                </BarChart>


            </React.Fragment>
        )
    }
}

export default BarPlot
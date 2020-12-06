import React, { Component } from 'react'
import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts'

class PiePlot extends Component {
    COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#A9A9A9'];

    render() {
        const date = new Date()
        const year = String(date.getFullYear())
        return (
            <React.Fragment>
                <h3> Pie chart </h3>
                <div>
                    <form onSubmit={this.props.plotpie} autoComplete="off">
                        <label htmlFor="mm1">Month</label>
                        <select type="text" id="mm1" name="month" placeholder="select the month" onChange={this.props.change} required>
                            {this.props.months.map((month, index) => (
                                <option key={index} value={String(index + 1)}>{month}</option>
                            ))}
                        </select>

                        <label htmlFor="yyyy1">Year</label>
                        <input type="text" id="yyyy1" name="year" placeholder={year} onChange={this.props.change} required></input>
                        <input type='submit' value='Plot'></input>
                    </form>
                </div>

                <PieChart width={450} height={350} >
                    <Pie dataKey="Money_Spent" data={this.props.pieData} color="#000000" nameKey="category" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
                        {
                            this.props.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>


            </React.Fragment>
        )
    }
}

export default PiePlot

// isAnimationActive={false}
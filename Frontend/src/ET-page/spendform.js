import React, { Component } from 'react'

class FormSpend extends Component {
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.formsubmit} className="spend-form" autoComplete="off">
                    <h3>Add a spend</h3>

                    <label htmlFor="cat"> Category
                    <select type="text" id="cat" name="category" placeholder="select category" onChange={this.props.change} required>
                            <option key='10' value=''>Select</option>
                            {
                                this.props.categories.map((categ, index) => (
                                    <option key={index + 11} value={categ}>{categ}</option>))
                            }
                        </select>
                    </label>

                    <label htmlFor="amt">Amount</label>
                    <input type="text" id="amt" name="amount" placeholder="Enter the amount" onChange={this.props.change} required></input>


                    <label htmlFor="dat">Date</label>
                    <input type="date" id="dat" name="date" placeholder="Enter the date" onChange={this.props.change} required></input>


                    <label htmlFor="tm">Time</label>
                    <input type="time" id="tm" name="time" placeholder="Enter the time" onChange={this.props.change} required></input>


                    <label htmlFor="txt">Note about the spend:</label>
                    <textarea rows='5' name="note" onChange={this.props.change} required></textarea>

                    <input type="submit" value="Add spend"></input>
                </form>

            </React.Fragment>
        )
    }
}

export default FormSpend
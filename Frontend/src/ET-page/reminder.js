import React, { Component } from 'react'

class Reminder extends Component {
    render() {
        let today = new Date();
        let td = today.getDate();
        let tm = today.getMonth() + 1;
        let ty = today.getFullYear();
        return (
            <React.Fragment>
                <div className="remindInput">
                    <h3>Set a Reminder</h3>
                    <form onSubmit={this.props.remindformsubmit} className="reminder-form" autoComplete="off">
                        <label htmlFor="remindDate"> Last Date</label>
                        <input type="date" id="remindDate" name="remindDate" placeholder="Enter the remind date" onChange={this.props.change} required></input>

                        <label htmlFor="txt"> Notes:</label>
                        <textarea rows='3' id="txt" name="remindNotes" onChange={this.props.change} required></textarea>

                        <input type="submit" value="Add Reminder"></input>
                    </form>
                </div>

                <div className="remindDisplay">
                    <ul>
                        {
                            this.props.remindData.map((item, index) => {
                                let cstyle
                                let date = item.remindDate.split("-")
                                let d = Number(date[2])
                                let m = Number(date[1])
                                let y = Number(date[0])

                                if (ty > y || (ty === y && tm > m) || (ty === y && tm === m && td > d))
                                    cstyle = { backgroundColor: 'rgb(255, 159, 159)', color: 'rgb(230, 0, 0)' }

                                return (
                                    <li key={item.r_id} className='remind-item' style={cstyle}>
                                        {item.remindNotes}
                                        <span id={item.r_id} onClick={this.props.deleteremind}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </span>
                                        <span style={cstyle}>{item.remindDate}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default Reminder
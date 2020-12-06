import React, { Component } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import pdf from './pdf.png'

class GeneratePDF extends Component {

    updatePDF = function () {
        let getPDFdata = this.props.gpdf;
        getPDFdata();
        setTimeout(this.generatePDF.bind(this), 1000);
    }
    generatePDF = function () {
        let bodyData = []
        let userName = this.props.uname
        let allmonths = this.props.months
        let month = allmonths[Number(this.props.monthname) - 1];
        let totalAmt = 0;
        for (let i in this.props.pdfData) {
            let newData = []
            newData.push(this.props.pdfData[i].category, this.props.pdfData[i].amount, this.props.pdfData[i].note, this.props.pdfData[i].date)
            bodyData.push(newData)
            totalAmt += Number(this.props.pdfData[i].amount)
        }
        bodyData.push(['Total Expense this month', totalAmt, '', ''])
        const doc = new jsPDF();
        doc.text("Username: " + userName, 15, 15)
        doc.autoTable({ html: '#my-table' })
        doc.autoTable({
            head: [['', 'Expenses of ' + month, '', ''], ['Category', 'Amount', 'Note', 'Date']],
            body: bodyData,
        })
        doc.save("expenses.pdf")
    }

    render() {
        return (
            <React.Fragment>

                <h3> Generate PDF </h3>
                <div className="input">
                    <label htmlFor="mm2"> Month
                    <select type="text" id="mm2" name="month" placeholder="select the month" onChange={this.props.change} required>
                            {this.props.months.map((month, index) => (
                                <option key={index} value={String(index + 1)}>{month}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="yyyy2"> Year
                    <input type="text" id="yyyy2" name="year" placeholder="Enter the year" onChange={this.props.change} required>
                        </input>
                    </label>
                    <p> Preview of pdf </p>
                    <img src={pdf} width='500' alt='pdf preview'></img>
                </div>



                <button className="pdf-button" onClick={this.updatePDF.bind(this)}>Download pdf</button>
            </React.Fragment>
        )
    }
}

export default GeneratePDF
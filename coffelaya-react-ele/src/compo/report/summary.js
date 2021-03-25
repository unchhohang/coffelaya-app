import axios from 'axios'
import sumPrice from '../../js functions/sum'
import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap';
import './summary.css'

const Summary = (props) => {


    const [totalSales, setTotalSales] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(
        () => {
            getTotalSales(props.startDate, props.endDate);
            getTotalExpenses(props.startDate, props.endDate);
            getTotalCredit(props.startDate, props.endDate);
        }
    );


    function getTotalSales(startDate, endDate) {
        let url = '/report/sold/' + startDate + '/' + endDate;
        axios.get(url)
            .then(data => {
                sumTotalSales(data.data);

            })
            .catch(err => console.log(err))

    }

    function getTotalExpenses(startDate, endDate) {
        let url = '/report/stock/' + startDate + '/' + endDate;
        axios.get(url)
            .then(data => {
                let stockList = data.data;
                let expenese = stockList.map((stock, i) => {
                    return (stock.cost);
                });

                if (expenese.length == 0) {
                    setTotalExpenses(0);

                } else {
                    setTotalExpenses(sumPrice(...expenese));
                }
            })
            .catch(err => console.log(err))

    }

    function getTotalCredit(startDate, endDate) {
        let url = '/report/credit/' + startDate + '/' + endDate;

        axios.get(url)
            .then(data => {
                let billList = data.data;
                let creditList = billList.map((bill, i) => {
                    return (bill.creditAmount);
                })

                if (creditList.length == 0) {
                    setTotalCredit(0);
                } else {
                    setTotalCredit(sumPrice(...creditList));
                }
            })
            .catch(err => console.log(err))
    }

    function sumTotalSales(itemData) {
        //list of (total price - discount)
        let salesList = itemData.map((item, i) => {
            return (item.totalPrice - item.discount);
        });

        if (salesList.length == 0) {
            setTotalSales(0);
        } else {
            setTotalSales(sumPrice(...salesList));
        }

    }



    return (
        <div id='summary-wrapper'>
            <Row id='cash-sales-exepnses'>
                <h1 className={'col-sm-5 sales'}>cash sales<br></br>
                    <span id='cash-sales'>{totalSales - totalCredit}</span>
                </h1>
                <span className={'col-sm-2'}></span>
                <h1 className={'col-sm-5 expenses'}>Expenses: <br></br>
                    <span id='total-expenses'>{totalExpenses}</span>
                </h1>
            </Row>
            <div id='profit'><h1>Profit: {totalSales - totalCredit - totalExpenses}</h1></div>
            <div id='total-credit'><h2>Credit sales: {totalCredit}</h2></div>
            <div id='total-sales'><h2>Total sales: {totalSales}</h2> </div>
        </div>
    );
}

export default Summary;
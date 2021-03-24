import React, { useState, useEffect } from 'react';
import DatePicker from '../compo/entries/datePicker'
import nepToEngDate from '../js functions/nepToEngDate'
import axios from 'axios'
import StockTable from '../compo/stock/stockTable'
import InputStock from '../compo/stock/inputStock'
import { Row } from 'react-bootstrap';
import './Stocks.css'

const Stocks = () => {
    const [date, setDate] = useState();
    const [stock, setStock] = useState();

    useEffect(() => {
        if (stock == null) {
            let [startDate, endDate] = nepToEngDate(new Date());
            getStocks(startDate, endDate);
        }
    });

    function selectDate(dateChoosen) {
        setDate(dateChoosen);
        let [startDate, endDate] = nepToEngDate(dateChoosen)
        getStocks(startDate, endDate);

    }

    function refreshStock(engDate) {
        let startDate = engDate;
        let endDateObj = new Date(engDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        let endDate = endDateObj.getFullYear() + "-" + (endDateObj.getMonth() + 1) + "-" + endDateObj.getDate();

        getStocks(startDate, endDate);

    }

    function getStocks(startDate, endDate) {
        let url = '/stock/' + startDate + '/' + endDate;
        axios.get(url)
            .then(data => setStock(data.data))
            .catch(err => console.log(err))
    }


    if (stock != undefined) {
        return (
            <>
                <Row >
                    <h6 className='col-sm-6'></h6>
                    <h6 className='col-sm-6'>
                        <Row>
                            <span id='date'>Date:</span>
                            <span id='date-picker'>
                                <DatePicker
                                    date={date}
                                    selectDate={selectDate}
                                />
                            </span>
                        </Row>
                    </h6>
                </Row>
                <div>
                    <StockTable
                        stock={stock}
                        date={date}
                        refreshStock={refreshStock}
                    />
                </div>
                <div>
                    <InputStock
                        date={date}
                        refreshStock={refreshStock}
                    />
                </div>
            </>

        );
    } else {
        return (<h1>wait...</h1>)
    }
}


export default Stocks;
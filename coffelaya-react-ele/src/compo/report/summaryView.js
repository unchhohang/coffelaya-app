import { Button } from 'react-bootstrap'
import BackForwBtns from './backForwBtns';
import './summaryView.css'
import TimeNav from './timeNav'
import Summary from './summary';
import { useState, useEffect } from 'react';
import NepaliDate from 'nepali-date-converter'

 
const SummaryView = (props) => {

    const [dateType, setDateType] = useState('day');
    const [nepaliDate, setNepaliDate] = useState(new NepaliDate());
    const [nepaliWeek, setNepaliWeek] = useState(new NepaliDate());
    const [nepaliMonth, setNepaliMonth] = useState(new NepaliDate());
    const [nepaliYear, setNepaliYear] = useState(new NepaliDate());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [displayNepDate, setDisplayNepDate] = useState();

    useEffect(() => {
        console.log('rerun useEffect of SummaryView');

        if (dateType == 'day') {
            getInitDay();
        } else if (dateType == 'week') {
            getInitWeek();
        } else if (dateType == 'month'){
            getInitMonth();
        } else if(dateType == 'year'){
            getInitYear();
        }

    }, [dateType]);

    function getInitDay() {
        let today = nepaliDate.toJsDate().toISOString();
        nepaliDate.setDate(nepaliDate.getDate() + 1);

        let tommorow = nepaliDate.toJsDate().toISOString();
        nepaliDate.setDate(nepaliDate.getDate() - 1);

        setStartDate(today);
        setEndDate(tommorow);
        setDisplayNepDate(nepaliDate.format('ddd, DD MMMM YYYY'));
    }

    function getInitWeek() {
        nepaliWeek.setDate(nepaliWeek.getDate() - nepaliWeek.getDay());

        let startWeek = nepaliWeek.toJsDate().toISOString();
        nepaliWeek.setDate(nepaliWeek.getDate() + 7);
        let endweek = nepaliWeek.toJsDate().toISOString();
        nepaliWeek.setDate(nepaliWeek.getDate() - 7);

        setStartDate(startWeek);
        setEndDate(endweek);

        setDisplayNepDate(nepaliWeek.format('DD MMMM YYYY'));
    }

    function getInitMonth(){
        nepaliMonth.setDate(1);
        
        let startMonth = nepaliMonth.toJsDate().toISOString();
        nepaliMonth.setMonth(nepaliMonth.getMonth() + 1);
        let endMonth = nepaliMonth.toJsDate().toISOString();
        nepaliMonth.setMonth(nepaliMonth.getMonth() - 1);
        console.log('this month');
        console.log(nepaliMonth);

        setStartDate(startMonth);
        setEndDate(endMonth);
        
        setDisplayNepDate(nepaliMonth.format('MMMM YYYY'));
    }

    function getInitYear(){
        nepaliYear.setDate(1);
        nepaliYear.setMonth(0)
        console.log('start year: ' + nepaliYear.format('DD MMMM YYYY'));
        let startYear = nepaliYear.toJsDate().toISOString();
        nepaliYear.setYear(nepaliYear.getYear() + 1);
        console.log('end year: ' + nepaliYear.format('DD MMMM YYYY'));
        let endYear = nepaliYear.toJsDate().toISOString();
        nepaliYear.setYear(nepaliYear.getYear() - 1);
        
        setStartDate(startYear);
        setEndDate(endYear);
        setDisplayNepDate(nepaliYear.format('YYYY'));
    }

    return (
        <>
            <TimeNav
                setDateType={setDateType}
                dateType={dateType}

            />
            <BackForwBtns
                dateType={dateType}
                nepaliDate={nepaliDate}
                setNepaliDate={setNepaliDate}
                nepaliWeek={nepaliWeek}
                setNepaliWeek={setNepaliWeek}
                nepaliMonth={nepaliMonth}
                setNepaliMonth={setNepaliMonth}
                nepaliYear={nepaliYear}
                setNepaliYear={setNepaliYear}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                displayNepDate={displayNepDate}
                setDisplayNepDate={setDisplayNepDate}
            />
            {
                ((startDate == undefined) && (endDate == undefined)) ? <h1>wait...</h1>
                    :
                    <Summary
                        startDate={startDate}
                        endDate={endDate}
                    />
            }
        </>
    );
}

export default SummaryView;
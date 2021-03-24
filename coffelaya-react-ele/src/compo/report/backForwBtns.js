import { Button } from 'react-bootstrap'
import './backForwBtns.css'


const BackForwBtns = (props) => {


    let nepaliDate = props.nepaliDate;
    let nepaliWeek = props.nepaliWeek;
    let nepaliMonth = props.nepaliMonth;
    let nepaliYear = props.nepaliYear;

    function backDate() {
        console.log('going back');

        if (props.dateType == 'day') {
            backwardDay();
        } else if (props.dateType == 'week') {
            backwardWeek();
        } else if (props.dateType == 'month') {
            backwardMonth();
        } else if (props.dateType == 'year') {
            backwardYear();
        }


    }

    function forwardDate() {
        console.log('going forward');

        if (props.dateType == 'day') {
            forwardDay();
        } else if (props.dateType == 'week') {
            forwardWeek();
        } else if (props.dateType == 'month') {
            forwardMonth();
        } else if (props.dateType == 'year') {
            forwardYear();
        }

    }

    function backwardDay() {
        props.setEndDate(nepaliDate.toJsDate().toISOString());
        nepaliDate.setDate(nepaliDate.getDate() - 1);
        props.setStartDate(nepaliDate.toJsDate().toISOString());

        props.setDisplayNepDate(nepaliDate.format('ddd, DD MMMM YYYY'));
    }

    function forwardDay() {
        nepaliDate.setDate(nepaliDate.getDate() + 1);
        props.setStartDate(nepaliDate.toJsDate().toISOString());
        nepaliDate.setDate(nepaliDate.getDate() + 1);
        props.setEndDate(nepaliDate.toJsDate().toISOString());
        nepaliDate.setDate(nepaliDate.getDate() - 1);

        props.setDisplayNepDate(nepaliDate.format('ddd, DD MMMM YYYY'));
    }

    function backwardWeek() {
        let endWeek = nepaliWeek.toJsDate().toISOString();
        console.log('endWeek');
        console.log(endWeek);

        nepaliWeek.setDate(nepaliWeek.getDate() - 7);
        let startWeek = nepaliWeek.toJsDate().toISOString();
        console.log('start week');
        console.log(startWeek);

        props.setStartDate(startWeek);
        props.setEndDate(endWeek);
        props.setDisplayNepDate(nepaliWeek.format('DD MMMM YYYY'));


    }

    function forwardWeek() {
        nepaliWeek.setDate(nepaliWeek.getDate() + 7);
        let startWeek = nepaliWeek.toJsDate().toISOString();
        nepaliWeek.setDate(nepaliWeek.getDate() + 7);
        let endWeek = nepaliWeek.toJsDate().toISOString();
        nepaliWeek.setDate(nepaliWeek.getDate() - 7);

        props.setStartDate(startWeek);
        props.setEndDate(endWeek);
        props.setDisplayNepDate(nepaliWeek.format('DD MMMM YYYY'));

    }

    //Months

    function backwardMonth() {
        let endMonth = nepaliMonth.toJsDate().toISOString();
        nepaliMonth.setMonth(nepaliMonth.getMonth() - 1);
        let startMonth = nepaliMonth.toJsDate().toISOString();

        props.setStartDate(startMonth);
        props.setEndDate(endMonth);
        props.setDisplayNepDate(nepaliMonth.format('MMMM YYYY'));
    }

    function forwardMonth() {
        nepaliMonth.setMonth(nepaliMonth.getMonth() + 1);
        let startMonth = nepaliMonth.toJsDate().toISOString();
        nepaliMonth.setMonth(nepaliMonth.getMonth() + 1);
        let endMonth = nepaliMonth.toJsDate().toISOString();
        nepaliMonth.setMonth(nepaliMonth.getMonth() - 1);

        props.setStartDate(startMonth);
        props.setEndDate(endMonth);
        props.setDisplayNepDate(nepaliMonth.format('MMMM YYYY'));
    }

    //year
    function backwardYear() {
        console.log('end year : ' + nepaliYear.format('DD MMMM YYYY'));
        let endYear = nepaliYear.toJsDate().toISOString();
        nepaliYear.setYear(nepaliYear.getYear() - 1);
        let startYear = nepaliYear.toJsDate().toISOString();
        console.log('start year : ' + nepaliYear.format('DD MMMM YYYY'));

        props.setStartDate(startYear);
        props.setEndDate(endYear);
        props.setDisplayNepDate(nepaliYear.format('YYYY'));

    }
    function forwardYear() {
        nepaliYear.setYear(nepaliYear.getYear() + 1);
        console.log('start year: ' + nepaliYear.format('DD MMMM YYYY'));
        let startYear = nepaliYear.toJsDate().toISOString();
        nepaliYear.setYear(nepaliYear.getYear() + 1);
        let endYear = nepaliYear.toJsDate().toISOString();
        console.log('end Year: ' + nepaliYear.format('DD MMMM YYYY'));
        nepaliYear.setYear(nepaliYear.getYear() - 1);

        props.setStartDate(startYear);
        props.setEndDate(endYear);
        props.setDisplayNepDate(nepaliYear.format('YYYY'));
    }

    return (
        <div>
            <Button id='btnBack' onClick={backDate}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                </svg>
            </Button>
            <Button id='btnForward' onClick={forwardDate}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                </svg>
            </Button>
            <div>
                <span id='report-date'>{props.displayNepDate}</span>
            </div>
        </div>
    );
}

export default BackForwBtns;
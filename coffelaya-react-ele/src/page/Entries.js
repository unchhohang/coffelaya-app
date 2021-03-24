import { useState, useEffect } from 'react'
import DatePicker from '../compo/entries/datePicker'
import axios from 'axios'
import EntrieBills from '../compo/entries/entrieBills'
import nepToEngDate from '../js functions/nepToEngDate'

const Entries = () => {
    const [date, setDate] = useState();
    const [billList, setBillList] = useState();

    useEffect(() => {
        let todayDate = new Date();
        let [startDate, endDate] = nepToEngDate(todayDate);

        getEntries(startDate, endDate);
    }, []);



    function selectDate(valueDate) {
        setDate(valueDate);

        let [startDate, endDate] = nepToEngDate(valueDate);
        getEntries(startDate, endDate);

    }

    function refreshEntries() {
        if (date == null) {
            let todayDate = new Date();
            let [startDate, endDate] = nepToEngDate(todayDate);
            getEntries(startDate, endDate);
        } else {
            let [startDate, endDate] = nepToEngDate(date);
            getEntries(startDate, endDate);

        }


    }



    function getEntries(startDate, endDate) {
        let url = '/entries/' + startDate + '/' + endDate;
        axios.get(url)
            .then(data => setBillList(data.data))
            .catch(err => { console.log(err) })
    }

    function deleteEntries(billId) {
        let url = '/api/billing/' + billId;
        axios.delete(url)
            .then(() => {
                refreshEntries();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='row'>
            <div className='col-sm-6'></div>
            <div className='col-sm-1'>Date:</div>
            <div className='col-sm-4'>
                <DatePicker
                    date={date}
                    selectDate={selectDate}
                />
            </div>
            <div>
                {
                    (billList != undefined)
                        ? <EntrieBills
                            billList={billList}
                            date={date}
                            deleteEntries={deleteEntries}
                            />
                        : <h1>No Entries to show</h1>
                }
            </div>
        </div>

    );

}

export default Entries;
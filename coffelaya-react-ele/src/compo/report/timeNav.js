import { useEffect } from 'react'

const TimeNav = (props) => {

    useEffect(
        () => {
            let dateType = props.dateType;
            console.log('date type inside timeNav: ');
            console.log(dateType);

            if (dateType != null) {
                document.getElementById(dateType).checked = true
            }
        }
    );

    function getDateType(dateType) {
        if (dateType == 'day') { props.setDateType('day') }
        else if (dateType == 'week') { props.setDateType('week') }
        else if (dateType == 'month') { props.setDateType('month') }
        else if (dateType == 'year') { props.setDateType('year') }
    }

    return (
        <div className='time-button-wrapper'>
            <input type='radio' className='timeButton' name='time' id='day'
                onClick={() => { getDateType('day') }}
            />
            <label htmlFor='day'>Day</label>
            <input type='radio' className='timeButton' name='time' id='week'
                onClick={() => { getDateType('week') }}
            />
            <label htmlFor='week'>Week</label>
            <input type='radio' className='timeButton' name='time' id='month'
                onClick={() => { getDateType('month') }}
            />
            <label htmlFor='month'>Month</label>
            <input type='radio' className='timeButton' name='time' id='year'
                onClick={() => { getDateType('year') }}
            />
            <label htmlFor='year'>Year</label>
        </div>
    );
}

export default TimeNav;
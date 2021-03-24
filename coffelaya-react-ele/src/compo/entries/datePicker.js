import React from "react"
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"

const DatePicker = (props) => {
 
    return (
        <form>
            {/* <label htmlFor="date">Date</label> */}
            <NepaliDatePicker inputClassName="form-control"
                              className=""
                              value={props.date}
                              onChange={(value) => props.selectDate(value)}
                              options={{ calenderLocale: "ne", valueLocale: "en" }} />
        </form>
    )
    

}

export default DatePicker;
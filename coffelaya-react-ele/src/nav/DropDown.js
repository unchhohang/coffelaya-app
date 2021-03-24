import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './DropDown.css';
import {
    Link
} from "react-router-dom";


const Nav = () => {

    const [value, setValue] = useState('Billing');

    //for event form select pair with eventKey
    const handleSelect = (page) => {
        setValue(page);

    }

    return (
        <div>
            {/* making drop down */}
            <div className='dropdown'>
                <button className='dropdown-btn'>
                    <span id='textValue'>{value}</span>
                </button>
                <div className='dropdown-content'>
                    <Link to='/' onClick={() => { handleSelect('Billing'); }}>Billing</Link>
                    <Link to='/credit' onClick={() => { handleSelect('Credit'); }}>Credit</Link>
                    <Link to='/entries' onClick={() => { handleSelect('Entries'); }}>Entries</Link>
                    <Link to='/report' onClick={() => { handleSelect('Report'); }}>Report</Link>
                    <Link to='/stocks' onClick={() => { handleSelect('Stocks'); }}>Stocks</Link>
                    <Link to='/menu' onClick={() => { handleSelect('menu'); }}>Menu</Link>
                </div>
            </div>



            <hr style={{
                height: '1px',
                background: '#FCFCFC',
                borderTopRadius: "4px",
                borderBottomRadius: "4px"


            }}></hr>
        </div>

    );

}

export default Nav;



import { Button } from 'react-bootstrap'
import './sideBordBill.css'
import axios from 'axios'
import { useState } from 'react';

const SideBordBill = (props) => {

    const [clickedList, setClickedList] = useState();
    let billData = props.billData;
    let tableNames;


    if (billData && billData.length > 0) {
        tableNames = billData.map((eleData) => {
            return (
                <li
                    className={(clickedList == eleData._id)? 'selected' : 'unselected'}
                    name={'tableList'}
                    key={eleData._id}
                    onClick={(e) => {
                        props.selectBill(eleData._id);
                        
                        setClickedList(eleData._id);
                        console.log('element data id : ' + eleData._id);
                        console.log("clicked list : " + clickedList);
                        
                    }}>
                    {eleData.tableName}

                </li>
            );

        });
    }

    function createNewBill() {
        let tableName = document.getElementById('tableName').value;

        if (!(String(tableName) === "")) {
            axios.post('/api/billing', {
                tableName: tableName,
                status: "onGoing"
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        props.onDataChange();
    }


    return (
        <div>
            <input type="text" id="tableName"></input>
            <Button
                id='btnAddTable'
                onClick={createNewBill}
            >Add Table</Button>

            <ul>{tableNames}</ul>
        </div>
    );
}

export default SideBordBill;
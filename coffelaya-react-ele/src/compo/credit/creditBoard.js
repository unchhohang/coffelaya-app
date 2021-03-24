import React, { useState, useEffect } from 'react'
import DebtorsList from './DebtorsList'
import axios from 'axios'

const CreditBoard = (props) => {

    const [debtorList, setDebtorList] = useState([]);



    useEffect(
        () => {
            getDebtorList();
        }
        , []);


    function getDebtorList() {
        axios.get('/credit/debtors')
            .then(res => setDebtorList(res.data))
            .catch(err => console.log(err))

    }

    if(props.refresh == "ON"){
        getDebtorList();
        props.refreshStateOff();

    }

    
    return (
        (debtorList.length == 0) ? <h1>loading...</h1>
            :
            <DebtorsList
                debtorList={debtorList}
                onDebtorClicked={props.onDebtorClicked}
            />

    );
}

export default CreditBoard;
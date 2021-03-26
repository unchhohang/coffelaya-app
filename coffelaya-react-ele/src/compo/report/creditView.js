import axios from 'axios';
import { useState, useEffect } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap';
import sumPrice from '../../js functions/sum';
import DebtorComp from './debtorComp';
import './creditView.css'

const CreditView = (props) => {
    const [debtorList, setDebtorList] = useState([]);
    const [unpaidAmount, setUnpaidAmount] = useState(0);
    const [allRemainingMoney, setAllremainingMoney] = useState(0);

    useEffect(
        () => {
            getDebtorList();
            getUnpaidAmount();
            getAllRemainingMoney();
        }, []
    );

    if (debtorList.length > 0) {
        console.log('debtor list is > 0');
        var displayDebtorName = debtorList.map((debtor, i) => {
            return (
                <DebtorComp
                    key={i}
                    debtorName={debtor}
                    eventKey={i}
                />
            )
        });
    }

    function getDebtorList() {
        axios.get('report/creditView/debtorNames')
            .then(data => setDebtorList(data.data))
            .catch(err => console.log(err))
    }

    function getUnpaidAmount() {
        axios.get('/credit/')
            .then(data => {
                let unpaidAmountList = data.data.map(ele => {
                    return (ele.creditAmount);
                });

                setUnpaidAmount(sumPrice(...unpaidAmountList));
            })
            .catch();
    }

    function getAllRemainingMoney() {
        axios.get('/credit/moneyGiven/all')
            .then(data => {
                let allMoneyGivenList = data.data.map(ele => {
                    return (ele.money);
                });
                setAllremainingMoney(sumPrice(...allMoneyGivenList));
            })
            .catch();
    }

    return (
        (debtorList.length != 0) ?
            <div>
                <div className={'total-container-credit'}>
                    <span id='total-creditAmount'>total credit to come :</span>
                    <span id='price-radius'>{unpaidAmount - allRemainingMoney}</span>
                </div>
                <Accordion>
                    {displayDebtorName}
                </Accordion>
            </div>


            :
            <h1>wait for debtor component</h1>
    );
}

export default CreditView;
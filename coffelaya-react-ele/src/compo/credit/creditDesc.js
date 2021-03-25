import { Button } from 'react-bootstrap'
import CreditBills from './creditBills'
import payCredit from '../../js functions/payCreditBill'
import { useEffect, useState } from 'react'
import './creditDesc.css'
import axios from 'axios'
import markBillsPaying from '../../js functions/markBillsPaying'

const CreditDesc = (props) => {
    const [given, setGiven] = useState(0);
    const [returnPrice, setReturnPrice] = useState();
    const [remainingMoney, setRemainingMoney] = useState(0);
    //paying bills to be highlighted
    const [highlightBills, setHighlightBills] = useState([]);

    useEffect(() => {
        getRemainingMoney(props.debtorName);
    }, [props.debtorName]);

    function getRemainingMoney(debtorName) {
        let url = '/credit/moneyGiven/debtor/' + debtorName;
        axios.get(url)
            .then(data => {
                let money;

                if (data.data != null) {
                    money = data.data.money;
                }

                if (money != null) {
                    console.log('credit description has been refreshed');
                    console.log(data.data.money);
                    setRemainingMoney(data.data.money);
                }
            })
            .catch();
    }

    function insertRemainingMoney(money) {
        let url = '/credit/moneyGiven/debtor/' + props.debtorName;
        axios.patch(url, { remaining: money })
            .then(setRemainingMoney(money))
            .catch(err => console.log(err));
    }

    function onPayClick() {
        let given = Number(document.getElementById('pay').value) + remainingMoney;



        if (given >= props.totalCredit) {
            insertRemainingMoney(0);
            payCredit(given, props.debtorBills)
        } else {
            insertRemainingMoney(payCredit(given, props.debtorBills));
        }

        // setRemainingMoney(payCredit(given, props.debtorBills));
        props.refreshCredit();
        props.setterDebtorName();

    }

    function priceChange() {
        let paidPrice = Number(document.getElementById('pay').value) + remainingMoney;
        setHighlightBills(markBillsPaying(paidPrice, props.debtorBills));
        setReturnPrice(paidPrice - props.totalCredit);
        setGiven(paidPrice);
    }

    return (
        <div>
            <div className={'debtor-detail'}>
                <span id='debtor-name'>Name: {props.debtorName}</span><br />
                <span id='total-credit-credit'>Credit Remain: {props.totalCredit - remainingMoney}</span>
                <span id='remaining-money'>Remaining money: {remainingMoney}</span>
            </div>
            <div>
                <input
                    type='number'
                    min={0}
                    id="pay"
                    onChange={() => { priceChange() }}
                />
                <Button
                    id='payBtn'
                    variant="primary"
                    onClick={() => {
                        if (document.getElementById('pay').value >= 0) { onPayClick() }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                    </svg>
                    &nbsp; Pays
                </Button><br />
                <div className={'price-detail'}>
                    {
                        (returnPrice > 0)
                            ? <span id='return-price'>Give return: {returnPrice} </span>
                            : <span> </span>
                    }
                    {
                        (given >= props.totalCredit)
                            ? <span id='full-pay'>  Fully paid  </span>
                            : <span id='unfull-pay'>  Not fulled paid</span>
                    }
                </div>

            </div>
            <div>
                <CreditBills
                    debtorBills={props.debtorBills}
                    highlightBills={highlightBills}
                />
            </div>
        </div>
    );
}

export default CreditDesc;
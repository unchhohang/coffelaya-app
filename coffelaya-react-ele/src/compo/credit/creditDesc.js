import { Button } from 'react-bootstrap'
import CreditBills from './creditBills'
import payCredit from '../../js functions/payCreditBill'
import { useState } from 'react'
import './creditDesc.css'

const CreditDesc = (props) => {
    const [given, setGiven] = useState(0);
    const [returnPrice, setReturnPrice] = useState();



    function onPayClick() {
        let given = document.getElementById('pay').value

        setReturnPrice(payCredit(given, props.debtorBills));
        props.refreshCredit();
        props.setterDebtorName();

    }

    function priceChange() {
        let paidPrice = document.getElementById('pay').value;
        setReturnPrice(paidPrice - props.totalCredit);
        setGiven(paidPrice);
    }

    return (
        <div>
            <div className={'debtor-detail'}>
                <span id='debtor-name'>Name: {props.debtorName}</span><br />
                <span id='total-credit-credit'>Credit Remain: {props.totalCredit}</span>
            </div>
            <div>
                <input
                    type='number'
                    id="pay"
                    onChange={()=>{priceChange()}}
                />
                <Button
                    id='payBtn'
                    variant="primary"
                    onClick={() => {
                        onPayClick();
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
                            : <span id='unfull-pay'>  Not fullied paid</span>
                    }
                </div>

            </div>
            <div>
                <CreditBills
                    debtorBills={props.debtorBills}
                />
            </div>
        </div>
    );
}

export default CreditDesc;
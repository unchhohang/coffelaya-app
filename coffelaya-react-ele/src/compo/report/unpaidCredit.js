import axios from "axios";
import { useEffect, useState } from "react";
import BillsView from "../credit/billsView";

const UnpaidCredit = (props) => {
    const [unpaidCreditList, setUnpaidCreditList] = useState([]);

    useEffect(
        () => {
            getunPaidCreditList(props.debtorName);
        }
    );

    if (unpaidCreditList.length > 0) {
        var dispalyUnpaid = unpaidCreditList.map((unpaidCredit, i) => {
            return (
                <BillsView
                    bill={unpaidCredit}
                />
            );
        });
    }

    function getunPaidCreditList(debtorName) {
        let url = '/report/creditView/unpaid/' + debtorName;

        axios.get(url)
            .then(data => setUnpaidCreditList(data.data))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1><b><u>Unpaid Bills</u></b></h1>
            {
                (unpaidCreditList.length > 0) ?
                    dispalyUnpaid
                    :
                    <h1>No unpaid bills</h1>
            }
        </div>
    );
}

export default UnpaidCredit;
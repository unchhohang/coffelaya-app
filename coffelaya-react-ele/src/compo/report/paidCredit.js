import axios from "axios";
import { useEffect, useState } from "react";
import BillsView from "../credit/billsView";

const PaidCredit = (props) => {
    const [paidBillList, setPaidBillList] = useState([]);

    useEffect(
        () => {
            getPaidBill(props.debtorName);
        }
    );

    if (paidBillList.length > 0) {
        var paidBillComp = paidBillList.map((paidBill, i) => {
            return (
                <BillsView
                    key={i}
                    bill={paidBill}
                />
            );
        });
    }

    function getPaidBill(debtorName) {
        let url = '/report/creditView/paid/' + debtorName;
        axios.get(url)
            .then(data => setPaidBillList(data.data))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1><b><u>Paid bills</u></b></h1>
            {(paidBillList.length > 0) ?
                paidBillComp
                :
                <h1>No paid bill</h1>}
        </div>
    );
}

export default PaidCredit;
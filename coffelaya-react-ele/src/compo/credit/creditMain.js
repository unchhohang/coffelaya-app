import { useState, useEffect } from 'react'
import axios from 'axios'
import CreditDesc from './creditDesc'
import sumPrice from '../../js functions/sum'

const CreditMain = (props) => {

    const [debtorDetail, setDebtorDetail] = useState([]);
    let debtorName = props.debtorName;
    let totalCredit;

    useEffect(() => {
        getDebtorDetail(debtorName)
    }, [debtorName]);

    function getDebtorDetail(name) {
        let url = '/credit/debtorByName/' + name
        axios.get(url)
            .then((data) => { setDebtorDetail(data.data) })
            .catch(err => console.log(err))

    }

    function setterDebtorName(){
        getDebtorDetail(debtorName);
    }



    let creditList = debtorDetail.map((ele) => {
        return (ele.creditAmount);
    });


    if (creditList.length == 1) {
        totalCredit = creditList[0];
    } else if (creditList.length > 1) {
        totalCredit = sumPrice(...creditList);
    }

    return (
        (debtorDetail.length == 0) ? <h1>Select Debtor</h1>
            :
            <>
                <CreditDesc
                    debtorName={debtorName}
                    totalCredit={totalCredit}
                    debtorBills={debtorDetail}
                    refreshCredit={props.refreshCredit}
                    setterDebtorName={setterDebtorName}
                />
            </>
    );
}

export default CreditMain;
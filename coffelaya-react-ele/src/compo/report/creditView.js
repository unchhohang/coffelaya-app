import axios from 'axios';
import { useState, useEffect } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap';
import DebtorComp from './debtorComp';

const CreditView = (props) => {
    const [debtorList, setDebtorList] = useState([]);

    useEffect(
        () => {
            getDebtorList();
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

    return (
        (debtorList.length != 0) ?
            <Accordion>
                {displayDebtorName}
            </Accordion>

            :
            <h1>wait for debtor component</h1>
    );
}

export default CreditView;
import { useState } from 'react';
import DebtorListEle from './DebtorListEle'
import './DebtorsList.css'

const DebtorsList = (props) => {
    let debtorList = props.debtorList;

    const [selected, setSelected] = useState();

    const debtorNameList = debtorList.map((ele, i) => {
        return (
            <DebtorListEle
                key={i}
                onDebtorClicked={props.onDebtorClicked}
                debtorName={ele} 
                selected={selected}
                setSelected={setSelected}
                />
        );
    });



    return (
        <>
            <div className={'debtorList'}>
                <h5 style={{textDecoration: "underline"}}>
                    <ul>Debtors List</ul>
                </h5>
            <ul>{debtorNameList}</ul>
        </div>
        </>
    );
}

export default DebtorsList;
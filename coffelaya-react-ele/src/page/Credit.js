import CreditMain from '../compo/credit/creditMain'

const Credit = (props) => {


    return (
        (props.debtorName == "") ?
            <h1>Select Debtor</h1>
            :
            <CreditMain
            debtorName={props.debtorName}
            refreshCredit={props.refreshCredit}

            />
    );
}

export default Credit;
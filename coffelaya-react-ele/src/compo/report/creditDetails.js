import BillsView from "../credit/billsView";
import PaidCredit from "./paidCredit";
import UnpaidCredit from "./unpaidCredit";
import './creditDetails.css'

const CreditDetails = (props) => {

    return (
        <>

            <div id='paid-credit'>
                <PaidCredit
                    debtorName={props.debtorName}
                />
            </div>
            <div id='unpaid-credit'>
                <UnpaidCredit
                    debtorName={props.debtorName}
                />
            </div>
        </>

    );
}

export default CreditDetails;
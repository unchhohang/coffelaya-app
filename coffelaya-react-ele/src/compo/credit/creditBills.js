import BillsView from './billsView'
import './creditBills.css'

const CreditBills = (props) => {
    let billList = props.debtorBills;

    let bills = billList.map((bill, i) => {
        return (
            <BillsView key={bill._id}
                bill={bill}
            />
        );
    });
    return (
        <div className={'credit-bills'}>
            {bills}
        </div>
    );
}

export default CreditBills;
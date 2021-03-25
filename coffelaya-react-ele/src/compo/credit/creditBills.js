import BillsView from './billsView'
import './creditBills.css'

const CreditBills = (props) => {
    let billList = props.debtorBills;

    let bills = billList.map((bill, i) => {
        let hState;
        if(props.highlightBills.includes(bill._id)){
            hState = 'highlightIt';
        }else{
            hState = 'nope'
        }
        return (
            <BillsView key={bill._id}
                bill={bill}
                highlightState={hState}
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
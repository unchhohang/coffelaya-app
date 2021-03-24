
import './DebtorsList.css'

const DebtorListEle = (props) => {

    return (
        <li
            id='debtorName'
            className={(props.selected == props.debtorName) ? 'selected' : 'unselected'}
            onClick={() => {
                props.onDebtorClicked(props.debtorName);
                props.setSelected(props.debtorName);
            }
            }
        >
            
                {props.debtorName}
        </li>
    );
}

export default DebtorListEle;
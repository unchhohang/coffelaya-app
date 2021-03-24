import { table } from 'react-bootstrap'
import './viewTable.css'

const Viewtable = (props) => {
    let orderList = props.orderList;
    let tBody = orderList.map((item, i) => {
        return (
            <tbody key={i}>
                <tr>
                    <td>{i+1}</td>
                    <td>{item.item}</td>
                    <td>{item.rate}</td>
                    <td>{item.quantity}</td>
                    <td>{item.rate * item.quantity}</td>
                </tr>
            </tbody>
        );
    });
    return (
        <div>
            <table className="table table-borderless">
                <thead>
                    <tr className={'tr-header'}>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {tBody}


            </table>
        </div>
    );
}

export default Viewtable;
import ViewTable from './viewTable'
import NepaliDate from 'nepali-date-converter'
import './billsView.css'


const BillsView = (props) => {
    let bill = props.bill

    let date = bill.date;
    let dateObj = new Date(date);
    let nepaliDate = new NepaliDate(dateObj).format('ddd, DD MMMM YYYY');
    let hours = dateObj.getHours();
    let minute = dateObj.getMinutes();
    let second = dateObj.getSeconds();
    let nepaliTime = hours + ":" + minute + ":" + second;

    let billId = bill._id;
    let debtorName = bill.debtorName;
    let tableName = bill.tableName;
    let totalPrice = bill.totalPrice;
    let creditAmount = bill.creditAmount;
    let discount = bill.discount;
    let paid = bill.paidPrice;
    let status = bill.status;



    return (
        <div className={'bill-view'}>
            <div className={'detail-board'}>
                <dl className="row">
                    <dt className="col-sm-3 key">Date:</dt>
                    <dd className="col-sm-3 value">
                        {nepaliDate} <br></br>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                        {nepaliTime}
                    </dd>

                    <dt className="col-sm-3 key">Bill Id:</dt>
                    <dd className="col-sm-3 value">{billId}</dd>

                    <dt className="col-sm-3 key">Name:</dt>
                    <dd className="col-sm-9 value">{debtorName}</dd>

                    <dt className="col-sm-3 key">Table:</dt>
                    <dd className="col-sm-9 value">{tableName}</dd>

                    <dt className="col-sm-3 key">Total Price:</dt>
                    <dd className="col-sm-3 value" id='total-price'>{totalPrice}</dd>

                    <dt className="col-sm-3 key" >Credit:</dt>
                    <dd className="col-sm-3 value" id='credit-amount'>{creditAmount}</dd>

                    <dt className="col-sm-3 key">Discount:</dt>
                    <dd className="col-sm-3 value" id='disount'>{discount}</dd>

                    <dt className="col-sm-3 key">Status:</dt>
                    <dd className="col-sm-3 value" id='status'>{status}</dd>

                    <dt className="col-sm-3 key">Paid:</dt>
                    <dd className="col-sm-9 value" id='paid'>{paid}</dd>
                </dl>
            </div>
            <ViewTable orderList={props.bill.orderList} />
        </div>
    );
}

export default BillsView;

const billInfoCredit = (props) => {
    return (
        < div id='credit' >
            <span>
                <b>Total: <span>{props.totalPrice}</span></b>
            </span><br />
            <span><b>Discount: <span>{props.discountPrice}</span></b></span><br />
            <span><b>Credit: <span>{props.creditPrice}</span></b></span>
            <hr />
            <span><b>Paid: </b><span>{props.paidPrice}</span></span>
        </div >
    );

}

export default billInfoCredit
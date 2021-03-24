const billInfo = (props) => {
    return (
        <div id='non-credit'>
            <span>
                <b>Total: <span>{props.totalPrice}</span></b>
            </span><br />
            <span><b>Discount: <span>{props.discountPrice}</span></b></span>
            <hr />
            <span><b>Amount:</b>  {props.amountPrice}</span>
        </div>
    );
}

export default billInfo;
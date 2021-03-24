import { Col, Row } from "react-bootstrap"
import './BillDetail.css'
import BillInfo from './BillInfo'
import BillInfoCredit from './BillInfoCredit'
import './SliderCss.css'

const BillDetail = (props) => {

    function onDiscountChange() {
        let discount = document.getElementById('discountInp').value;
        let discountType = document.getElementById('disType').value;
        props.getDiscount(discount, discountType);
    }

    function onCreditChange() {
        let creditPaidPrice = document.getElementById('creditInp').value;
        let creditName = document.getElementById('creditNameInp').value;


        props.getCredit(creditPaidPrice, creditName);
    }

    function onChangeCheckbox() {
        let checkSwitch = document.getElementById('creditMode');
        if (checkSwitch.checked) {
            document.getElementById('creditInp').removeAttribute("disabled")
            document.getElementById('billInfo').style.display = "none";
            document.getElementById('billInfoCredit').style.display = "";
            document.getElementById('creditNameInp').removeAttribute("disabled");

        } else {
            props.resetCredit();
            document.getElementById('creditInp').value = "";
            document.getElementById('creditNameInp').value = "";
            document.getElementById('creditInp').setAttribute("disabled", "");
            document.getElementById('billInfo').style.display = "";
            document.getElementById('billInfoCredit').style.display = "none";
            document.getElementById('creditNameInp').setAttribute("disabled", "");


        }
    }

    return (
        <div id='billDetail'>
            <Row>
                <Col>
                    <div id='DandC'>
                        <div id='discount'>
                            <label htmlFor='discount'><strong><b>Discount:</b></strong></label><br />
                            <input
                                type='number'
                                id='discountInp'
                                min='0' max='100'
                                onChange={onDiscountChange}
                            />
                            <select
                                id='disType'
                                onChange={onDiscountChange}
                                >
                                <option value='digit' >Digit</option>
                                <option value='%' defaultValue>%</option>

                            </select>
                        </div>
                        <div id='credit'>
                            <label htmlFor='credit'><strong><b> Credit Paid Amount:</b></strong></label><br />
                            <input
                                type='number'
                                id='creditInp'
                                disabled
                                onChange={onCreditChange}

                            />
                            <label className='switch'>
                                <input
                                    type='checkbox'
                                    id='creditMode'
                                    onChange={onChangeCheckbox}
                                >
                                </input>
                                <span className='slider round'></span>
                            </label>
                            <div id='creditName'>
                                <label htmlFor='creditName'><strong><b> Creditor Name:</b></strong></label><br />
                                <input
                                    type='text'
                                    id='creditNameInp'
                                    disabled
                                    onChange={onCreditChange}

                                />
                            </div>

                        </div>

                    </div>


                </Col>
                <Col>
                    <div
                        id='billInfo'
                    >
                        <BillInfo
                            totalPrice={props.totalPrice}
                            discountPrice={props.discountPrice}
                            amountPrice={props.amountPrice}
                        />
                    </div>
                    <div
                        id='billInfoCredit'
                        style={{ display: "none" }}
                    >
                        <BillInfoCredit
                            totalPrice={props.totalPrice}
                            discountPrice={props.discountPrice}
                            creditPrice={props.creditPrice}
                            amountPrice={props.amountPrice}
                            paidPrice={props.paidPrice}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default BillDetail;
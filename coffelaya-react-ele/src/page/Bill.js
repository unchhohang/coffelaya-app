import React, { useState, useEffect } from 'react';
import BillTable from '../compo/bill/BillTable';
import BillDetail from '../compo/bill/BillDetail'
import DoneButton from '../compo/bill/DoneButton'
import axios from 'axios';
import { Button } from 'react-bootstrap'


const Billing = (props) => {

    //state for orders
    const [bill, setBill] = useState();
    const [items, setItems] = useState([]);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [creditPrice, setCreditPrice] = useState(0);
    const [creditName, setCreditName] = useState("");
    const [debtorList, setDebtorList] = useState([]);

    let itemsTotals
    let totalPrice = 0;


    useEffect(
        () => {
            let url = '/api/billing/' + props.billId;
            axios.get(url)
                .then(
                    (res) => {
                        setBill(res.data);
                        setItems(res.data.orderList);
                    }
                )
                .catch(err => console.log(err))

            getAllDebtor();

        }, [props.billId]
    );


    if (items != undefined) {
        itemsTotals = items.map((item) => {
            return (item.rate * item.quantity);
        });

        if (Number(items.length) === 1) {
            totalPrice = itemsTotals[0];
        } else if (items.length > 1) {
            totalPrice = sumPrice(...itemsTotals);
        }
    }

    let amountPrice = totalPrice - discountPrice;
    let paidPrice = amountPrice - creditPrice;

    function getBill() {
        let url = '/api/billing/' + props.billId;
        axios.get(url)
            .then(
                (res) => {
                    setBill(res.data);
                    setItems(res.data.orderList);
                }
            )
            .catch(err => console.log(err))

        console.log('getBill ran');


    }

    function getAllDebtor() {
        axios.get('/api/debtors')
            .then(data => setDebtorList(data.data))
            .catch(err => console.log(err))
    }

    //Input data from bill table
    function handleRowInput(inputItem) {
        let url = '/api/billing/orderList/' + props.billId
        axios.patch(url, {
            item: inputItem.item,
            rate: inputItem.rate,
            quantity: inputItem.qty,
            itemTotal: inputItem.total
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        getBill();

    }
    function handleDeleteRow(itemId) {
        let url = 'api/billing/orderList/' + props.billId +
            '/' + itemId;
        axios.delete(url);
        getBill();
    }

    function handleUpdateItemName(orderId, itemName) {
        let url = 'api/billing/orderList/itemName/' + orderId;

        axios.patch(url,
            {
                "item": itemName
            }
        );

        getBill();
    }

    function handleUpdateRate(orderId, rate) {
        let url = 'api/billing/orderList/rate/' + orderId;

        axios.patch(url, {
            "rate": rate
        })

        getBill();
    }

    function handleUpdateQuantity(orderId, quantity) {
        let url = 'api/billing/orderList/quantity/' + orderId;

        axios.patch(url, {
            "quantity": quantity,
        })

        getBill();
    }

    function handleDiscountInput(inpDiscount, inpDiscountType) {
        if (inpDiscount == '') {
            inpDiscount = 0;
        }

        if (inpDiscountType == 'digit') {
            setDiscountPrice(inpDiscount);
        } else if (inpDiscountType == '%') {
            let discountPrice = Math.round(totalPrice * (inpDiscount / 100));
            setDiscountPrice(discountPrice)
        }



    }

    function handleCreditInput(inpCreditPaidPrice, inpCreditName) {
        let credit = Math.abs(amountPrice - inpCreditPaidPrice);

        setCreditPrice(credit);
        setCreditName(inpCreditName.toUpperCase());
    }

    function resetCredit() {
        setCreditPrice(0);
        setCreditName("");
    }

    //credit price only reset after new input
    function resetCreditPrice() {
        setCreditPrice(0);
        document.getElementById('creditInp').value = "";

    }

    function sumPrice(...args) {
        return args.reduce((prev, curr) => {
            return prev + curr;
        });
    }

    function cancelTableBill(billId) {
        console.log('cancelTabelBIll exec');

        let url = '/api/billing/' + billId;
        axios.delete(url);

        props.refreshBills();
    }


    function actionDone() {

        console.log('discount price is :' + discountPrice);

        if (creditName == "" && creditPrice == 0 && items.length > 0 && paidPrice >= 0) {
            let url = '/api/billing/noncredit/' + bill._id;

            axios.patch(url,
                {
                    discount: discountPrice,
                    totalPrice: totalPrice,
                    paidPrice: amountPrice,
                    status: "paid"
                }
            );
            props.refreshBills();

        } else if (creditName != "" && creditPrice > 0 && items.length > 0 && paidPrice >= 0) {

            
                let url = '/api/billing/credit/' + bill._id;
                axios.patch(url,
                    {
                        discount: discountPrice,
                        debtorName: creditName,
                        creditAmount: creditPrice,
                        paidPrice: paidPrice,
                        totalPrice: totalPrice,
                        status: "onCredit"
                    }
                );

                props.refreshBills();
            
        }


    }

    //css for cancel button
    const styleCancel ={
        backgroundColor:"#FD5E7B",
        margin: "5px",
        borderTopLeftRadius: "500px",
        borderBottomLeftRadius: "500px"
    }

    if (items != undefined) {
        return (
            <>
                <Button
                    variant=""
                    size="sm"
                    onClick={() => {
                        cancelTableBill(bill._id);
                    }}
                    style={styleCancel}
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-x" viewBox="0 0 16 16">
                            <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                        </svg>
                    </span>
                    <span style={{fontWeight: 'bold'}}>  Cancel</span>
                </Button>
                <BillTable
                    onDataChange={getBill}
                    orderList={items}
                    addRowInput={handleRowInput}
                    deleteRow={handleDeleteRow}
                    updateItemName={handleUpdateItemName}
                    updateRate={handleUpdateRate}
                    updateQuantity={handleUpdateQuantity}
                    resetCreditPrice={resetCreditPrice}
                />
                <BillDetail
                    totalPrice={totalPrice}
                    getDiscount={handleDiscountInput}
                    getCredit={handleCreditInput}
                    discountPrice={discountPrice}
                    creditPrice={creditPrice}
                    amountPrice={amountPrice}
                    paidPrice={paidPrice}
                    resetCredit={resetCredit}
                />
                <DoneButton
                    actionDone={actionDone}
                />

            </>

        );
    } else {
    return (<h1>Loading...</h1>);
}



}

export default Billing;
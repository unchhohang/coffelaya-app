import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import './OrderItem.css'

const OrderItem = (props) => {


    const [quantity, setQuantity] = useState(0);
    const [orderItemId, setOrderItemId] = useState();
    let bill = props.bill;
    let menuItem = props.menuItem;
    let itemsInOrderList = props.itemsInOrderList;

    console.log('orderItem ' + menuItem.item + 'id: ' + orderItemId);


    useEffect(() => {
        getItemsInOrderListIdAndQty();
    });

    function getItemsInOrderListIdAndQty() {

        if (itemsInOrderList.includes(menuItem.item)) {
            let indexOfOrderItem;
            itemsInOrderList.forEach((element, i) => {
                if (element == menuItem.item) {
                    indexOfOrderItem = i;
                    return;
                }
            });

            let orderItemId = bill.orderList[indexOfOrderItem]._id;
            let qty = bill.orderList[indexOfOrderItem].quantity;

            if (qty == 0) {
                deleteZeroQty(bill._id, orderItemId);
                setQuantity(0);
            } else {
                setQuantity(qty);
                setOrderItemId(orderItemId);

            }
        }
    }

    function deleteZeroQty(billId, orderListId) {
        let url = '/api/billing/orderList/' + billId + '/' + orderListId;
        axios.delete(url)
            .then(data => {
                props.getBill();
            })
            .catch(err => console.log(err))
    }

    function addOrder(billId, itemName) {

        let givenQty = quantity + 1;
        if (itemsInOrderList.includes(itemName)) {
            oldOrder(orderItemId, givenQty)
        } else {
            newOrder(billId, givenQty);
        }
    }

    function subtractOrder(billId, orderItemId, itemName) {
        let givenQty = quantity - 1;

        if (givenQty < 0) {
            return;
        }

        if (givenQty == 0) {

            console.log('when going to 0');

            setQuantity(givenQty);
            let url = 'api/billing/orderList/quantity/' + orderItemId;

            axios.patch(url, {
                "quantity": givenQty
            })
                .then(data => {
                    setQuantity(givenQty);
                    props.getBill();
                })
                .catch(err => console.log(err));

        } else {
            let url = 'api/billing/orderList/quantity/' + orderItemId;

            axios.patch(url, {
                "quantity": givenQty
            })
                .then(data => {
                    setQuantity(givenQty);
                    props.getBill();
                })
                .catch(err => console.log(err));
        }


    }

    function newOrder(billId, givenQty) {

        let url = '/api/billing/orderList/' + billId;
        //if new order in list 
        axios.patch(url, {
            "item": menuItem.item,
            "rate": menuItem.price,
            "quantity": givenQty
        })
            .then(data => {
                setQuantity(givenQty);
                console.log(data);
                props.getBill();
            })
            .catch(err => console.log(err))
    }

    function oldOrder(orderItemId, givenQty) {

        let url = 'api/billing/orderList/quantity/' + orderItemId;

        axios.patch(url, {
            "quantity": givenQty
        })
            .then(data => {
                setQuantity(givenQty);
                props.getBill();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={'order-details'}>
            <Row>
                <Col className={'order-name-price'}>
                    <div id='order-name'>{menuItem.item}</div>
                    <div id='order-price'>{menuItem.price}</div>
                </Col>
                <Col className={'order-quantity'}>{quantity}</Col>
                <Col className={'order-btn'}>
                    <div>
                        <span id='plus-btn'>
                            <ButtonGroup aria-label="Basic example">
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        addOrder(bill._id, menuItem.item);
                                    }}
                                >
                                    +
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => { subtractOrder(bill._id, orderItemId, menuItem.item) }}
                                >
                                    -
                                </Button>
                            </ButtonGroup>
                        </span>

                    </div>
                </Col>

            </Row>
        </div>
    );

}

export default OrderItem;
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './BillTable.css';
import { ItemClass } from '../../class/ItemClass';
import React, { useEffect, useRef, useState } from 'react';
import RowItemEle from '../bill/RowItemEle'
import { Hint } from 'react-autocomplete-hint'
import axios from 'axios';





const BillTable = (props) => {
    const editedItem = useRef('');
    const editedRate = useRef('');
    const editedQuantity = useRef('');
    const [menu, setMenu] = useState([]);

    let menuList = {};

    useEffect(() => {
        getMenu();

    }, []);


    //push menu
    if (menu.length > 0) {
        menu.map((ele) => {
            menuList[ele.item] = ele.price;
        });
        console.log('inside loop menu list');
    }



    console.log('billTable renderd');

    //get menu
    function getMenu() {
        axios.get('/api/menu')
            .then(data => {
                setMenu(data.data);
            })
            .catch(err => console.log(err))
    }

    //match autocomplete item with price
    function matchItem(item) {
        console.log('matched');
        console.log(Object.keys(menuList));

        if (item in menuList) {
            document.getElementById('rate').value = menuList[item];
        }
    }


    function inputRow(item) {
        props.addRowInput(item);
        props.resetCreditPrice();

    }

    function deleteRow(itemId) {
        props.deleteRow(itemId);
        props.resetCreditPrice();
    }

    function updateRowItem(e) {
        editedItem.current = e.target.value;
    }

    function updateRowRate(e) {
        editedRate.current = e.target.value;

    }
    function updateRowQuantity(e) {
        editedQuantity.current = e.target.value;
    }

    function onFocusRate(rateInp) {

        editedRate.current = rateInp;

    }

    function onFocusQuantity(qtyInp) {
        editedQuantity.current = qtyInp;
    }

    function onBlurItem(orderId) {
        props.updateItemName(orderId, editedItem.current);
    }

    function onBlurRate(orderId, quantity) {

        if (Number(editedRate.current) == 0) {
            props.updateRate(orderId, Number(editedRate.current))

        } else if (Number(editedRate.current)) {
            props.updateRate(orderId, Number(editedRate.current))
        }

    }

    function onBlurQuantity(orderId, rate) {

        if (Number(editedQuantity.current) == 0) {
            props.updateQuantity(orderId, Number(editedQuantity.current))

        } else if (Number(editedQuantity.current)) {
            props.updateQuantity(orderId, Number(editedQuantity.current))
        }
    }

    function scrollDown() {
        //table scroll bottom
        let divScroll = document.getElementById('table-container');
        let heightScroll = document.getElementById('tbody').scrollHeight;
        let scrollOptions = {
            left: 0,
            top: heightScroll
        }

        divScroll.scrollTo(scrollOptions);
    }


    let displayRows = props.orderList.map((item, index) => {

        return (
            <RowItemEle
                key={index}
                item={item}
                index={index}
                onFocusRate={onFocusRate}
                onFocusQuantity={onFocusQuantity}
                updateRowItem={updateRowItem}
                updateRowRate={updateRowRate}
                updateRowQuantity={updateRowQuantity}
                onBlurItem={onBlurItem}
                onBlurRate={onBlurRate}
                onBlurQuantity={onBlurQuantity}
                deleteRow={deleteRow}
            />
        )
    }
    )


    return (
        <>
            <div id='table-container'>
                <Table id='table' hover >
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Item</th>
                            <th>Rate</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* tbody */}
                    <tbody id='tbody'>
                        {displayRows}
                    </tbody>

                </Table >
            </div >
            <div>
                <Table>
                    <tbody>
                        <tr key='inputfields'>
                            <td></td>
                            <td>
                                <Hint
                                    options={Object.keys(menuList)}
                                    allowTabFill
                                >
                                    <input
                                        type='text'
                                        className='itemInput'
                                        id='item'
                                        placeholder='Item'
                                        onChange={() => {
                                            matchItem(document.getElementById('item').value)
                                        }
                                        }
                                    />
                                </Hint>
                            </td>
                            <td><input type='number' className='itemInput' id='rate' placeholder='Rate' /></td>
                            <td><input type='number' className='itemInput' id='qty' placeholder='Quantity' /></td>
                            <td></td>
                            <td>
                                {/* button to add row data */}
                                <Button
                                    size='sm'
                                    onClick={
                                        () => {

                                            let item = new ItemClass(
                                                document.getElementById('item').value,
                                                document.getElementById('rate').value,
                                                document.getElementById('qty').value
                                            );


                                            if ((item.item != "") &&
                                                (item.rate != "") &&
                                                (item.qty != "")) {
                                                inputRow(item);
                                                scrollDown();
                                            }

                                        }
                                    }>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                    </span>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default BillTable;
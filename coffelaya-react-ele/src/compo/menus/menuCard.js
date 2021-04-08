import axios from 'axios';
import { Button } from 'react-bootstrap';
import AddTitleBtn from './AddTitleBtn';
import './menuCard.css'

const MenuCard = (props) => {
    let mCard = props.mCard;
    let itemNameInp = 'menu-item' + mCard._id;
    let itemPriceInp = 'menu-price' + mCard._id
    let tableId;

    if (!props.isLast) {
        tableId = 'menuCard-table'
    } else {
        tableId = 'menuCard-table-last'
    }


    let itemList = mCard.items.map((item, i) => {
        return (
            <tr key={i}>
                <td>{item.item}</td>
                <td>{item.price}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => { handleRemoveItem(mCard._id, item._id) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                </td>
            </tr>
        );
    });

    function handleBtnRemoveCard(menuId) {
        console.log('remove card click');

        let url = '/api/menu/' + menuId;

        axios.delete(url)
            .then(data => {
                console.log(data);
                props.getMenu();
            }
            )
            .catch(err => console.log(err))
    }

    function handleInsertItems(menuId) {
        let itemName = document.getElementById(itemNameInp).value.toLowerCase();
        let itemPrice = document.getElementById(itemPriceInp).value;

        if (itemName == '' || itemPrice == '' || itemPrice < 0) {
            return;
        }

        axios.post('/api/menu/items', {
            'menuId': mCard._id,
            'item': itemName,
            'price': itemPrice
        })
            .then(data => {
                console.log(data);
                props.getMenu();
            }
            )
            .catch(err => console.log(err))
    }

    function handleRemoveItem(menuId, itemId) {
        let url = '/api/menu/items/' + menuId + '/' + itemId;

        axios.delete(url)
            .then(data => {
                console.log(data);
                props.getMenu();
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={'menu-card'}>
                <div id={props.isLast.toString()}>
                    <div>
                        <span id='mCard-title'>Title: {mCard.title}</span>
                        <Button
                            id='cross-mCard'
                            variant="danger"
                            onClick={() => { handleBtnRemoveCard(mCard._id) }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </Button>

                    </div>
                    <table className="table" id={tableId}>
                        <thead>
                            <tr id='table-header'>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList}

                            {/* input fields for menu item */}
                            <tr>
                                <td>
                                    <input type='text' className='menu-item' id={itemNameInp}></input>
                                </td>
                                <td>
                                    <input type='text' className='menu-price' id={itemPriceInp}></input>
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => { handleInsertItems() }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


            </div>
            {/* this is for last add button dynamic things 
                    diplay on if it is last card
                */}
            {
                props.isLast ?
                    <div
                        className={'add-title-btn'}

                        style={{
                            backgroundColor: "#FFF3F0"
                        }}
                    >
                        <AddTitleBtn
                            insertMenuTitle={props.insertMenuTitle}
                        />
                    </div>

                    :
                    <div></div>
            }


        </>


    );
}

export default MenuCard;
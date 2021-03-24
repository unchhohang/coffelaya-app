import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import axios from 'axios'
import './Menu.css'

const Menu = (props) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        getMenu();
    }, []);

    function getMenu() {
        axios.get('/api/menu')
            .then(data => {
                setMenu(data.data);
                console.log('got data:');
                console.log(data.data);

            })
            .catch(err => console.log(err))
    }

    function insertMenu(item, price) {
        let url = '/api/menu'
        axios.post(url, {
            "item": item,
            "price": price
        })
            .then(data => { console.log(data) })
            .catch(err => console.log(err))
    }

    function deleteMenu(id) {
        let url = '/api/menu/' + id;

        axios.delete(url)
            .then(getMenu())
            .catch(err => console.log(err))
    }

    let displayTbody = menu.map((ele, i) => {
        return (
            <tr key={i}>
                <td className='text'>{i + 1}</td>
                <td className='text'>{ele.item}</td>
                <td className='text'>{ele.price}</td>
                <td className='text'>
                    <Button
                        variant='danger'
                        className={'btn-sm'}
                        onClick={() => {
                            deleteMenu(ele._id);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <div className={'menu-view'}>
            <div className={'buffer-div'}></div>
            <div className={'table-container'}>
                <Table striped bordered hover
                >
                    <thead>
                        <tr>
                            <th className='text'>S.N</th>
                            <th className='text'>Item</th>
                            <th className='text'>Price</th>
                            <th className='text'>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTbody}

                    </tbody>


                </Table>
            </div>
            <div className={'input'}>
                <div>
                    <label id='menu-item'>Item:</label>
                    <input type='string' id='inpItem'></input>
                </div>
                <div>
                    <label id='menu-price'>Price:</label>
                    <input type='number' id='inpPrice'></input>
                </div>
                <Button
                    variant='primary'
                    onClick={() => {
                        let item = document.getElementById('inpItem').value;
                        let price = document.getElementById('inpPrice').value;

                        if (item != '' && price != '') {
                            insertMenu(item, price);
                            getMenu();
                        } else {
                            console.log('fill all the input');
                        }

                    }}
                >
                    OK
            </Button>
            </div>
        </div>
    )
}

export default Menu;
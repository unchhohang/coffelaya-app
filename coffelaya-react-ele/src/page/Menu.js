import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import axios from 'axios'
import './Menu.css'
import MenuCard from "../compo/menus/menuCard"
import AddTitleBtn from "../compo/menus/AddTitleBtn"

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

    function insertMenuTitle(title) {
        let url = '/api/menu'

        if (title == '') {
            return;
        }

        axios.post(url, {
            'title': title
        })
            .then(
                (data) => {
                    getMenu();

                }
            )
            .catch(err => console.log(err))
    }



    //if empty title show
    if (menu.length != 0) {

        let menuCardList = menu.map((mCard, i) => {
            return (
                <div
                    key={i}
                >
                    <MenuCard
                        insertMenuTitle={insertMenuTitle}
                        mCard={mCard}
                        isLast={i == menu.length - 1}
                        getMenu={getMenu}
                    />
                </div>
            );
        });

        return (
            <div className={'menu-view'}>
                <div className={'menu-flex'}>
                    {menuCardList}
                </div>
            </div>
        )
    } else {
        return (
            <div className={'menu-view'} >
                <h1>Please add titles</h1>

                <AddTitleBtn
                    insertMenuTitle={insertMenuTitle}
                />
            </div >
        );

    }
}

export default Menu;
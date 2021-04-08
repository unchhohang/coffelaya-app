import axios from 'axios';
import { useEffect, useState } from 'react';
import './BillingSlider.css'
import OrderCard from './OrderCard'

const BillingSlider = (props) => {
    const [menu, setMenu] = useState([]);

    let orderCardList
    let orderList = props.bill.orderList;
    let itemsInOrderList = orderList.map((item, i)=>{
        return(
            item.item
        );
    });

    useEffect(() => {
        getAllMenu();
    }, []);

    function getAllMenu() {
        axios.get('/api/menu')
            .then(data => {
                setMenu(data.data);
                
            })
            .catch()
    }

    if (menu.length > 0) {
        orderCardList = menu.map((menuGroup, i) => {
            return (
                <OrderCard
                    key={i}
                    menuGroup={menuGroup}
                    getBill={props.getBill}
                    bill={props.bill}
                    itemsInOrderList={itemsInOrderList}
                />
            );
        });
    }

    if (menu.length > 0) {
        return (
            <div className={'billing-slider'}>
                {orderCardList}
            </div>
        );
    } else {
        return (
            <h1>loading...</h1>
        );
    }


}

export default BillingSlider;
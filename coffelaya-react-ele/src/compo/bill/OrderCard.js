import OrderItem from "./OrderItem";
import './OrderCard.css'

const OrderCard = (props) => {
    let menuGroup = props.menuGroup;
    let bill = props.bill;

    if (menuGroup.items.length > 0) {
        let orderItemList = menuGroup.items.map((item, i) => {
            return (
                <OrderItem
                    key={i}
                    menuItem={item}
                    getBill={props.getBill}
                    bill={bill}
                    itemsInOrderList={props.itemsInOrderList}
                />
            );
        });

        return (
            <div className={'order-card'}>
                <div>
                    <span id='title'><h5>{menuGroup.title}</h5></span>
                    {orderItemList}
                </div>
            </div>

        );
    }
    else {
        return (<div></div>);
    }
}

export default OrderCard;
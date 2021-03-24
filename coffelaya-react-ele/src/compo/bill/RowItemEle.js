import ContentEditable from 'react-contenteditable';
import { Button } from 'react-bootstrap';


const RowItemEle = (props) => {
    let itemId = props.item._id;
    let itemName = props.item.item;
    let itemRate = props.item.rate;
    let itemQty = props.item.quantity;
    let itemTotal = itemRate * itemQty;
    let index = props.index;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <ContentEditable
                    html={itemName}
                    contentEditable disabled={false}
                    onChange={props.updateRowItem}
                    onBlur={() => {
                        props.onBlurItem(itemId)
                    }}
                />
            </td>
            <td>
                <ContentEditable
                    html={itemRate.toString()}
                    contentEditable disabled={false}
                    onChange={props.updateRowRate}
                    onFocus={() => {
                        props.onFocusRate(itemRate)
                    }}
                    onBlur={() => {
                        props.onBlurRate(itemId, itemQty)
                    }}
                />

            </td>
            <td>
                <ContentEditable
                    html={itemQty.toString()}
                    contentEditable disabled={false}
                    onChange={props.updateRowQuantity}
                    onFocus={() => {
                        props.onFocusQuantity(itemQty);
                    }}
                    onBlur={() => {
                        props.onBlurQuantity(itemId, itemRate)
                    }}
                />
            </td>
            <td>{itemTotal}</td>
            <td>
                <Button
                    variant="danger"
                    size='sm'
                    onClick={() => props.deleteRow(itemId)}
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </span>
                </Button>

            </td>
        </tr>

    );
}

export default RowItemEle;
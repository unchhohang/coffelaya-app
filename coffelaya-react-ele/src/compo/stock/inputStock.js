import { Button } from 'react-bootstrap'
import nepToEngDate from '../../js functions/nepToEngDate'
import axios from 'axios'
//following css is at Stocks.css


const InputStock = (props) => {
    let date = props.date;

    function insertStock(stock, cost, date) {
        axios.post('/stock', {
            "stock": stock,
            "cost": cost,
            "date": date
        })
            .then(() => {
                props.refreshStock(date)
            })
            .catch(err => console.log(err))

    }

    function onInsertStock() {
        let stock = document.getElementById('stock').value;
        let cost = document.getElementById('cost').value;

        if (stock != "" && cost != "") {
            if (date == undefined) {
                let todayDate = new Date;
                let [searchDate, tommorowDate] = nepToEngDate(todayDate);

                insertStock(stock, cost, searchDate);

            } else {
                let [searchDate, tommorowDate] = nepToEngDate(date);

                insertStock(stock, cost, searchDate);
            }
        }else{
            console.log('Hello pls fill all the forms');
        }

    }

    return (
        <div className={'inputs'}>
            <div>
                <span>
                    <label id='stock-label'>Stock:  </label>
                    <input id='stock' />
                </span>

            </div>
            <div>
                <span>
                    <label id='cost-label'>Cost:  </label>
                    <input id='cost' type='number' />
                </span>

            </div>
            <div>
                <Button
                    id='ok'
                    variant="primary"
                    onClick={onInsertStock}
                >
                    OK
                </Button>
            </div>
        </div>
    );
}

export default InputStock;
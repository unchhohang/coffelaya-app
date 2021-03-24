import { Table } from 'react-bootstrap'
import sumPrice from '../../js functions/sum'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react'
import engToIsoDate from '../../js functions/engToIsoDate'
import nepToEngDate from '../../js functions/nepToEngDate'
//following css is Stock.css

const StockTable = (props) => {

    let stock = props.stock;
    let date = props.date;
    let totalCost = 0;
    let engDate;
    let tommorowEngDate;

    useEffect(() => {
        if (date == undefined) {
            date = new Date();
            engDate = engToIsoDate(date);
        } else { 
            [engDate, tommorowEngDate] = nepToEngDate(date);
        }
    });

    console.log('date inside stock table: ' + date);

    function deleteStock(stockId) {
        let url = '/stock/' + stockId
        axios.delete(url)
            .then(props.refreshStock(engDate))
            .catch(err => console.log(err))
    }

    let tbody = stock.map((ele, i) => {
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.stock}</td>
                <td>{ele.cost}</td>
                <td><Button
                    variant="danger"
                    size='sm'
                    onClick={() => {
                        deleteStock(ele._id)
                    }}
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </span>
                </Button></td>
            </tr>
        );
    });

    if (stock.length != 0) {
        let toTotal = stock.map((ele) => {
            return (ele.cost);
        })

        totalCost = sumPrice(...toTotal);
        console.log('total: ' + totalCost);

    }


    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Stock</th>
                        <th>cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>

            </Table>
            <span id='total-cost'>Total Cost: {totalCost}</span>
        </div>
    );
}

export default StockTable;
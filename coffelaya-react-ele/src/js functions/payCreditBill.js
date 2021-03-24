import axios from 'axios'
import sortCredit from './sortCredit'

//pay credit bills returns remainig amount
function payCredit(given, billList) {
    let price = given;
    let payBill = [];
    let sortingList = billList;
    sortCredit(sortingList);
    sortingList.forEach((ele) => {
        if (price >= ele.creditAmount) {
            payBill.push(ele);
            price = price - ele.creditAmount;
        }
    });

    payBill.forEach((ele) => {
        let url = '/credit/pay/' + ele._id;
        axios.patch(url)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    });

    return price;

}

export default payCredit;
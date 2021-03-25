import sortCredit from "./sortCredit";

//return highlight bills _id
function markBillsPaying(given, billList) {
    let price = given;
    let payBill = [];
    let sortingList = billList;
    sortCredit(sortingList);
    sortingList.forEach((ele) => {
        if (price >= ele.creditAmount) {
            payBill.push(ele._id);
            price = price - ele.creditAmount;
        }
    });
    console.log('highligh bills are');
    console.log(payBill);
    return payBill;
}

export default  markBillsPaying;
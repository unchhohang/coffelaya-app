function sortCredit(billList) {
    billList.sort(
        function (a, b) {
            { return b.creditAmount - a.creditAmount; }
        }
    );
    return billList
}

export default sortCredit;
import NepaliDate from 'nepali-date-converter'

function nepToEngDate(valueDate) {
    let toNepaliDate = new NepaliDate(valueDate).toJsDate();
    let startDate = toNepaliDate.getFullYear() + "-" + (toNepaliDate.getMonth() + 1) + "-" + toNepaliDate.getDate();

    toNepaliDate.setDate(toNepaliDate.getDate() + 1);
    let endDate = toNepaliDate.getFullYear() + "-" + (toNepaliDate.getMonth() + 1) + "-" + toNepaliDate.getDate();

    return([startDate, endDate]);
}

export default nepToEngDate;
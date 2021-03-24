//return eng date string without 
function engToIsoDate(engDate) {
    let isoDateOnly = engDate.getFullYear() + "-" + (engDate.getMonth() + 1) + "-" + engDate.getDate();
    return isoDateOnly;
 }

 export default engToIsoDate;
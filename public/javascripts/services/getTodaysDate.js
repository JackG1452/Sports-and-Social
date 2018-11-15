// get todays date

function getTodaysDate() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 
    // Todays date format can be changed here
    today = yyyy + '-' + mm + '-' + dd;
    

    return today;
}


module.exports = getTodaysDate;
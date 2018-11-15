// get todays date
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


function updateButtonFunction() {
  console.log("todays date .................. ", today)
  var eventNameEntered = document.forms["mainForm"]["eventName"].value;
  var dateEntered = document.forms["mainForm"]["date"].value;
  console.log("date entered .................. ", dateEntered)

  if (eventNameEntered == ""){
    alert("Please provide Event Name to SAVE");
    return false;

  } else if (dateEntered < today && dateEntered !== '') {
    alert("The date you have entered is in the past. Please provide a date in the future to SAVE");
    return false;

  } else if (dateEntered < today && dateEntered !== '' && eventNameEntered == "") {
    alert("The date you have entered is in the past. Please provide a date in the future to SAVE");
    alert("Please provide Event Name to SAVE");
    return false;
  } 
  var r = window.confirm('Are you sure you wish to update this event?');
  if (r == true) {
    alert("Event has been updated!");
    mainForm.submit();

  } else {
      alert("Save cancelled!");
    }
}
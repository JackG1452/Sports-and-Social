 //Save button annual form submission if OK is selected and alert messages
 function saveButtonFunction() {

    var eventNameEntered = document.forms["mainForm"]["eventName"].value;
    var dateEntered = document.forms["mainForm"]["date"].value;
  
    if (eventNameEntered == ""){
      alert("Please provide Event Name to SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '') {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '' && eventNameEntered == "") {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      alert("Please provide Event Name to SAVE");
      return false;
  
    } 
    var r = window.confirm('Are you sure you wish to create this event?');
    if (r == true) {
      alert("Event has been created!");
      mainForm.submit();
  
    } else {
        alert("Save cancelled!");
      }
  }
  
   //Save button monthly form submission if OK is selected and alert messages
  function saveButtonFunctionMonthly() {
    var eventNameEntered = document.forms["monthlyForm"]["eventName"].value;
    var dateEntered = document.forms["monthlyForm"]["date"].value;
  
    if (eventNameEntered == ""){
      alert("Please provide Event Name to SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '') {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '' && eventNameEntered == "") {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      alert("Please provide Event Name to SAVE");
      return false;
    } 
    var r = window.confirm('Are you sure you wish to create this event?');
    if (r == true) {
      alert("Event has been created!");
      monthlyForm.submit();
  
    } else {
        alert("Save cancelled!");
      }
  }
  
   //Save button weekly form submission if OK is selected and alert messages
  function saveButtonFunctionWeekly() {
    var eventNameEntered = document.forms["weeklyForm"]["eventName"].value;
    var dateEntered = document.forms["weeklyForm"]["date"].value;
  
    if (eventNameEntered == ""){
      alert("Please provide Event Name to SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '') {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '' && eventNameEntered == "") {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      alert("Please provide Event Name to SAVE");
      return false;
    } 
    var r = window.confirm('Are you sure you wish to create this event?');
    if (r == true) {
      alert("Event has been created!");
      weeklyForm.submit();
  
    } else {
        alert("Save cancelled!");
      }
  }
  
   //Save button one-offs form submission if OK is selected and alert messages
  function saveButtonFunctiononeoffs() {
    var eventNameEntered = document.forms["oneoffsForm"]["eventName"].value;
    var dateEntered = document.forms["oneoffsForm"]["date"].value;
  
    if (eventNameEntered == ""){
      alert("Please provide Event Name to SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '') {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '' && eventNameEntered == "") {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      alert("Please provide Event Name to SAVE");
      return false;
    } 
    var r = window.confirm('Are you sure you wish to create this event?');
    if (r == true) {
      alert("Event has been created!");
      oneoffsForm.submit();
  
    } else {
        alert("Save cancelled!");
      }
  }
  
   //Save button sundries form submission if OK is selected and alert messages
  function saveButtonFunctionSundries() {
    var eventNameEntered = document.forms["sundriesForm"]["eventName"].value;
    var dateEntered = document.forms["sundriesForm"]["date"].value;
  
    if (eventNameEntered == ""){
      alert("Please provide Event Name to SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '') {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      return false;
  
    } else if (dateEntered < today && dateEntered !== '' && eventNameEntered == "") {
      alert("The date you have entered is in the past. Please provide a date in the future to enable SAVE");
      alert("Please provide Event Name to SAVE");
      return false;
    } 
    var r = window.confirm('Are you sure you wish to create this event?');
    if (r == true) {
      alert("Event has been created!");
      sundriesForm.submit();
  
    } else {
        alert("Save cancelled!");
      }
  }
  
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

  module.exports = {saveButtonFunction, 
                    saveButtonFunctionMonthly,
                    saveButtonFunctionWeekly,
                    saveButtonFunctiononeoffs,
                    saveButtonFunctionSundries}
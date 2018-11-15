 //highlighting sidebar links
$(document).ready(function(){

  highlightCurrentPage();
  showElement();

});
 //function to hightlight page currently in view
function highlightCurrentPage() {
   //get current path and find target links
  var target = '';
  var pathArray = window.location.pathname.split("/");
  var path;

  console.log('pathName = ', window.location.pathname)
  console.log('PathArray.......................', pathArray[1])

  if(pathArray[1] === 'updateForm') {
    var page = 'updateevent';
    target = $('a[href="/'+ page+'"]');

  } else if (pathArray[1] === 'updatememberForm') {
    var page = 'updatemembers';
    target = $('a[href="/'+ page+'"]');
    console.log('PathArray.......................', target)

  } else if (pathArray[1] === 'eventhistoryForm') {
    var page = 'eventhistory';
    target = $('a[href="/'+ page+'"]');
    console.log('PathArray.......................', target)

  }  else {
      path = pathArray.pop()
      target = $('a[href="/'+path+'"]');
      console.log('PathArray.......................', target)

  }
   //Add activeclass to target links
  target.addClass('active');
}

 //Sidebar sub heading ie. Update Members etc.. highlight and display when selected
function showElement() {
    let pathArray = window.location.pathname.split("/")
    let path = pathArray.pop()
    console.log(path);
    var x = document.getElementById("indent");
    if (path === "updatemembers") {
        x.style.display = "block";
    }else if (pathArray[1] === "updatememberForm") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


function addMemberTable(){
  console.log('Testing');
  document.getElementById("AddMemberBtn").hidden = 'true';
  document.getElementById("AddMemberBtn").style.backgroundColor = "darkgrey";
  // document.getElementById("AddMemberBtn").title="Please complete new member detail before adding another";
  // AddMemberBtn.innerHTML="Add New Member<span class='tooltiptext'>Please complete new member detail before adding another</span>"
  var row = memberstable.insertRow(1);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  var cell4 = row.insertCell(4);
  cell0.innerHTML= "<input type='text' id='memberName' name='memberName'>"
  cell1.innerHTML= "<input type='text' id='seatLocation' name='seatLocation'>"
  cell4.innerHTML= "<input type='file' name='file' id='file' class='custom-file-input'><input type='button' id='membersSubmit' value='Submit'/>"

}



$(document).on('click','#membersSubmit',function(){

    var membersImage = document.getElementById('file')
    var memberNameEntered = document.getElementById('memberName')

    if (memberNameEntered.value == ""){
      alert("Please provide Member Name to SAVE");
    }

    else if (membersImage.value == "") {
      alert("Please select/upload a photo to successfully save member details");
    }

    else if (membersImage.value != "") {
        var r = window.confirm('Are you sure you wish to add this member?');
        if (r == true) {
          alert("Member has been added sucessfully!");
        membersForm.submit();

        } else {
        alert("Save cancelled!");
      }
    }
  })

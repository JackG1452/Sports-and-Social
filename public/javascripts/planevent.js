  // for tab content on new event page
  function openPage(pageName,elmnt,color) {
      var i, tabcontent, tablinks;

      console.log('In PE Page')

      tabcontent = document.getElementsByClassName("tabcontent");

      for(i = 0; i < tabcontent.length; i++){
          tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablink");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = "";
      }
      document.getElementById(pageName).style.display = "block";
      elmnt.style.backgroundColor = color;

 }

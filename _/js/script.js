var selecteditems = [];

$(window).load(function () {
        
  //hiding two alert messages
  $("#selected-alert").hide();
  $("#remove-alert").hide();

  //storing all the items. The name must match with the image name
  var allitems = new Array("books","camera","car","clothes","computer","headphone","health","mobile","movies","resturant","shopping","tablet");
  var allitemslength = allitems.length;
    
  //stacking the various div elements to hold the various components
  for (var counter = 0; counter < allitemslength; counter = counter + 3) {
    var startingdiv = "<div class='row'> ";
    var endingdiv = "</div>";
    var innerdiv = "";

    for (var innercount = 0; innercount < 3; innercount++) {

      var divcolumn = "<div class='col-md-4' onclick='AlertStuff(this)' id='"+ allitems[innercount+counter] +"'>";
      var imgtag = "<img src=img/"+allitems[innercount+counter]+".png" + " class='img-responsive' data-toggle='tooltip' data-placement='top' title='"+allitems[innercount+counter]+"'>";

      var divelement = divcolumn + imgtag + endingdiv;
      innerdiv += divelement;
    }

    $("#searchingtopics").append(startingdiv + innerdiv + endingdiv);
  }

$('[data-toggle="tooltip"]').tooltip();
  //auto complete
  $("#searchbox").on('change keyup paste', function() {
    
    //initializing the tool tip
    InitializeTooltip();
      
    var texttyped = this.value; 

    $("#searchingtopics").children().remove();

    var matcheditems = new Array();

    for (var i = 0; i < allitemslength; i++) {
      if (allitems[i].match("^"+texttyped)) {
        matcheditems.push(allitems[i]);
      }
    }

  //recontructing the div elements based on the keywords typed
  for (var counter = 0; (counter < matcheditems.length && matcheditems[counter] != undefined); counter = counter + 3) {
        var startingdiv = "<div class='row'> ";
        var endingdiv = "</div>";
        var innerdiv = "";

        for (var innercount = 0; (innercount < 3 && matcheditems[innercount+counter] != undefined); innercount++) {

          if (selecteditems.indexOf(matcheditems[innercount+counter]) >= 0) {
            style = " style='background:#808080'";
          }

          var divcolumn = "<div class='col-md-4' onclick='AlertStuff(this)' id='"+matcheditems[innercount+counter]+"'"+ style+">";
          var style = '';

          var imgtag = "<img src=img/"+matcheditems[innercount+counter]+".png" + " class='img-responsive' data-toggle='tooltip' data-placement='top' title='"+matcheditems[innercount+counter]+"'>";

          var divelement = divcolumn + imgtag + endingdiv;
          innerdiv += divelement;
        }

        $("#searchingtopics").append(startingdiv + innerdiv + endingdiv);
      }
      
      //initializing the tool tips
      InitializeTooltip();
  });
});


//function to animate the hiding of the alert messages
function hidealerts(selectedid) {
  $(selectedid).alert();
  $(selectedid).fadeTo(500, 500).slideUp(400, function(){
  });
}

//function to initialize tooltip
function InitializeTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
}

//function to toggle between the selection of the items
function AlertStuff(divelement) {
    var selecteddiv = $(divelement);
    var value = selecteddiv.attr("id");
    var index = selecteditems.indexOf(value);

    if (index < 0) {
      selecteddiv.css("background", "#808080");
      selecteditems.push(selecteddiv.attr("id"));
      hidealerts("#selected-alert");          
    }
    else {
      selecteddiv.css("background", "");
      hidealerts("#remove-alert");
      delete selecteditems[selecteditems.indexOf(value)];          
    }

}
//The URIs of the REST endpoint
RAAURI = "https://prod-00.swedencentral.logic.azure.com/workflows/09eb7af3392046bbbce2709c20e6b457/triggers/When_an_HTTP_request_is_received/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=Z7Zv9JjPmdPi31uXxG65wffpj4QfnFGLtG18s63dYDU";
CIAURI = "https://prod-23.swedencentral.logic.azure.com/workflows/02b7fb9d65a948519713f26c52463aac/triggers/When_an_HTTP_request_is_received/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=3ig5SbGFy_Ht7Vtr4QY5tomtHfDPEK3Z9zHap4GU2uA";

DIAURI0 = "https://prod-02.swedencentral.logic.azure.com/workflows/d94de9cb8394421792901ce132385574/triggers/When_an_HTTP_request_is_received/paths/invoke/rest/v1/assets/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=9xyNTUkbhAZKEjwnMfBQjTV8XLGdNW5rxSBIthAv6vU";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retAssets").click(function(){

      //Run the get asset list function
      getAssetList();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
  //Construct JSON Object for new item

  var subObj = {
  AssetLabel: $('#AssetLabel' ). val(),
  Cost: $('#Cost' ). val(),
  AssetType: $('#AssetType' ). val(),
  NameOfOwner: $('#NameOfOwner' ). val(),
  AddressLine1: $('#AddressLine1' ). val(),
  AddressLine2: $('#AddressLine2' ). val(),
  Note: $('#Note' ). val()
}

//Convert to a JSON String
const jsonData = JSON.stringify(subObj);

$.post({
    url: CIAURI,
    data: jsonData,
    contentType: "application/json; charset=utf-8"
})
.done(function (response) {
    getAssetList();
});

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList(){

  //Replace the current HTML in that div with a loading message
$('#AssetList' ). html('<div class="spinner-border" role="status"><span class="sr- only">&nbsp;</span>' );
$. getJSON(RAAURI, function( data ) {
   data=data.ResultSets.Table1;
  //Create an array to hold all the retrieved assets
var items = [];
//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$. each( data, function( key, val ) {
items. push( "Asset Label: " + val[ "AssetLabel"] + ", Cost: " + val[ "Cost"] +
"<br/>");
items. push( "Asset Type: " + val[ "AssetType" ] + ", Asset Owner: " +
val[ "NameOfOwner"]+ "<br/>");
items. push( "Address Line 1: " + val[ "AddressLine1"] + "<br/>" );
items. push( "Address Line 2: " + val[ "AddressLine2"] + "<br/>" ) ;
items. push( "Note: " + val[ "Note"] + "<br/>");
items. push('<button type="button" id="subNewForm" class="btn btndanger" onclick="deleteAsset(' +val[ "AssetID"] +')">Delete</button> <br/><br/>' );
});
//Clear the assetlist div
$('#AssetList' ). empty();
//Append the contents of the items array to the AssetList Div
$( "<ul/>", {
"class": "my-new-list",
html: items. join( "" )
}). appendTo( "#AssetList" );
});
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){
$. ajax({
type: "DELETE",
//Note the need to concatenate the
url: DIAURI0 + id + DIAURI1,
}). done( function( msg ) {
//On success, update the assetlist.
getAssetList();
});
}

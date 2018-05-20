//------------- CREATING VARS FOR TAGS -----------------------
var buttonsDiv  = "#buttonsDiv";
var gifsDiv     = "#gifsDiv";
var searchBox   = "#searchBox";
var searchBtn   = "#searchBtn";
var gifBtnClass = "gifBtn";
var gifClass    = "gif";
//------------- CREATING BASE URL ----------------------------
var apiKey    = "F23knoQwyOJkCY1iBLW4oyToDJwe6i1a";
var apiRating = "PG-13";
var apiLimit  = "25";
var baseUrl   = "https://api.giphy.com/v1/gifs/search?" +
    "api_key=" + apiKey + "&" +
    "limit="   + apiLimit + "&" +
    "rating="  + apiRating + "&" +
    "lang = en&" + "q=";//query left empty
//------------- GENERATING FIRST BUTTONS ----------------------
var btnNameList = ["apple", "bananna", "mango", "watermelon", "peach", "pineapple"];

for (var btnNameIndex = 0; btnNameIndex < btnNameList.length; btnNameIndex++) {
    add_btn(btnNameList[btnNameIndex])
}
//-------------add_btn: adds new btn elem. to buttonsDiv ----------------------
function add_btn(btnName){
    var newBtn = $("<button>");
    $(newBtn).attr("class", gifBtnClass);
    $(newBtn).text(btnName);
    $(buttonsDiv).append(newBtn);
};
//-------------displayBtn: sends sends api request with q=btnName, creates img elem and appends to gifsDiv ----------------------
function displayBtn(btnName) {
    $.ajax({
        url: baseUrl + btnName,
        method: 'GET',
    }).done(function (response) {
        var gifObjList = response.data;
        for(var gifObjIndex=0; gifObjIndex < gifObjList.length; gifObjIndex++){
            var newGif = $("<img>");
            $(newGif).attr("class",gifClass);
            $(newGif).attr("src",gifObjList[gifObjIndex].images.fixed_height_small.url);
            $(gifsDiv).append(newGif);
        }
    })
};
//------------- WHEN GIF BTN CLICKED: display gifs of that btn name ----------------------
$("."+gifBtnClass).on("click", function () {
    $(gifsDiv).empty();
    displayBtn($(this).text());
});
//------------- WHEN SUBMIT BUTTON CLICKED: use searchBox.val() as new btn name and display gifs of it ----------------------
$(searchBtn).on("click",function(){
    var newBtnName = $(searchBox).val().trim();
    $(searchBox).val("");
    console.log(btnNameList.indexOf(newBtnName));
    if (btnNameList.indexOf(newBtnName) == -1){
        $(gifsDiv).empty();
        add_btn(newBtnName);
        displayBtn(newBtnName);
    }

});
//------------- WHEN PAGE LOADED: display the gifs of the first button ----------------------
displayBtn(btnNameList[0]);

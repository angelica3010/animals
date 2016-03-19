//initial array of animals, which will appear when the page initially loads
var animals = ['cat', 'dog', 'duck', 'pig', 'rat'];

//make a for loop statement

function buttonMaker (){

    //it makes the animals array display unique values. If you keep clicking submit, it will not repeat the animials in the aarray
    $('#buttons').html('');
    

    //for loops counts the amount of items in the array based on the length. IN this case its 4 itmems (since you start at 0)
	for (var i=0; i<animals.length; i++)
    {
        //convert to jquery to make a button tag
		var button = $('<button>')

        //make animal class for yhe button
		button.addClass('animalClass')

        //the data type looks in the animals array for what antimail it is, and it will assign it to that aimla
        //data type makes the text usable for a search query from the animals array
        button.attr('data-type', animals[i]);

        //this is the text that will display on the button animals from the array
		button.text(animals[i])
        
        // This connects to the div ids buttons in the HTML. It appends (adds) the next button to the button list 
        // and everything above from the for loop. It also tells  the computer  to keep going through the array, instead of stopping
        //at hte first animial, which is cat
		$('#buttons').append(button)

	}

//this is when someone wants to add something in the search box for a different animial, not in the array

    if($('#holdsbuttons').val().trim() != "")
     {   
        button.addClass('animalClass')
        
        //The new items that someone is searching will be added aka pushed  to the array
        //since you have an array, you are telling it to go throughout the array to make button align wht the text
        animals.push($('#holdsbuttons').val());
        button.attr('data-type', $('#holdsbuttons').val());
        button.text($('#holdsbuttons').val())
        //selecting the form which has an id of holdsbutton from the html and you are appeeding the button you created to appear on the form 
        $('#buttons').append(button)

    }
    
}


//when the page loads, it calls the buttonmaker function

$(document).ready(function(){
event.preventDefault();    
//PROBLEM: 
//Need to collection input value from form submittion and contain 
//Once contained, add in value to animalSelection

//val is the value in the search box, and then text is the 
//name of the search box
    
    buttonMaker(); 



//this function will fire whenever a new search query, which is an animial in this case is added
  
})

$(document).on('click','#animal', function(){
event.preventDefault();    
//PROBLEM: 
//Need to collection input value from form submittion and contain 
//Once contained, add in value to animalSelection

//val is the value in the search box, and then text is the 
//name of the search box
    
    buttonMaker(); 




   
})

//whenever you make a button, you need to make a click event, to make sure the button is clickable
//whenever someone clicks on an animalclass button this code will run
$(document).on('click','.animalClass', function(){

//THis will grab the animal that was clicked on becuase it grabs the specific animal that was typed in the search box
    var animalSelection = $(this).data('type');



//make the variable search specificailly in the API for the animalselection you need. In this case it was
//for the 

//this query is going to be sent to this query and api will retun this information about the
//animal that was in the array aonly
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalSelection + "&api_key=dc6zaTOxFJmzC&limit=10";
//alert(queryURL);
   // console.log(queryURL);
 

//whernever you have an ajax it tells it to go to json
//What get means is that allows what you have you have to be retreitveable, in the case it is tellign hte computer htat 
//query URL is retrievebale, that you are allowed to use hte URL

    $.ajax({
            url: queryURL,
            method: 'GET'
        }) //this done function is getting the response back from ajax. Its storing (you can't see this yet) the value
    //such as the Cat URL, or Dog URL. The images are now in teh response
        .done(function(response) {


//console.log willl console log the response object
console.log(response);


//This console logs the image property. Its not necessary, but you can use it to check if have a response. Its checking
//if you typeed the URL correctly. It checks if the image will appear. ITs chekcing for bugs
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].images.fixed_height.url)
                console.log(response.data[i].images.fixed_height_still.url)
            }
        
//append an image tag
//you assign the data of hte responsen to results, so you can use this in your loop below to make an image tag
//.data converts the repsonse objec into an array
//.data is an array

                var results = response.data;

                $('#gifsAppearHere').html('');

                //--------------------------------
                //this is the for loop for the ajax. It checks how many images there are available from that search query.
                //the .length is hte maximum that website has for that speciific serach query
                //remember you made the results variable based on teh responses from the URL AJAX
                for (var i = 0; i < results.length; i++) {

//For animalDIV var it makes individual divs for each image
                    var animalDiv = $('<div>');
                    
                    //this makes a paragerah tag, and grabs the rating from teh website. The rating here is specific
                    //to this AJAX
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    
                    //this makes the image tag
                    var animalImage = $('<img>');
                    
                    //this src links to that image. THis  images.fixedheight is specifc to giphfy
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#gifsAppearHere').prepend(animalDiv);
        }

        })  

    })

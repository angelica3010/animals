var animals = ['cat', 'dog', 'duck', 'pig', 'rat'];

function buttonMaker (){

    $('#buttons').html('');
    
	for (var i=0; i<animals.length; i++)
    {
		var button = $('<button>');

		button.addClass('animalClass');

        button.attr('data-type', animals[i]);

		button.text(animals[i]);
        
		$('#buttons').append(button);

	}


    if($('#holdsbuttons').val().trim() != "")
     {   
        button.addClass('animalClass');      
        animals.push($('#holdsbuttons').val());
        button.attr('data-type', $('#holdsbuttons').val());
        button.text($('#holdsbuttons').val());
        $('#buttons').append(button);
    }
}


$(document).ready(function(){
event.preventDefault();    
    buttonMaker(); 
})

$(document).on('click','#animal', function(){
event.preventDefault();    

    buttonMaker(); 

})

$(document).on('click','.animalClass', function(){

    var animalSelection = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalSelection + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: 'GET'
        }) 
        .done(function(response) {

        console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].images.fixed_height.url)
                console.log(response.data[i].images.fixed_height_still.url)
            }


        var results = response.data;

             $('#gifsAppearHere').html('');

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div>');
                   
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    
                    var animalImage = $('<img>');
                    
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#gifsAppearHere').prepend(animalDiv);
        };

        });  

    })

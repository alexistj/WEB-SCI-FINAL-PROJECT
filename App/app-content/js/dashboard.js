function getScores() {

	document.getElementById("userScores").innerHTML = '';
	$.ajax({
            url: "http://localhost:3000/dashboard/getScores/"+JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username,
            type: "POST",

            error: function() {
                //nothing to show play game first
                console.log("it went..");


            },
            


           
            success: function(response)
              {
                 var div = document.createElement("div"); 

                   
                    
    
                console.log("it went");
                console.log(response);
                if (response.length == 0 ){
                	console.log("nothing");
                	var text =  document.createElement("p"); 
                	var textContent = document.createTextNode("You have not played any games yet."); 

                	text.appendChild(textContent);

                	div.appendChild(text);

                	document.getElementById("userScores").appendChild(div);

                } else {
                	for (var x=0; x<response.length; x++){
                		var text =  document.createElement("h3"); 
	                	var textContent = document.createTextNode((x+1) +  ") " +response[x].score); 

	                	text.appendChild(textContent);

	                	div.appendChild(text);

	                	document.getElementById("userScores").appendChild(div);

                	}
                }
              	//console.log(response);
                   //console.log("enter"); 
              },

    });
}


function convertToInt(data){

	var result = [];
	for (var y=0; y<data.length; y++ ){
		var tmp = [];
		var text= data[y].score;
		var integer = parseInt(text, 10);

		result.push(integer);

	}

	return (result);

	



}



function getScores() {

	//document.getElementById("userScores").innerHTML = '';

	var test = $("#userScores");

	console.log(test);
	$.ajax({
            url: "http://localhost:3000/dashboard/getScores/"+JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username,
            type: "POST",

            error: function() {
                //nothing to show play game first

                console.log("bad");

            },
            


           
            success: function(response)
              {
                 var div = document.createElement("div"); 

                   
                 var inInt = convertToInt(response);
                 inInt.sort(function(a, b){return b-a});




                if (response.length == 0 ){

                	var text =  document.createElement("p"); 
                	var textContent = document.createTextNode("You have not played any games yet."); 

                	text.appendChild(textContent);

                	div.appendChild(text);

                	document.getElementById("userScores").appendChild(div);

                } else {

                	var scoreTable = "<table> <tr id='tableHead'> <th>Rank</th> <th>Score</th> </tr>";



                	for (var x=0; x<response.length; x++){
                		scoreTable += "<tr> <th>" + (x+1) + "</th>";
                		scoreTable += "<th>" + inInt[x]+ "</th></tr>";
		


	                	

                	}

                	scoreTable += "</table>";
                	document.getElementById("userScores").innerHTML= scoreTable;
                }
              	//console.log(response);
                   //console.log("enter"); 
              },

    });
}
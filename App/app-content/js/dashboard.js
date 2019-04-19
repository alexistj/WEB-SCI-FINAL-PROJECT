function getScores() {
	console.log("enter");

	$.ajax({
            url: "http://localhost:3000/dashboard/getScores",
            
            type: "POST",

            error: function() {
                //nothing to show play game first
                console.log("it went..");

                
            },
            
           
            success: function(response)
              {
                
                console.log("it went");
              	//console.log(response);
                   //console.log("enter"); 
              },

    });
}
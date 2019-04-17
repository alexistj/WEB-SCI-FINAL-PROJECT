window.onload = function() {



    
    var isGameOver = false;
    var questions = [];
    var level1Q = ['I need a basket, where I can orgainize the contents to a spot (index) but I have all the time in the world so I dont care if searching in my basket takes a bit longer', 'I gotta get my items quickly, I do NOT have time to search for my stuff all the time,so please give me a container that works in my time! Make it snappy!', "I got this FAT plate of pancakes, but I'm a little confused on how to eat them. What structure should I use to eat these pancakes.*Hint last in first out* ","I have a long line at my shop. I want to quickly serve my customers first come first serverd, then guide them out of the line. What structure should I use?" ];
    
    var level2Q = ["The train is coming! I need to just find the first empty seat in passengers rails carts, so im not looking back at any of the previous carts, only going to the NEXT. Which data structure is the best for this type of search? ", ""];

  
   
    var answers = [];
    var level1A =[0, 4, 6 , 5];
    var score =0;
    var counter=30;
    var randomQ=0;
    var randomAnswer=level1A[0];
    var lifeText;
    var questionText;
    var scoreText;
    var replayText;
    var button0;
    var button1;
    var button2;
    var button3;
    var button4;
    var button5;
    var button6;
    var button;
    var life = 3;
    var i=0;
    questions[0] = level1Q;
    answers[0] = level1A;
    var game  = new Phaser.Game(800,800);
    
    
    
  //Check the question answer
    function checkAnswer(button){
        if(!isGameOver){
            console.log(button.frame);
            console.log(randomAnswer);
            if(button.frame===randomAnswer){
                console.log(button.frame)
                score+=Math.floor((350+counter)/4);
                console.log(score);
                scoreText.text = "Score: "+score.toString();
                nextQuestion(randomQ);

            }
            else{ 
                if(life > 1){
                    life = life-1;
                    lifeText.text = "Lives:"+life.toString();

                     nextQuestion(randomQ);
                }
                else{
                    life = life-1;
                    lifeText.text = "Lives:"+life.toString();
                    game.state.start("GameOver");
                }
            }
        }
   }
   function nextQuestion(randomQ){  
        scoreText.text = "Score: "+score.toString();
        randomQ = game.rnd.between(0,2); 
        randomAnswer = answers[0][randomQ];
        questionText.text = questions[0][randomQ];

    }
    
    
    

    var Play = function(game){}
    Play.prototype = {
       
            preload: function(){
                game.load.spritesheet("buttons", "newbuttons.png", 128,36);
            },
            create: function(){
              game.stage.backgroundColor = "#4488AA";
                //Question location 
                questionText = game.add.text(200,75,questions[0][0],{
                    font:"bold 20px Arial",
                    wordWrapWidth: 400,
                    wordWrap: true,
                    backgroundColor: "white"
                });

                //Score Location
                scoreText = game.add.text(10,10,"Score:"+score.toString(),{
                    font:"bold 24px Arial"
                });

                //Life Location
                lifeText = game.add.text(650,10,"Lives:"+life.toString(),{
                    font:"bold 24px Arial"
                });

                //Array
                button0 = game.add.button(90, 200, "buttons", checkAnswer, this).frame = 0;
                //Vector
                button1 = game.add.button(240, 200, "buttons", checkAnswer, this).frame = 1;
                //Singly Linked List
                button2 = game.add.button(390, 200, "buttons", checkAnswer, this).frame = 2;
                //Doubly Linked List
                button3 = game.add.button(540, 200, "buttons" , checkAnswer, this).frame = 3;
                //Hash Map
                button4 = game.add.button(200, 300, "buttons", checkAnswer, this).frame= 4;
                //Queue
                button5 = game.add.button(350, 300, "buttons", checkAnswer, this).frame = 5;
                //Stack
                button6 = game.add.button(500, 300, "buttons" ,checkAnswer, this).frame = 6;
            }
      
    }
    
    
    var GameOver = function(game){}
	GameOver.prototype = {
	     create: function(){
	          var style = {
	               font: "32px Monospace",
	               fill: "#00ff00",
	               align: "center"
	          }
	          var text = game.add.text(game.width / 2, game.height / 2, "Game Over\n\nYour score: " + score.toString() + "\n\nTap to restart", style);
	          text.anchor.set(0.5);
             
              //console.log(url);
             console.log(window.localStorage);
             if(window.localStorage.hasOwnProperty("ngStorage-currentUser")){
                 
                $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/runtime/sendScore/"+JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).id+"/" +score ,
                        async:true,
                        success: function(){
                            console.log("Send score success");

                        }
                  });
             }
             
			   game.input.onDown.add(this.restartGame, this);	
               game.stage.backgroundColor = "#4488AA";
	     },
    		restartGame: function(){
          	score = 0;
            life = 3;
          	game.state.start("Play");  	
     	}		
	} 
    
    
    
    game.state.add("Play", Play);
    game.state.add("GameOver", GameOver );
    game.state.start("Play");
    

}
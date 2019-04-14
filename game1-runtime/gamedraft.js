window.onload = function() {



    
    var isGameOver = false;
    var questions = [];
    var level1Q = ['I need a basket, where I can orgainize the contents to a spot (index) \n but I have all the time in the world so I dont care if searching in my basket takes a bit longer', 'I gotta get my items quickly, \nI do NOT have time to search for my stuff all the time,\n so please give me a container that works in my time!\n Make it snappy!', "I got this FAT plate of pancakes, but I'm a little confused on how to eat them.\n What structure should I use to eat these pancakes.*Hint last in first out* ","I have a long line at my shop. I want to quickly serve my customers first come first serverd, then guide them out of the line. What structure should I use?" ];
    
    var level2Q = ["The train is coming! I need to just find the first empty seat in passengers rails carts, so im not looking back at any of the previous carts, only going to the NEXT. Which data structure is the best for this type of search? ", ""];
    
     var level3Q = ['I need a basket, where I can orgainize the contents to a spot (index) \n but I have all the time in the world so I dont care if searching in my basket takes a bit longer', 'I gotta get my items quickly, \nI do NOT have time to search for my stuff all the time,\n so please give me a container that works in my time!\n Make it snappy!', "I got this FAT plate of pancakes, but I'm a little confused on how to eat them.\n What structure should I use to eat these pancakes.*Hint last in first out* ","I have a long line at my shop. I want to quickly serve my customers first come first serverd, then guide them out of the line. What structure should I use?" ];
  
  
   
    var answers = [];
    var level1A =[0, 4, 6 , 5];
    var score =0;
    var counter=30;
    var randomQ=0;
    var randomAnswer=level1A[0];
    var lifeText;
    var questionText;
    var scoreText;
    var button0;
    var button1;
    var button2;
    var button3;
    var button4;
    var button5;
    var button6;
    var button;
    var life = 3;
    questions[0] = level1Q;
    answers[0] = level1A;
    
   /* //Creates a new timer's text location
    createTimer: function(){
        var me = this;
        me.timeLabel = me.game.add.text(500, 10, "00:00", {font: "bold 24px Arial"}); 
    },
    
    //Updates the timer on game page 
    updateTimer: function(){

        var me = this;
        var currentTime = new Date();
        var timeDifference = me.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        me.timeElapsed = Math.abs(timeDifference / 1000);

        //Time remaining in seconds
        var timeRemaining = me.totalTime - me.timeElapsed; 

        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = Math.floor(timeRemaining) - (60 * minutes);

        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 

        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 
        
        
        me.timeLabel.text = result;
        
        if(me.timeElapsed >= me.totalTime){
             life--;
                lifeText = "Lives:"+life.toString()
                if(life <= 0){
                    gameOver();
                }
                else{
                    nextQuestion();
                }
        }

    }  */
    
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
                    gameOver();
                }
     		}
          }
	}
    
    //Move to the nect Question in the array
    //ToDo: Add conditions to modify game level questions and pick random questions 
    function nextQuestion(randomQ){  
        //Start new timer for next question
      //  timer.startTime = new Date();
      /*timer.totalTime = 120;
        timer.timeElapsed = 0;

        timer.createTimer();

        timer.gameTimer = game.time.events.loop(100, function(){
            timer.updateTimer();
        });*/
           
		scoreText.text = "Score: "+score.toString();
		randomQ = game.rnd.between(0,2); 
        randomAnswer = answers[0][randomQ];
        
		questionText.text = questions[0][randomQ];
        
       
       
        
	}
    
    function gameOver(){
        
        game.stage.backgroundColor = "#ff0000";
		questionText.text = "Your score:" + score.toString();
        isGameOver = true;
		//localStorage.setItem("topScore",Math.max(score,topScore));
        
    }
    
    function onPreload() {
		game.load.image("timebar", "time.png");
		game.load.image("buttonmask", "buttonmask.png");
		game.load.spritesheet("buttons", "newbuttons.png", 128,36);
	}
    
    function onCreate(){
        var timer = this; 
        game.stage.backgroundColor = "#FFE0AE";
        game.stage.disableVisibilityChange = true;
        var style = { font: "bold 25px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        
        
        //Question location 
        questionText = game.add.text(75,75,questions[0][0],{
			font:"bold 15px Arial"
		});
        
        //Score Location
        scoreText = game.add.text(10,10,"Score:"+score.toString(),{
			font:"bold 24px Arial"
		});
        
        //Life Location
        lifeText = game.add.text(900,10,"Lives:"+life.toString(),{
			font:"bold 24px Arial"
		});
	
        //Array
        button0 = game.add.button(0, 200, "buttons", checkAnswer, this).frame = 0;
        //Vector
        button1 = game.add.button(150, 200, "buttons", checkAnswer, this).frame = 1;
        //Singly Linked List
        button2 = game.add.button(300, 200, "buttons", checkAnswer, this).frame = 2;
        //Doubly Linked List
        button3 = game.add.button(450, 200, "buttons" , checkAnswer, this).frame = 3;
        //Hash Map
        button4 = game.add.button(0, 300, "buttons", checkAnswer, this).frame= 4;
        //Queue
        button5 = game.add.button(150, 300, "buttons", checkAnswer, this).frame = 5;
        //Stack
        button6 = game.add.button(300, 300, "buttons" ,checkAnswer, this).frame = 6;
        
        //Start new timer 
       /* timer.startTime = new Date();
        timer.totalTime = 120;
        timer.timeElapsed = 0;
        timer.createTimer();

        timer.gameTimer = game.time.events.loop(100, function(){
            timer.updateTimer();
        });*/
    }
    
    
    var game  = new Phaser.Game(1000,1000, Phaser.AUTO,"",{
        preload: onPreload,
        create: onCreate
    });
    
    

    
  



}
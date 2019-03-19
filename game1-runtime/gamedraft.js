window.onload = function() {


    var game  = new Phaser.Game(1000,1000, Phaser.CANVAS,"",{
        preload: onPreload,
        create: onCreate
    });
    
    
    var isGameOver = false;
    var questions = [];
    var level1Q = ['What is the data is best'];
    var answers = [];
    var level1A =[6];
    var score =0;
    questions[0] = level1Q;
    answers[0] = level1A;
    
    
    
    var life = 3;
    
    function onPreload() {
		game.load.image("timebar", "time.png");
		game.load.image("buttonmask", "buttonmask.png");
		game.load.spritesheet("buttons", "newbuttons.png", 250,50);
	}
    
    var button;
    
    function onCreate(){
        //Array
        button0 = game.add.button(0, 100, "buttons", checkAnswer, this).frame = 0;
        //Vector
        button1 = game.add.button(260, 100, "buttons", checkAnswer, this).frame = 1;
        //Singly Linked List
        button2 = game.add.button(0, 200, "buttons", checkAnswer, this).frame = 2;
        //Doubly Linked List
        button3 = game.add.button(260, 200, "buttons" , checkAnswer, this).frame = 3;
        //Hash Map
        button4 = game.add.button(0, 300, "buttons", checkAnswer, this).frame= 4;
        //Tree
        button5 = game.add.button(260, 300, "buttons", checkAnswer, this).frame = 5;
        button6 = game.add.button(0, 400, "buttons" ,checkAnswer, this).frame = 6;
        button7 = game.add.button(260, 400,"buttons", checkAnswer, this).frame = 7;
    }
    
    
    
    
    function checkAnswer(button){
		if(!isGameOver){
			console.log(button.frame)
            if(button.frame==answers[0][0]){
     			score+=Math.floor((350)/4);
                console.log(score);
				    			
     		}
     		else{ 
                if(life > 1){
                    life = life-1;
                }
                else{
                    gameOver(button.frame);
                }
                
     			
     		}
          }
	}
    
    
	function isGameOver(gameOverString){
		game.stage.backgroundColor = "#ff0000";
		questionText.text = questionText.text+" = "+gameOverString;
          isGameOver = true;
		localStorage.setItem("topScore",Math.max(score,topScore));
	}



}
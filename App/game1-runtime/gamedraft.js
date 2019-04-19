window.onload = function() {

    var isGameOver = false;
    var questions = [];


  
   
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
    var j=0;
   // questions[0] = level1Q;
    //answers[0] = level1A;
    var game  = new Phaser.Game(800,600);
    
    
    
  //Check the question answer
   function checkAnswer(button){

       // console.log(button.frame);
     //    console.log(randomAnswer);
        if(button.frame==questions[i].a ){
             i++;
            console.log(button.frame)
            score+=Math.floor((350+counter)/4);
            console.log(score);
            scoreText.text = "Score: "+score.toString();
            nextQuestion(questions);

        }
        else{ 
             i++;
            if(life > 1){
                life = life-1;
                lifeText.text = "Lives:"+life.toString();

                 nextQuestion(questions);
            }
            else{
                life = life-1;
                lifeText.text = "Lives:"+life.toString();
                game.state.start("GameOver");
            }
        }
   }
   function nextQuestion(randomQ){  
       
       if (i == 5){
             var data= $.parseJSON($.ajax({
                        type: "GET",
                        url: "http://localhost:3000/runtime/getQuestions/" ,
                        dataType: "json",
                        async:false
                        
                }).responseText);

            j=0;
           questions =[]
            while ( j < data.length){

                            questions.push(data[j]);
                              //console.log(questions);
                            j++;
            }
            console.log(questions);
            i=0;
             
       }
        scoreText.text = "Score: "+score.toString();
      
        questionText.text = questions[i].q;

    }
    
    
    

    var Play = function(game){}
    Play.prototype = {
       
            preload: function(){
                game.load.spritesheet('runner', 'JungleAssetPack/Character/sprites/runSprite.png', 23, 36, 8);
                
                game.load.spritesheet("buttons", "newbuttons.png", 128,36);
                
                game.load.image('mountains', 'country-platform-files/layers/country-platform-back-resize.PNG');
                
                game.load.image('trees', 'country-platform-files/layers/country-platform-forest-resize.PNG');
                
                
                 game.load.image('trail', 'country-platform-files/layers/country-platform-resize.PNG');
                
                
                
                
            },
            create: function(){
                
                 var data= $.parseJSON($.ajax({
                        type: "GET",
                        url: "http://localhost:3000/runtime/getQuestions/" ,
                        dataType: "json",
                        async:false
                        
                }).responseText);
                
                while ( j < data.length){
                                
                                questions.push(data[j]);
                                  //console.log(questions);
                                j++;
                }
                console.log(questions);
             
                this.add.image(0,0, 'mountains');
                this.add.image(0,250, 'trees');
                this.add.image(0,300, 'trees');
                 this.add.image(0,360, 'trees');
                this.add.image(0,400, 'trail');
           
                game.stage.backgroundColor = "#8CAFE7";
                //Question location 
                questionText = game.add.text(200,75,questions[i].q,{
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
                
                
                 var runner = game.add.sprite(300, 540, 'runner');
                
                 var walk = runner.animations.add('walk');
                
                 runner.animations.play('walk', 20, true);
                
            }
      
    }
    
    
    var GameOver = function(game){}
	GameOver.prototype = {
        
         preload: function(){
                game.load.spritesheet('runner', 'JungleAssetPack/Character/sprites/runSprite.png', 23, 36, 8);
                
                game.load.spritesheet("buttons", "newbuttons.png", 128,36);
                
                game.load.image('mountains', 'country-platform-files/layers/country-platform-back-resize.PNG');
                
                game.load.image('trees', 'country-platform-files/layers/country-platform-forest-resize.PNG');
                
                game.load.spritesheet("gameOButton", "restartLeadButton.PNG", 128,36);
                
                game.load.image('trail', 'country-platform-files/layers/country-platform-resize.PNG');
                
                
            },
	     create: function(){
              this.add.image(0,0, 'mountains');
                this.add.image(0,250, 'trees');
                this.add.image(0,300, 'trees');
                 this.add.image(0,360, 'trees');
                this.add.image(0,400, 'trail');
           
	          var style = {
	               font: "32px Monospace",
	               fill: "#000000",
	               align: "center"
	          }
	          var text = game.add.text(game.width / 2, game.height / 2, "Game Over\nYour score: " + score.toString() +"\n Tap the screen to restart", style);
	          text.anchor.set(0.5);
             
              //console.log(url);
             console.log(window.localStorage);
             if(window.localStorage.hasOwnProperty("ngStorage-currentUser")){
                 
                $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/runtime/sendScore/"+JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username+"/" +score ,
                        async:true,
                        success: function(){
                            console.log("Send score success");

                        }
                  });
             }
                
			   game.input.onDown.add(this.restartGame, this);	
               game.stage.backgroundColor = "#8CAFE7";
	     },
    		restartGame: function(){
          	score = 0;
            life = 3;
          	game.state.start("Play");  	
     	},
        showLeader: function(){
            
        }
        
	} 
    
    
    
    game.state.add("Play", Play);
    game.state.add("GameOver", GameOver );
    game.state.start("Play");
    

}
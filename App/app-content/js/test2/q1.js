var correctCards = 0;

$('.T2Q1 #successMessage').hide();
  $('.T2Q1 #successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
} );
//$( init );

function initTest2Q1() {

  
  $('.T2Q1 #successMessage').hide();

  // Reset the game
  correctCards = 0;
  $('.T2Q1 #cardPile').html( '' );
  //$('#cardSlots').html( '' );

  var eachRow = document.getElementsByClassName('row');
//console.log(eachRow.size);
  for (var x=0; x<5; x++){
    console.log("enter");
    eachRow[x].innerHTML = "";
  }

  // Create the pile of shuffled cards
  var key = [ [1, 0, 1], [1, 0, 1], [0, 1, 1], [0, 1, 1], [1, 0, 1]];
  var terms = ['Accessing data beyond the array bounds', 'Uninitialized memory', 'Infinite loop', 'Compile error: type mismatch','Does not contain an error', 'Memory leak', 'Math error (incorrect answer)', 'Syntax error'];

  for ( var i=0; i<5; i++ ) {
    $('<div class=greenPile> O(1) </div>').data( 'number', 1 ).attr( 'id', 'card1' ).appendTo( '.T2Q1 #cardPile' ).draggable( {
      
      stack: '.T2Q1 #cardPile div',
      cursor: 'move',
      revert: true
    } );

    $('<div class=greenPile> O(1) </div>').data( 'number', 1 ).attr( 'id', 'card1' ).appendTo( '.T2Q1 #cardPile' ).draggable( {
      
      stack: '.T2Q1 #cardPile div',
      cursor: 'move',
      revert: true
    } );

    $('<div class=redPile> O(n) </div>').data( 'number', 0 ).attr( 'id', 'card1' ).appendTo( '.T2Q1 #cardPile' ).draggable( {
      
      stack: '.T2Q1 #cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  


/*<div class='row'>
        <div class='slot'>
        
        </div>
        <div class='slot'>
          
        </div >

        <div class='slotLast'>
          
        </div >
      </div>*/


  // Create the card slots
  for ( var i=1; i<=5; i++ ) {

    var row=  document.getElementsByClassName("row")[i-1];
    console.log(row);

    $('<div class="slot"></div>').data( 'number', key[i-1][0] ).appendTo( row ).droppable( {
      accept: '.T2Q1 #cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDropT1Q1
    });

    $('<div class="slot"></div>').data( 'number', key[i-1][1] ).appendTo( row ).droppable( {
      accept: '.T2Q1 #cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDropT1Q1
    });

    $('<div class="slotLast"></div>').data( 'number', key[i-1][2] ).appendTo( row ).droppable( {
      accept: '.T2Q1 #cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDropT1Q1
    });
    /*$('<div class="row"> </div>').data( 'number', i ).appendTo( '#boxes' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );*/
  }

  var pileDiv = document.getElementById("cardPile");
  var slotDiv = document.getElementById("cardSlots");

  console.log(pileDiv);

  $(pileDiv).fadeIn("slow");
  $(slotDiv).fadeIn("slow");


}

function handleCardDropT1Q1( event, ui ) {
  console.log('enter');
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
    console.log(correctCards);
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 1 ) {

    var contentDiv = document.getElementById("content");
    var showPosition = contentDiv.offsetTop +50;
    showPosition += 'px';


    $('.T2Q1 #successMessage').show();
    $('.T2Q1 #successMessage').animate( {
      
      top: showPosition,
      width: '450px',
      height: '150px',
      opacity: 1
    } );
  }

}


function nextQuestion(HideName, ShowName){
  //console.log(name);
  var hideName = document.getElementById(HideName);
  $(hideName).hide();

  var showName = document.getElementById(ShowName);
  $(showName).show();


}

var correctCards = 0;
//$( init );

$('#successMessage').hide();
$('#successMessage').css( {
  left: '580px',
  top: '250px',
  width: 0,
  height: 0
} );


function initT3Q1() {


  // Hide the success message
  
  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  //$('#cardSlots').html( '' );

  var eachRow = document.getElementsByClassName('row');
console.log(eachRow.size);
  for (var x=0; x<5; x++){
    console.log("enter");
    eachRow[x].innerHTML = "";
  }

  // Create the pile of shuffled cards
  var key = [3, 0, 4, 6, -1, -1, -1];
  var terms = ['Depth-first search', 'Breadth-first search', 'Pre-order traversal' ,'In-order traversal', 'Post-order traversal','Narrower and taller', 'Wider and shorter'];


   /* a) depth-first search
d) in-order traversal
g) wider and shorter
b) breadth-first search
e) post-order traversal
c) pre-order traversal
f) narrower and taller*/

  for ( var i=0; i<7; i++ ) {
    $('<div class=greenPile>' + terms[i] +'</div>').data( 'number', i ).attr( 'id', 'card1' ).appendTo( '#cardPile' ).draggable( {
      
      stack: '#cardPile div',
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
  for ( var i=1; i<=4; i++ ) {

    var row=  document.getElementsByClassName("row")[i-1];
    console.log(row);

    $('<div class="slot"></div>').data( 'number', key[i-1] ).appendTo( row ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    });

  

    
    /*$('<div class="row"> </div>').data( 'number', i ).appendTo( '#boxes' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );*/
  }

}

function handleCardDrop( event, ui ) {
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
  } 
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 8 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

}
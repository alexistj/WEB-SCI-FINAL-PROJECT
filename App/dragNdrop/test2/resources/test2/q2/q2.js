
var correctCards = 0;
$( init );

function init() {


  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
  var key = [ 2,0,1,3,5,4];

  /*A ) use of uninitialized memory
B ) mismatched new/delete/delete[]
C ) memory leak
D ) already freed memory
E ) no memory error
F ) invalid write*/
  var terms = ['Use of uninitialized memory', 'Mismatched new/delete/delete[]', 'Memory leak', 'Already freed memory','No memory error', 'Invalid write'];

  for ( var i=0; i<6; i++ ) {
    $('<div>' + terms[i] + '</div>').data( 'number', key[i] ).attr( 'id', 'card'+key[i] ).appendTo( '#cardPile' ).draggable( {
      
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }


  // Create the card slots
  for ( var i=0; i<6; i++ ) {
    $('<div><img src="resources/test2/q2/q' + (i+1)+'.png">' + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
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

  if ( correctCards == 6 ) {
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

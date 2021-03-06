var correctCards = 0;

$('#successMessage').hide();
$('#successMessage').css( {
  left: '580px',
  top: '250px',
  width: 0,
  height: 0
} );


//$( init );

function init() {

 // document.getElementById('loadReset').innerHTML = '<i class="fa fa-spinner fa-spin"></i>Loading';

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );


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
  var numbers = [ 8,7,4,2,1,3,5,6];
  var terms = ['Accessing data beyond the array bounds', 'Uninitialized memory', 'Infinite loop', 'Compile error: type mismatch','Does not contain an error', 'Memory leak', 'Math error (incorrect answer)', 'Syntax error'];

  for ( var i=0; i<8; i++ ) {
    $('<div>' + terms[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }


  // Create the card slots
  for ( var i=1; i<=8; i++ ) {
    $('<div><img src="app-content/img/test1/q1/num' + i+'.png">' + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

  var pileDiv = document.getElementById("cardPile");
  var slotDiv = document.getElementById("cardSlots");

  //console.log(pileDiv);

  $(pileDiv).fadeIn("slow");
  $(slotDiv).fadeIn("slow");

  //document.getElementById('loadReset').innerHTML = 'Reset';

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
    var contentDiv = document.getElementById("content");
    var showPosition = contentDiv.offsetTop +50;
    showPosition += 'px';

    $('#successMessage').show();
    $('#successMessage').animate( {
      
      top: showPosition,
      width: '450px',
      height: '150px',
      opacity: 1
    } );
  }

}

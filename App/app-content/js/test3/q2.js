var correctCards = 0;

$('#T3Q2 #successMessage').hide();

function initT3Q2() {


  // Hide the success message
  $('#T3Q2 #successMessage').hide();
  

  // Reset the game
  correctCards = 0;
  $('#T3Q2 #cardPile').html( '' );
  //$('#cardSlots').html( '' );

  var eachRow = document.getElementsByClassName('row');
  //console.log(eachRow.size);


  for (var x=0; x<3; x++){
    //console.log("enter");
    eachRow[x].innerHTML = "";
  }

  // Create the pile of shuffled cards
  var key = [3, 1, 5, 0, 2, 4, 6];
  var terms = ['this', 'is', 'a' ,'balanced', 'tree','I', 'think'];


   /* a) depth-first search
d) in-order traversal
g) wider and shorter
b) breadth-first search
e) post-order traversal
c) pre-order traversal
f) narrower and taller*/

  for ( var i=0; i<7; i++ ) {
    $('<div class=greenPile>' + terms[i] +'</div>').data( 'number', i ).attr( 'id', 'card1' ).appendTo( '#T3Q2 #cardPile' ).draggable( {
      
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
var keyIndex = 0;


  // Create the card slots
  for ( var i=0; i<3; i++ ) {
console.log('here');
    var row = $('#T3Q2 .row');
    //console.log(row1);

    console.log('here');
    //var row=  document.getElementsByClassName("row")[i];

    console.log('one');
    console.log(row);


    if (i==0){

      $('<div class="slotLast"></div>').data( 'number', key[keyIndex] ).appendTo( row[i] ).droppable( {
        accept: '#T3Q2 #cardPile div',
        hoverClass: 'hovered',
        drop: handleCardDropT3Q2
      });
      keyIndex++;

    } else {

      for (var z=0; z<(2*i); z++){

        if (z == (2*i) -1) {
          console.log(keyIndex);
          $('<div class="slotLast"></div>').data( 'number', key[keyIndex] ).appendTo( row[i] ).droppable( {
            accept: '#T3Q2 #cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDropT3Q2
          });
          keyIndex++;

        } else if (i==1) {

          $('<div class="slotLevel2"></div>').data( 'number', key[keyIndex] ).appendTo( row[i] ).droppable( {
            accept: '#T3Q2 #cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDropT3Q2
          });
          keyIndex++;

        } else {
          console.log(keyIndex);

          $('<div class="slot"></div>').data( 'number', key[keyIndex] ).appendTo( row[i] ).droppable( {
            accept: '#T3Q2 #cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDropT3Q2
          });
          keyIndex++;
        }

        

      }

    }

    var row2=  document.getElementsByClassName("row")[i];

     console.log('two');
    console.log(row2);


    var pileDiv = document.getElementById("cardPile");
    var slotDiv = document.getElementById("cardSlots");

    //console.log(pileDiv);
    //pileDiv.style.display = 'block';
    $('#T3Q2 #cardPile').fadeIn("slow");
    $('#T3Q2 #cardSlots').fadeIn("slow");



    

    

  

    
    /*$('<div class="row"> </div>').data( 'number', i ).appendTo( '#boxes' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );*/
  }

}

function handleCardDropT3Q2( event, ui ) {
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

  if ( correctCards == 7 ) {
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

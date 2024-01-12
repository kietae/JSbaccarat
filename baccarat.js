
//Tell the library which element to use for the table
cards.init({table:'#card-table', type:STANDARD});

//Create a new deck of cards
deck = new cards.Deck();
//By default it's in the middle of the container, put it slightly to the side
deck.x -= 150;
deck.y += 150;

//cards.all contains all cards, put them all in the deck
deck.addCards(cards.all);
//No animation here, just get the deck onto the table.
deck.render({immediate:true});

//Now lets create a couple of hands, one face down, one face up.
playerHand = new cards.Hand({faceUp:true, x:190, y:60});
bankerHand = new cards.Hand({faceUp:true, x:410, y:60});



//Let's deal when the Deal button is pressed:
$('#deal').click(function() {
	//Deck has a built in method to deal to hands.
	$('#deal').hide();
	
	playerHand.addCard(deck.topCard());
	bankerHand.addCard(deck.topCard());
	playerHand.addCard(deck.topCard());
	bankerHand.addCard(deck.topCard());
	playerHand.render();
	bankerHand.render();
	
	p1 = playerHand[0].rank < 10 ? playerHand[0].rank : 0
	p2 = playerHand[1].rank < 10 ? playerHand[1].rank : 0
	
	b1 = bankerHand[0].rank < 10 ? bankerHand[0].rank : 0
	b2 = bankerHand[1].rank < 10 ? bankerHand[1].rank : 0
	
	pv = (p1 + p2)%10
	bv = (b1 + b2)%10

	if (playerHand[0].rank === playerHand[1].rank) {
		playerPair.innerText = "Player Pair"}
	if (bankerHand[0].rank === bankerHand[1].rank) {
		bankerPair.innerText = "Banker Pair"}
	
	var end = function(p,b) {
		if (p>b) { 
			re = "Player " + p + " Win!"}
		else if (p<b){
			re = "Banker " + b + " Win!"}
		else {
			re = p + " Tie!"
		}
		return re
	}

	if ((pv > 7) || (bv > 7) || ((pv > 5) && (bv > 5))) {
		res = end(pv,bv);}
	else if (pv<6) {	
		playerHand.addCard(deck.topCard());
		playerHand[2].rotate(90);
		playerHand[2].moveTo(190,160);
		p3 = playerHand[2].rank < 10 ? playerHand[2].rank : 0
		pv += p3
		pv = pv%10

		if (((bv === 6) && ([6,7].includes(p3))) ||
		    ((bv === 5) && ([4,5,6,7].includes(p3))) ||
		    ((bv === 4) && ([2,3,4,5,6,7].includes(p3))) ||
		    ((bv === 3) && ([0,1,2,3,4,5,6,7,9].includes(p3))) ||
			(bv < 3)){
			bankerHand.addCard(deck.topCard());
			bankerHand[2].rotate(90);
			bankerHand[2].moveTo(410,160);
			b3 = bankerHand[2].rank < 10 ? bankerHand[2].rank : 0
			bv += b3
			bv = bv%10
			res = end(pv,bv)
		   }
		else { res = end(pv,bv)}
		}
	else if (bv<6) {
		bankerHand.addCard(deck.topCard());
		bankerHand[2].rotate(90);
		bankerHand[2].moveTo(410,160);
		b3 = bankerHand[2].rank < 10 ? bankerHand[2].rank : 0
		bv += b3
		bv = bv%10
		res = end(pv,bv)

	}


	player.innerText = pv
	banker.innerText = bv
	result.innerText = res
	
});



// //When you click on the top card of a deck, a card is added
// //to your hand
// deck.click(function(card){
// 	if (card === deck.topCard()) {
// 		lowerhand.addCard(deck.topCard());
// 		lowerhand.render();
// 	}
// });

// //Finally, when you click a card in your hand, if it's
// //the same suit or rank as the top card of the discard pile
// //then it's added to it
// lowerhand.click(function(card){
// 	if (card.suit == discardPile.topCard().suit
// 		|| card.rank == discardPile.topCard().rank) {
// 		discardPile.addCard(card);
// 		discardPile.render();
// 		lowerhand.render();
// 	}
// });


// //So, that should give you some idea about how to render a card game.
// //Now you just need to write some logic around who can play when etc...
// //Good luck :)


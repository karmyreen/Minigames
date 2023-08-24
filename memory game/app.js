document.addEventListener('DOMContentLoaded',() => {

    const cardArray = [ // array of different items with their image source 
        {
            name: 'fries',
            img: 'images/fries.png',

        },
        {
            name: 'fries',
            img: 'images/fries.png',

        },
        {
            name: 'cheeseburger',
            img: 'images/chessburger.png',

        },
        {
            name: 'cheeseburger',
            img: 'images/chessburger.png',

        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png',

        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png',

        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png',

        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png',

        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png',

        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png',

        },
        {
            name: 'pizza',
            img: 'images/pizza.png',

        },
        {
            name: 'pizza',
            img: 'images/pizza.png',

        }
     
    ]


    cardArray.sort(() => 0.5 - Math.random())



    //create board

    const grid = document.querySelector('.grid')
    let resultDisplay= document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenID = []
    let cardsWon = []



    function createBoard(){
        for( let i = 0 ; i < cardArray.length; i++){
            const card = document.createElement('img'); 
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)

        }
    }




    
    // checks for match of two selected tiles 
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenID[0]
        const optionTwoId = cardsChosenID[1]
        
        if(optionOneId == optionTwoId) {
          cards[optionOneId].setAttribute('src', 'images/blank.png')
          cards[optionTwoId].setAttribute('src', 'images/blank.png')
          alert('You have clicked the same image!')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
          alert('You found a match')
          cards[optionOneId].setAttribute('src', 'images/white.png')
          cards[optionTwoId].setAttribute('src', 'images/white.png')
          cards[optionOneId].removeEventListener('click', flipCard)
          cards[optionTwoId].removeEventListener('click', flipCard)
          cardsWon.push(cardsChosen)
        } else {
          cards[optionOneId].setAttribute('src', 'images/blank.png')
          cards[optionTwoId].setAttribute('src', 'images/blank.png')
          alert('Sorry, try again')
        }
        cardsChosen = []
        cardsChosenID = []
        resultDisplay.textContent = cardsWon.length
        if  (cardsWon.length === cardArray.length/2) {
          resultDisplay.textContent = 'Congratulations! You found them all!'
        }
      }

   //flip your card
   function flipCard() {
        let cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenID.push(cardID)
        this.setAttribute('src', cardArray[cardID].img)
        if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
        }
    }



    
    createBoard()













}) 



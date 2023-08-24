
//ignore this file just a file for the showing of process on my end 




// TODO: we can also get the grid size from user
const GRID_WIDTH = 10
const GRID_HEIGHT = 20
const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT

// no need to type 200 divs :)
const grid = createGrid();
let squares = Array.from(grid.querySelectorAll('div'))
const startBtn = document.querySelector('.button')
const hamburgerBtn = document.querySelector('.toggler')
const menu = document.querySelector('.menu')
const span = document.getElementsByClassName('close')[0]
const scoreDisplay = document.querySelector('.score-display')
const linesDisplay = document.querySelector('.lines-score')
let currentIndex = 0

let currentRotation = 0
const width = 10
let score = 0
let lines = 0
let timerId
let nextRandom = 0
const colors = [
  'url(images/blue_block.png)',
  'url(images/pink_block.png)',
  'url(images/purple_block.png)',
  'url(images/peach_block.png)',
  'url(images/yellow_block.png)'
]


function createGrid() {
    // the main grid
    let grid = document.querySelector(".grid")
    for (let i = 0; i < GRID_SIZE; i++) {
        let gridElement = document.createElement("div")
        grid.appendChild(gridElement)
        
    
    }

  // set base of grid
    for (let i = 0; i < GRID_WIDTH; i++) {
        let gridElement = document.createElement("div")
        gridElement.setAttribute("class", "block3")
        grid.appendChild(gridElement)
    } 
    return grid;
  
}


//functions to keycodes 
function control(e){
    if(e.keyCode === 39){
        moveRight()

    }
    else if(e.keyCode === 38){
        rotate()
    }
    else if(e.keyCode === 37){
        moveLeft()
    }
    else if(e.keyCode === 39){
        moveDown()
    }
}
document.addEventListener('keydown', control)



//tetrominos 
const lTetromino = [
    [1, GRID_WIDTH+1, GRID_WIDTH*2 +1, 2],
    [GRID_WIDTH, GRID_WIDTH+1,GRID_WIDTH +2, GRID_WIDTH*2 +2 ],
    [1, GRID_WIDTH+1, GRID_WIDTH*2 +1,GRID_WIDTH*2 ],
    [GRID_WIDTH, GRID_WIDTH*2, GRID_WIDTH*2+1, GRID_WIDTH*2+2]

]
const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
]

const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
]

const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
]

const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
]


const theTetrominos = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]

//randomly select the tetrominos 
let random = Math.floor(math.random*theTetrominos.length)
//let curr roation equals 0 
let current = theTetrominos[random][currentRotation]

// move tetromino down 
let CurrentPosition = 4

 //draw shape
function draw(){

    current.forEach(index =>{
        squares[CurrentPosition + index].classList.add('block')
        
    })
}

// undraw shape
function undraw(){
    current.forEach(index =>{
        squares[CurrentPosition + index].classList.remove('block')
        

    })
    

}


// move down shape

function moveDown(){
    undraw()
    CurrentPosition = CurrentPosition += width
    draw()
    freeze()


}


// move left without hitting any shapes to the left 

function moveRight(){
    undraw()
    const AtRightEdge = current.some(index => (CurrentPosition + index) % width === width -1 )
    if(!AtRightEdge) CurrentPosition += 1 
    if (current.some(index => squares[CurrentPosition + index].classList.contains('block2'))){

        CurrentPosition -= 1 
    }
    draw()


}
function moveLeft(){
    undraw()
    const AtLeftEdge = current.some(index => (CurrentPosition + index) % width === 0)
    if(!AtLeftEdge) CurrentPosition -= 1 
    if (current.some(index => squares[CurrentPosition + index].classList.contains('block2'))){

        CurrentPosition += 1 
    }
    draw()


}

//rotation of tetromino 

function rotate(){
    undraw()
    currentRotation++
    if(currentRotation === current.length){
        currentRotation = 0 
    }
    current = theTetrominos[random][currentRotation]
    draw()


}
draw()


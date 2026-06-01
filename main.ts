namespace SpriteKind {
    export const Grid = SpriteKind.create()
}
// controls
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 3) {
        direction = 1
    }
})
// functions
function highScore (name: string, score: number) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Grid)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    info.setScore(0)
    for (let index = 0; index <= 2; index++) {
        if (score >= highScoreNums[index]) {
            highScoreNums.insertAt(index, score)
            highScoreNums.pop()
            console.logValue("Highscore#", highScoreNums)
            highScoreNames.insertAt(index, name)
            highScoreNames.pop()
            console.logValue("Highscorenames", highScoreNames)
            break;
        }
    }
    for (let index2 = 0; index2 <= 2; index2++) {
        game.splash("" + highScoreNames[index2] + " " + highScoreNums[index2])
    }
    game.splash("Play again?")
    start()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 4) {
        direction = 2
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 2) {
        direction = 4
    }
})
function createFood () {
    food = sprites.create(assets.image`Food`, SpriteKind.Food)
    food.setPosition(randint(1, 10) * 15 - 2, randint(1, 8) * 15 - 7)
}
function addSnake () {
    x = snakeList[0].x
    y = snakeList[0].y
    snakeList.unshift(sprites.create(assets.image`snake`, SpriteKind.Player))
    if (direction == 1) {
        snakeList[0].setPosition(x, y - 15)
    } else if (direction == 3) {
        snakeList[0].setPosition(x, y + 15)
    } else if (direction == 4) {
        snakeList[0].setPosition(x + 15, y)
    } else {
        snakeList[0].setPosition(x - 15, y)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 1) {
        direction = 3
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    game.splash("Game Over")
    highScore(game.askForString("Username"), info.score())
})
// overlaps
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (sprite == snakeList[0]) {
        sprites.destroy(otherSprite)
        info.changeScoreBy(1)
        addSnake()
        createFood()
    }
})
function start () {
    grid = sprites.create(assets.image`grid`, SpriteKind.Grid)
    border = sprites.create(assets.image`border`, SpriteKind.Enemy)
    snakeList = [sprites.create(assets.image`snake`, SpriteKind.Player)]
    snakeList[0].setPosition(88, 23)
    direction = 2
    createFood()
}
function move (x: number, y: number) {
    i = snakeList.length - 1
    if (direction == 1) {
        snakeList[i].setPosition(x, y - 15)
    } else if (direction == 3) {
        snakeList[i].setPosition(x, y + 15)
    } else if (direction == 4) {
        snakeList[i].setPosition(x + 15, y)
    } else {
        snakeList[i].setPosition(x - 15, y)
    }
    snakeList.unshift(snakeList.pop())
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.splash("Game Over")
    highScore(game.askForString("Username"), info.score())
})
let i = 0
let border: Sprite = null
let grid: Sprite = null
let y = 0
let snakeList: Sprite[] = []
let x = 0
let food: Sprite = null
let direction = 0
let highScoreNames: string[] = []
let highScoreNums: number[] = []
let snakei = 0
highScoreNums = [0, 0, 0]
highScoreNames = ["a", "b", "c"]
start()
game.splash("Use arrow keys to change directions of the snake")
game.splash("Collect apples and avoid the walls")
game.splash("be careful not to hit your tail")
game.splash("Good Luck!")
// Game update
game.onUpdateInterval(600, function () {
    move(snakeList[0].x, snakeList[0].y)
    console.log(direction)
})

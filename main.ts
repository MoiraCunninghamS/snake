namespace SpriteKind {
    export const Grid = SpriteKind.create()
}
namespace SpriteKind {
    export const Face = SpriteKind.create()
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
    sprites.destroyAllSpritesOfKind(SpriteKind.Face)
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
    for (let i = 0; i <= snakeList.length - 1 - 1; i++) {
        if (food.x == snakeList[i].x && food.y == snakeList[i].y) {
            sprites.destroy(food)
        }
    }
}
function addSnake () {
    x = snakeList[snakeList.length - 1].x
    y = snakeList[snakeList.length - 1].y
    snakeList.push(sprites.create(assets.image`snake`, SpriteKind.Player))
    j = snakeList.length - 1
    if (snakeList.length == 2) {
        if (direction == 1) {
            snakeList[j].setPosition(x, y + 15)
        } else if (direction == 3) {
            snakeList[j].setPosition(x, y - 15)
        } else if (direction == 4) {
            snakeList[j].setPosition(x - 15, y)
        } else {
            snakeList[j].setPosition(x + 15, y)
        }
    } else {
        snakeList[j].setPosition(-20, -20)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 1) {
        direction = 3
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprite == snakeList[0] || otherSprite == snakeList[0]) {
        game.splash("Game Over")
        highScore(game.askForString("Username"), info.score())
    }
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
    face = sprites.create(assets.image`snake_head_With_Tongue`, SpriteKind.Face)
    animation.runImageAnimation(face, [assets.image`snake_head_With_Tongue`, assets.image`snake_head`], 500, true)
    direction = 2
    createFood()
}
function move (x: number, y: number) {
    k = snakeList.length - 1
    if (direction == 1) {
        snakeList[k].setPosition(x, y - 15)
    } else if (direction == 3) {
        snakeList[k].setPosition(x, y + 15)
    } else if (direction == 4) {
        snakeList[k].setPosition(x + 15, y)
    } else {
        snakeList[k].setPosition(x - 15, y)
    }
    snakeList.unshift(snakeList.pop())
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.splash("Game Over")
    highScore(game.askForString("Username"), info.score())
})
let k = 0
let border: Sprite = null
let grid: Sprite = null
let j = 0
let y = 0
let x = 0
let snakeList: Sprite[] = []
let food: Sprite = null
let direction = 0
let highScoreNames: string[] = []
let highScoreNums: number[] = []
let snakei = 0
let face: Sprite = null
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
game.onUpdate(function() {
    face.setPosition(snakeList[0].x, snakeList[0].y)
    face.z = 100
})
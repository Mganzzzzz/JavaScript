var log = function() {
    console.log.apply(console, arguments)
}
var c = document.querySelector("#myCanvas");
var ctx = c.getContext("2d");


//获取地图大小
var map = [c.height, c.width]

ctx.fillRect(0, 0, map[0], map[1]);
ctx.fillStyle="black";
//给画布编号
var mapBlocks = function(blockWidth,map) {
    var block = []
    var n = 0
    var num = map[0] * map[1] / 100
    for(var i = 0; i < map[0] / 10 ; i++) {
        for(var j = 0; j < map[1] /10; j++) {
            block[n] = [blockWidth * j, blockWidth * i]
            n += 1
        }
    }
    log(block[i])
    return block
}
var blocks = mapBlocks(10, map)
//数组转坐标
var blocksToXy = function(blocks, blockNumber, xOry) {
    var x = blocks[blockNumber][0]
    var y = blocks[blockNumber][1]
    if(xOry == 1) {
        return x
    } else {
        return y
    }
}

//留白指定方块
var eraser = function(blockNumber) {
    blockNumber--
    var x = blocksToXy(blocks, blockNumber, 1)
    var y = blocksToXy(blocks, blockNumber, 0)
    // if(clearMap) {
    //     ctx.fillRect(0, 0, map[0], map[1]);
    //     ctx.fillStyle="black";
    // }

    ctx.clearRect(x, y, 10, 10);
}
//填充指定方块
var fillPen = function(blockNumber) {
    blockNumber--
    var x = blocksToXy(blocks, blockNumber, 1)
    var y = blocksToXy(blocks, blockNumber, 0)
    ctx.fillRect(x, y, 10, 10);
    // ctx.clearRect(x, y, 10, 10);

}
var clearMap = function() {
    ctx.fillRect(0, 0, map[0], map[1]);
    ctx.fillStyle="black";
}
var drawsnake = function(snake) {
    for(var i = 0; i < snake.length; i++) {
        eraser(snake[i])
    }
}
//吃食物
var isEatFood = function(snake , len) {
    if(snake[len - 1] == putFood) {
        snake.push(putFood)
        putFood = createFood()
    }
}
//撞墙规则
var isOutWalls = function(snake , len) {
    // log('isOutWalls')
    var snakeHead = snake[len - 1]
    var snakeBody = snake[len - 2]
    // log('snakeHead -1', snakeHead -1)
    // log('snakeBody % 50', snakeBody % 50)
    //***********************出界规则 待修改***********************
    if((snakeHead -1) % 50 == 0 &&(snakeBody % 50) == 0) {
        //右出界
        // log('右出界')
        // log('snakeHead -1', snakeHead -1)
        // log('snakeBody % 50', snakeBody % 50)
        return false
    } else if((snakeHead % 50) == 0 && (snakeBody - 1) % 50 == 0) {
        //左出界
        // log('左出界')
        return false
    } else if(snakeHead <= 0) {
        //上下出界
        // log('上出界',snakeHead)
        snake[len - 1] += 2500
        return false
    } else if(snakeHead > 2500) {
        //上下出界
        // log('下出界', snakeHead)
        snake[len - 1] -= 2500
        // log('snakeHead',snakeHead)
        return false
    } else {
        return true
    }

}
//判断食物是否出现在蛇上
var isIn = function(array, a) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] == a) {
            return true
        }
    }
    return false
}
//随机数
var randomBlock = function() {
    max = 2500
    parseInt(Math.random()*(max+1),10)
    var foodBlock =  Math.floor(Math.random()*(max+1)) + 1
    return foodBlock
}
//
var isHitself = function(snake) {
    var len = snake.length
    var snakeHead = snake[len - 1]
    for(var i = 0; i < len - 1; i++) {
        if(snakeHead == snake[i]) {
            return false
        }
    }

    return true
}
//投食
var createFood = function(snake) {
    var max = 2500
    // log(snake)
    // var snakeContainer = []
    var foodBlock = randomBlock()
    // log('first foodBlock', foodBlock)

    for(var j = 0; j < snake.length; j++) {
        if(foodBlock == snake[j]) {
            foodBlock = randomBlock()
        }

    }
    // while(isIn(snakeContainer, foodBlock) != true) {
    //     var foodBlock = randomBlock()
    // }
    // log('foodBlock', foodBlock)
    eraser(foodBlock)
    return foodBlock
}
//运动计算
var calculateNextSnake = function(snake) {
    // log("moveSnake", snake)
    // log('clonedsnake2', snake)
    var len = snake.length
    drawsnake(snake)
    // log('drawsnake',snake)
    // if(snake)

    var j = 0
    var toBeClean = snake[0]
    while(j < len - 1) {
        snake[j] = snake[j + 1]
        j++
    }

    snake[len - 1] += direction
    //是否碰到墙壁
    var r = isOutWalls(snake , len)
    //是否吃到食物
    // log('putFood', putFood)
    if(snake[len - 1] == putFood) {
        // log('吃到食物')
        document.querySelector('#eat').play()
        var addTail = snake[0] - direction
        var tempSnake = []
        tempSnake.push(addTail)
        for(var s = 0; s < snake.length; s++) {
            tempSnake.push(snake[s])
        }
        // log('tempSnake')
        // log('clonedsnake', clonedsnake)
        clonedsnake = tempSnake
        putFood = createFood(snake)

    }

    //是否碰到自己
    var h = isHitself(snake)
    // log('isHitself(snake)', snake)


    // log('isOutWalls', r)
    if(!r || !h) {
        //撞到墙壁 重置贪吃蛇
        // log('撞到墙壁')
        // resetSnake()
        stopSnake(snakeSwitch)
        // log(clearInterval(snakeSwitch))

        printSentences(1068, 'Game Over')
        //插入重来按钮
        insertButton('重玩', 'reset')
        document.querySelector('#endGame').play()
        clickSound('reset','mouseClick')
        document.querySelector('#reset').addEventListener('click', function() {
            document.querySelector('#reset').remove()
            direction = 1
            testsnake2 = [1, 2, 3, 4]
            snakeSwitch = moveSnake(testsnake2)
            ctx.fillRect(0, 0, map[0], map[1]);
            ctx.fillStyle="black";
            putFood = createFood(testsnake2)

        })
    }
    clearTail(toBeClean)
}

//清除尾部
var clearTail = function(block) {

    // log('toBeClean' , block)
    fillPen(block)
}

//写字
var printSentences = function (blockNumber, string) {
    var ctx2 = c.getContext("2d");
    ctx2.font="30px Georgia";
    var x = blocksToXy(blocks, blockNumber, 1)
    var y = blocksToXy(blocks, blockNumber, 0)
    ctx2.fillStyle="red";
    ctx2.fillText(string, x, y);

    ctx2.font="10px Verdana";
    // 创建渐变
    // var gradient=ctx2.createLinearGradient(0,0,c.width,0);
    // gradient.addColorStop("0","magenta");
    // gradient.addColorStop("0.5","blue");
    // gradient.addColorStop("1.0","red");
    // 用渐变填色
    // ctx2.fillStyle=gradient;

    ctx2.fillText("Coded by Mganz", x + 30, y + 30);
    ctx2.fillStyle="black";
}
//插入音乐
var insertMusic = function() {

}

//插入图片
var insertImg = function(url, id) {
    var body = document.querySelector('.interface')
    var t = `<img id=${id} src=${url}>`
    body.insertAdjacentHTML('beforeend', t);
}
//插入按钮
var insertButton = function(name, id) {
    var body = document.querySelector('.interface')
    var t = `<button type="button" id=${id}>${name}</button>`
    body.insertAdjacentHTML('beforeend', t);
}
//绑定按钮事件
var addButtonEvent = function(button, buttonFunction) {
    // var button = document.querySelector(id)
    button.addEventListener('click', buttonFunction)
}

//重置
var resetSnake = function() {
    //清除按钮
    document.querySelector('button').remove()
    //清除图片
    document.querySelector('img').remove()
    //清除文字
    document.querySelector('img').remove()

    //清除蛇
    ctx.fillRect(0, 0, map[0], map[1]);

    ctx.fillStyle="black";
    testsnake2 = [1, 2, 3, 4]
    direction = 1
    snakeSwitch = moveSnake(testsnake2)
}
//添加声音
var clickSound = function(buttonId, soundStyle) {
    var button = document.querySelector('#'+ buttonId)
    button.addEventListener('click', function() {
        document.querySelector('#'+ soundStyle).play()
    })
}
//停止
var stopSnake = function(snakeSwitch) {
    log('stopSnake')
    clearInterval(snakeSwitch)
}
//运动
var moveSnake = function(snake) {
    // log('clonedsnake', clonedsnake)
    clonedsnake = snake.slice(0)
    // log('clonedsnake1', clonedsnake)
    // log('clonedsnake', clonedsnake)
    var mainSnake = setInterval(function() {
        calculateNextSnake(clonedsnake)
    }, 100  )
    return mainSnake
}

//方向控制
window.document.onkeydown =  function(evt) {
    evt = (evt) ? evt : window.event
    if(evt.keyCode) {
          if(evt.keyCode == 37 && direction != 1) {
             // keycode 37 = Left
             direction = -1
             log('Left')
         } else if(evt.keyCode == 38 && direction != 50) {
             // keycode 38 = Up
             direction = -50
             log('Up')
         } else if(evt.keyCode == 39 && direction != -1) {
             // keycode 39 = Right
             direction = 1
             log('Right')
         } else if(evt.keyCode == 40 && direction != -50) {
             // keycode 40 = Down
             direction = 50
             log('Down')
         }
    }
}

//初始化

//载入图片
var url = 'init.png'
var id = 'init'
insertImg(url, id)
//载入音乐
insertMusic()
//载入按钮
insertButton('开始', 'start')
clickSound('start','mouseClick')
//按下按钮开始游戏移除图片和按钮
var snakeSwitch
var testsnake2 = [1, 2, 3, 4]
document.querySelector('#start').addEventListener('click', function() {
    document.querySelector('#init').remove()
    document.querySelector('#start').remove()
    putFood = createFood(testsnake2)

    snakeSwitch = moveSnake(testsnake2)

})



// initGame()
var direction = 1
var testsnake2 = [1, 2, 3, 4]

import Food from "./Food"
import ScorePanel from "./ScorePanel"
import Snake from "./Snake"

// 游戏控制器，控制其他的类
class GameControl{
  // 定义三个属性蛇、食物、积分牌
  snake:Snake
  food:Food
  scorePanel:ScorePanel
  // 创建一个属性用来记录游戏是否结束
  isLive:boolean = true
  constructor(){
    // 初始化三个属性蛇、食物、积分牌
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    // 调用初始化游戏方法开始游戏
    this.init()
  }

  // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction:string = ''


  // 游戏的初始化方法，调用后游戏即开始
  init(){
    // 绑定键盘按下的事件
    document.addEventListener('keydown',this.keydownHandler.bind(this))
    // 使蛇跑起来
    this.run()
  }

  // 创建一个键盘按下的响应函数
  keydownHandler(event:KeyboardEvent){
    // 修改direction属性
    this.direction = event.key
  }
  // 创建一个控制蛇移动的方法
  run(){
    // 根据方向（this.direction）来使蛇的位置改变
    /* 
    向上 top 减少
    向下 top 增加
    向左 left 减少
    向右 left 增加 
    */
    // 获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y
    // 根据方向修改蛇的坐标
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y-=10
        break;
      case 'ArrowDown':
      case 'Down':
        Y+=10
        break;
      case 'ArrowLeft':
      case 'Left':
        X-=10
        break;
      case 'ArrowRight':
      case 'Right':
        X+=10
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X,Y)
      
    // 修改蛇的X和Y值
    try {
      this.snake.X= X
      this.snake.Y= Y
    } catch (e:any) {
      // 进入catch，说明出现了异常，游戏结束，弹出一个提示信息
      alert(e.message)
      // 将isLive设置为false
      this.isLive = false
    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30)
  }

  // 定义一个方法，用来检查蛇是否吃到食物，吃到食物就让食物重置，分数增加，蛇身体增加一节
  checkEat(X:number,Y:number){
    if(X===this.food.X && Y===this.food.Y){
      // console.log('吃到食物了！')
      // 食物的位置要进行重置
      this.food.change(this.snake.bodies)
      // 分数增加
      this.scorePanel.addScore()
      // 蛇要增加一节
      this.snake.addBody()
    }
  }

}

export default GameControl
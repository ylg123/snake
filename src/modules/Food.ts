// 定义食物类Food
class Food{
  // 定义一个属性表示食物所对应的元素
  element:HTMLElement
  constructor(){
    // 获取页面中的food元素并赋值给element
    this.element = document.getElementById('food')!
  }
  // 定义一个获取食物x轴坐标的方法
  get X(){
    return this.element.offsetLeft
  }
  // 定义一个获取食物y轴坐标的方法
  get Y(){
    return this.element.offsetTop
  }
  // 修改食物的位置
  change(snakeBody:HTMLCollection){
    // 生成一个随机的位置
    // 食物的位置最小是0，最大是290
    // 蛇移动一次就是一格，一格的大小是10，所有就要求食物的位置的left和top值是10的倍数
    let top = Math.round(Math.random()*29)*10
    let left = Math.round(Math.random()*29)*10
    // 食物位置不能出现在蛇身上
    for(let i=0;i<snakeBody.length;i++){
      if((snakeBody[i] as HTMLElement).offsetLeft!==left&&(snakeBody[i] as HTMLElement).offsetTop!==top){
        // 生成一个随机的位置
        this.element.style.left = left+'px'
        this.element.style.top = top+'px'
      }
    }
  }
}

export default Food
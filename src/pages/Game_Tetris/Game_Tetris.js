
var chequer = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var chequerCurrent = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


var colour = [0xff928f8c,0xff01f0f1,0xff0101f0,0xffefa000,0xfff0f001,0xff00f000,0xffa000f1,0xfff00100]
var Tetromino = [
    [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ],
    [ [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0] ],
    [ [2, 2, 0, 0], [2, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0] ],
    [ [3, 0, 0, 0], [3, 0, 0, 0], [3, 3, 0, 0], [0, 0, 0, 0] ],
    [ [4, 4, 0, 0], [4, 4, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ],
    [ [5, 0, 0, 0], [5, 5, 0, 0], [0, 5, 0, 0], [0, 0, 0, 0] ],
    [ [6, 0, 0, 0], [6, 6, 0, 0], [6, 0, 0, 0], [0, 0, 0, 0] ],
    [ [0, 7, 0, 0], [7, 7, 0, 0], [7, 0, 0, 0], [0, 0, 0, 0] ]
];

var nextTetromino = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var currentTetromino = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

chessboard = {
    wide:10,
    high:20,
}

Page({
    appearPosition:[4,20],
    currentPosition:[4,20],
    // 去除全为零的行和列
    reduceMatrix:function (data) {
        var cols = data[0].reduce(function(res, v, i){
            if (v || data.some(function(arr) { return !!arr[i];})) res.push(i);
            return res;
        }, []);
        return data.filter(function(arr) { return arr.some(function(v) { return !!v;});}).map(function(arr) {return cols.map(function(i) { return arr[i];});});
    },
    /**
     * 旋转方块 
     * @param {*} data 
     * @param {*} number 
     * @returns 
     */
    rotateMatrix:function (data , number) {
        var rotateData = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        var x = data[0].length;
        var y = data.length;
        switch(number)
        {
            case 0:
                rotateData = data;
                break;
            case 1:
                for (var i = 0; i < x; i++) {
                    for (var j = 0; j < y; j++) {
                        rotateData[i][j] = data[j][x-1-i];
                    }
                }
                break;
            case 2:
                for (var i = 0; i < x; i++) {
                    for (var j = 0; j < y; j++) {
                        rotateData[i][j] = data[y-1-j][x-1-i];
                    }
                }
                break;
            case 3:
                for (var i = 0; i < x; i++) {
                    for (var j = 0; j < y; j++) {
                        rotateData[i][j] = data[y-1-j][i];
                    }
                }
                break;
            default:
        }
        
        // console.log(rotateData)
        
        return this.reduceMatrix(rotateData);
    },
    // 显示下一个要出现的方块
    nextTetrominoDisplay: function() {
        var num = Math.floor(Math.random()*6)+1;
        var arr = this.rotateMatrix(Tetromino[num],Math.floor(Math.random()*4))
        // console.log(currentTetromino);
        var data = {};
        for (var i = 0; i < currentTetromino.length; i++) {
            for (var j = 0; j < currentTetromino[i].length; j++) {
                if(currentTetromino[i][j])
                    data['nextChequer' + i + j] = {background:colour[0]};
            }
        }
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if(arr[i][j])
                    data['nextChequer' + i + j] = {background:colour[arr[i][j]]};
            }
        }
        this.setData(data);
        return arr
    },
    /**
     * 填充位置的颜色       // TODO 有优化的空间，减少颜色的绘制 需要两个的合并
     * @param {*} position 需要填充左下角的位置
     * @param {*} matrix 填充的方块
     * @param {*} flag 填充还是清空
     */
    fillColor :function(position,matrix,flag)
    {
        //Position [x1,y1] matrix [x2,y2]
        var data = {};
        var wide, high;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                wide = position[0] + i;
                high = position[1] + j;
                if(matrix[i][j] &&  wide < chessboard.wide && high < chessboard.high){
                    if(flag){
                        data['chequer' + wide + high] = {background:colour[matrix[i][j]]};
                        // chequerCurrent[wide][high] = matrix[i][j] // 这里不用赋值，浪费，需要在碰到之后赋值
                    }
                    else{
                        data['chequer' + wide + high] = {background:colour[0]};
                    }
                }
            }
        }
        this.setData(data);
    },
    /**
     * 填充方格，占位，被填充过的方格就不可以移动到这里了
     * @param {*} position 需要填充左下角的位置
     * @param {*} matrix 填充的方块
     */
    fillBlock : function(position,matrix) {
        var wide, high;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                wide = position[0] + i;
                high = position[1] + j;
                if(matrix[i][j] &&  wide < chessboard.wide && high < chessboard.high){
                    chequerCurrent[wide][high] = matrix[i][j] 
                }
            }
        }
    },
    /**
     * //TODO 这里写了判断哪一行要删除
     * @param {*} position 
     * @param {*} matrix 
     */
    whetherDeleteRow : function(position,matrix) {
        var x = matrix.length;
        var y = matrix[0].length;
        
        console.log("position[1]:"+position[1])
        for (var i = 0; i < y; i++) {
            for (var j = 0; j < chessboard.wide; j++) {
                if(chequerCurrent[j][position[1] + i] == 0)
                    break;
                if(j == (chessboard.wide - 1)){
                    // 这里要去删除行
                    console.log("Delete:" + position[1] + i)
                }
            }
        }
    },
    // 显示下一个位置的颜色
    // 判断一个方块下一个位置是否结束
    /**  
     * 方向 上下左右 0123
     */
    blockEnd:function(matrix,direction){
        var position = [].concat(this.currentPosition);
        // console.log(position)
        // for (var index = 0; index < this.currentPosition.length; index++) {
        //     position[index] = this.currentPosition[index];
        // }
        switch (direction) {
            case 0:
                position[1]++;
                break;
            case 1:
                position[1]--;
                if(position[1]<0)
                    return false
                break;
            case 2:
                position[0]--;
                if(position[0]<0)
                    return false
                break;
            case 3:
                position[0]++;
                break;
        }
        var wide, high;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                wide = position[0] + i;
                high = position[1] + j;
                if(matrix[i][j] &&  wide < chessboard.wide && high < chessboard.high){
                    if(chequerCurrent[wide][high] != 0){
                        // console.log("wide:" + wide + " high:" + high)
                        return false;
                    }
                }
            }
        }
        return true;
    },

    freshLabel: function() {
        var data = {};
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 20; j++) {
                data['chequer' + i + j] = {background:colour[0]};
            }
        }
        this.setData(data);
    },
    /* 页面加载时触发该函数 */
    onLoad: function (event) {
        this.freshLabel();
        nextTetromino = [].concat(this.nextTetrominoDisplay());
        // console.log(nextTetromino)
        currentTetromino = [].concat(nextTetromino)
        nextTetromino = [].concat(this.nextTetrominoDisplay());
        
        // chequerCurrent[4][10] = 3;

        var that = this;
        this.dropTimer = setInterval(function () {
            // console.log("Timeout!") 
            if(that.blockEnd(currentTetromino,1))
            {
                that.fillColor(that.currentPosition,currentTetromino,false);
                if(that.currentPosition[1]>0)
                    that.currentPosition[1]--;
                that.fillColor(that.currentPosition,currentTetromino,true);
            }
            else{
                that.fillBlock(that.currentPosition,currentTetromino);
                //判断一行是否可以清除
                that.whetherDeleteRow(that.currentPosition,currentTetromino)
                that.currentPosition = [].concat(that.appearPosition);
                // console.log(currentPosition)
                currentTetromino = [].concat(nextTetromino)
                nextTetromino = [].concat(that.nextTetrominoDisplay());

            }
        }, 500, "dropTimer")

        // console.dir(this.dropTimer)
    },

    /* 此方法展示窗体后发生 */
    onResume: function (event) {},

    /* 页面显示时触发该函数 */
    onShow: function (event) {},

    /* 页面隐藏时触发该函数 */
    onHide: function (event) {},

    /* 页面退出时触发该函数 */
    onExit: function (event) {},

	onButton: function(event){
        switch (event.target.id) {
            case "buttonLeft":
                if(this.blockEnd(currentTetromino,2))
                {
                    this.fillColor(this.currentPosition,currentTetromino,false);
                    if(this.currentPosition[0]>0)
                        this.currentPosition[0]--;
                    this.fillColor(this.currentPosition,currentTetromino,true);
                }
                break;
            case "buttonRight":
                if(this.blockEnd(currentTetromino,3))
                {
                    this.fillColor(this.currentPosition,currentTetromino,false);
                    if(this.currentPosition[0] < (chessboard.wide - currentTetromino.length))
                        this.currentPosition[0]++;
                    this.fillColor(this.currentPosition,currentTetromino,true);
                }else{
                    // console.log(currentTetromino);
                }
                break;
            case "buttonDown":
                if(this.blockEnd(currentTetromino,1))
                {
                    this.fillColor(this.currentPosition,currentTetromino,false);
                    if(this.currentPosition[1]>0)
                        this.currentPosition[1]--;
                    this.fillColor(this.currentPosition,currentTetromino,true);
                }else{
                    // console.log(currentTetromino);
                }
                break;
            case "buttonRotate":// 有问题
                if(true)
                {
                    this.fillColor(this.currentPosition,currentTetromino,false);
                    currentTetromino = this.rotateMatrix(currentTetromino,1);
                    this.fillColor(this.currentPosition,currentTetromino,true);
                }else{
                    // console.log(currentTetromino);
                }
                break;
                
            default:
                break;
        }
    },
});

var TP = require('modules/touch.js');

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
var score = 0;

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
        return this.reduceMatrix(rotateData);
    },
    // 显示下一个要出现的方块
    nextTetrominoDisplay: function() {
        var num = Math.floor(Math.random()*6)+1;
        var arr = this.rotateMatrix(Tetromino[num],Math.floor(Math.random()*4))
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
     * 这里写了判断哪一行要删除
     * @param {*} position 
     * @param {*} matrix 
     */
    isDeleteRow : function(position,matrix) {
        var x = matrix.length;
        var y = matrix[0].length;
        for (var i = 0; i < y; i++) {
            for (var j = 0; j < chessboard.wide; j++) {
                if(chequerCurrent[j][position[1] + i] == 0||Number(position[1] + i) >= chessboard.high)
                    break;
                if(j == (chessboard.wide - 1)){
                    // 这里要去删除行
                    score+=10;
                    this.setData({score:{value:score+""}})
                    this.deleteRow(Number(position[1] + i))
                }
            }
        }
    },
    /**
     * 删除行 //TODO 这里有优化的空间
     * @param {*} row 
     */
    deleteRow : function(row){
        var data = {};
        for (var i = row; i < (chessboard.high-1); i++) {
            for (var j = 0; j < chessboard.wide; j++) {
                if(chequerCurrent[j][i] == chequerCurrent[j][i + 1]);
                else{
                    chequerCurrent[j][i] = chequerCurrent[j][i + 1];
                    data['chequer' + j + i] = {background:colour[chequerCurrent[j][i]]};
                }
            }
        }
        for (var j = 0; j < chessboard.wide; j++) {
            if(chequerCurrent[j][chessboard.high-1]){
                chequerCurrent[j][chessboard.high-1] = 0;
                data['chequer' + j + chessboard.high-1] = {background:colour[chequerCurrent[j][chessboard.high-1]]};
            }
        }
        this.setData(data);
    },
    // 显示下一个位置的颜色
    // 判断一个方块下一个位置是否结束
    /**  
     * 方向 上下左右、顺时针旋转 0123、4
     */
    blockEnd:function(matrix,direction){
        var position = [].concat(this.currentPosition);
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
            case 4:
                if (matrix.length+position[0]>chessboard.wide) {
                    return false;
                }
                break;
        }
        var wide, high;
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                wide = position[0] + i;
                high = position[1] + j;
                if(matrix[i][j] &&  wide < chessboard.wide && high < chessboard.high){
                    if(chequerCurrent[wide][high] != 0){
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
        TP.PageTouchInit(this);
        // this.freshLabel();
        this.setData({score:{value:score+""}})
        nextTetromino = [].concat(this.nextTetrominoDisplay());
        currentTetromino = [].concat(nextTetromino)
        nextTetromino = [].concat(this.nextTetrominoDisplay());

        var that = this;
        this.dropTimer = setInterval(function () {
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
                that.isDeleteRow(that.currentPosition,currentTetromino)
                // 判断是否游戏结束
                if (that.currentPosition[1] + currentTetromino[0].length > chessboard.high) {
                    console.log("end!!!!!!")
                    that.exit();
                }
                that.currentPosition = [].concat(that.appearPosition);
                currentTetromino = [].concat(nextTetromino)
                nextTetromino = [].concat(that.nextTetrominoDisplay());
            }
        }, 500, "dropTimer")
    },

    /* 此方法展示窗体后发生 */
    onResume: function (event) {},

    /* 页面显示时触发该函数 */
    onShow: function (event) {},

    /* 页面隐藏时触发该函数 */
    onHide: function (event) {},

    /* 页面退出时触发该函数 */
    onExit: function (event) {
        TP.PageTouchUninit(this);
    },
    exit: function (event) {
        clearInterval(this.dropTimer);
    },
    
    toLeft:function () {
        if(this.blockEnd(currentTetromino,2))
        {
            this.fillColor(this.currentPosition,currentTetromino,false);
            if(this.currentPosition[0]>0)
                this.currentPosition[0]--;
            this.fillColor(this.currentPosition,currentTetromino,true);
        }
    },
    toRight:function () {
        if(this.blockEnd(currentTetromino,3))
        {
            this.fillColor(this.currentPosition,currentTetromino,false);
            if(this.currentPosition[0] < (chessboard.wide - currentTetromino.length))
                this.currentPosition[0]++;
            this.fillColor(this.currentPosition,currentTetromino,true);
        }else{
        }
    },
    toRotate:function () {
        //TODO 现在是：旋转过后如果有问题（如：超出边界、会重叠到现有方块）将不在旋转
        if(this.blockEnd(this.rotateMatrix(currentTetromino,1),4))
        {
            this.fillColor(this.currentPosition,currentTetromino,false);
            currentTetromino = this.rotateMatrix(currentTetromino,1);
            this.fillColor(this.currentPosition,currentTetromino,true);
        }else{
        }
    },
    toDown:function () {
        if(this.blockEnd(currentTetromino,1))
        {
            this.fillColor(this.currentPosition,currentTetromino,false);
            if(this.currentPosition[1]>0)
                this.currentPosition[1]--;
            this.fillColor(this.currentPosition,currentTetromino,true);
        }else{
        }
    },

    operation: function(event) {
        if (event == "left") {
            this.toLeft();
        } else if (event == "right")
            this.toRight();
        else if (event == "rotate")
            this.toRotate();
        else if (event == "down")
            this.toDown();
        
    },
	onButton: function(event){
        var direction = event.target.id.substring(0,event.target.id.length - 6);
        this.operation(direction);
    },
    exitevent: function(event) {
        switch (event.type) {
            case "press":
                pm.redirectTo({ url: 'pages/Game_list/Game_list' });
                break;
        }
    },

	onPageTouch: function(event){
        var that = this;
        TP.PageTouchEvent(this, event,
            0,
            function() { that.operation("right") }, //R2L 
            function() { that.operation("left") }, //L2R
            function() { that.operation("rotate") }, //T2D
            function() { that.operation("down") } //D2T
        );
    },
});

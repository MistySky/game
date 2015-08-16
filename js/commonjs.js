/**
 * Created by lovo_bdk on 15-7-13.
 */
//工具js
function showDIV(id){
    var obj = document.getElementById(id);
    obj.setAttribute("class","show");
}
function hideDIV(id){
    var obj=document.getElementById(id)
    obj.setAttribute("class","hide")
}

//随机产生数
function generateCode(num){
    return parseInt(Math.random()*num);
}
//随机产生颜色
function generateColor(){
    var colorStr = "";
    var colorCnt = 0;
    for(var i = 0;i < 3;i++){
        var rand = parseInt(Math.random()*175) + 10;
        if(i){
            colorStr += ",";
        }
        colorCnt += rand;
        colorStr += rand;

    }
    colorStr = "rgb("+colorStr+")";
    if(colorCnt > 280){
        return colorStr;
    }else{
        return generateColor();
    }
}
//随机产生颜色并放在指定大小的数组中
function generateColorArray(num){
    var ary = new Array();
    for(var i = 0;i < num;i++){
        var isSameColor = false;
        var tempColor = generateColor();
        for(var j = 0;j < i;j++){
            if(compareColor(tempColor,ary[j])){
                isSameColor = true;
                i--;
                break;
            }
        }
        if(!isSameColor){
            ary[i] = tempColor;
        }
    }
    return ary;
}
//比较两个颜色是否相等
function compareColor(color1,color2){
    return color1.replace(/\s+/g,"") == color2.replace(/\s+/g,"");
}

//从数组中随机获取一个颜色并返回
function getColor(ary){
    return ary[generateCode(ary.length)];
}

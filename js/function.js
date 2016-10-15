/**
 * Created by Administrator on 2015/7/14.
 */
var tool=$_id("tools");
var main=$_id("main");
var all=$_id("all");
var end=$_id("end");
var message= $_id("message");
var users=[];
var newusers=JSON.stringify(users);
localStorage.users=newusers;
localStorage.usernum=1;
function $_id(str){
    return document.getElementById(str);
}
function start(){
    tool.style.height='0px';
    tool.style.width='0px';
    startMove($_id("tools"),{width:800,height:685})
    tool.style.display='block';
    document.getElementById('choose_jin').style.backgroundColor='gray';
    document.getElementById('choose_slow').style.backgroundColor='gray';
    var check=true;
    var check1=true;
    document.getElementById("jinzhongzhao").onclick=function(){
        if(check){
     document.getElementById('choose_jin').style.backgroundColor='skyblue';
            check=false;
            user.jinzhongzhao=1;
            user.glod -=200;
            $_id('pop').style.display='block'
        }else{
     document.getElementById('choose_jin').style.backgroundColor='gray';
            check=true;
            user.jinzhongzhao=0;
        }

    };
    document.getElementById("slow").onclick=function(){
        if(check1){
            document.getElementById('choose_slow').style.backgroundColor='skyblue';
            check1=false;
            user.slow=1;
            user.glod -=100;
            speed=1;
        }else{
            document.getElementById('choose_slow').style.backgroundColor='gray';
            check1=true;
            user.slow=0;
            speed=2;
        }

    };
}
function go(){
    main.style.display='block';
    all.style.display='none';
    initgame();
}
initgame();
//初始化游戏
 function initgame(){
     maprole=new Maprole();
     bulletRole=null;
     figureRole=null;
     user.score=0;
    gamerun();
}
//开始画布；
function gamerun(){

      maprole.draw();
    runID=setInterval(function(){
            countent++
            if(countent>10000){
                user.slow +=1;
                user.reward=1000;
            }
            if(countent>20000){
                user.slow +=1;
                user.reward=2000;
            }
            if(countent>30000){
                user.slow +=1;
                user.reward=3000;
            }
            if(countent>40000){
                user.slow +=1;
                user.reward=4000;
            }
            if(countent>50000){
                user.slow +=1;
                user.reward=5000;
            }
      roleContext.clearRect(0,0,800,600);
           user.score++;
           roleContext.font='40px Arial';
           roleContext.strokeText(user.score,350,50);
      if(bulletRole){
          bulletRole.draw();
      }
       if(!figureRole){
          var figureURL=figureRoleAry[generateCode(6)]
                   figureRole=new figureURL();
                    user.score +=300;
       }else{

           if(!checkImpact()&&flag){
               user.clearColor +=colortime;
               if(user.jinzhongzhao!=0){
                   user.jinzhongzhao -=1;
                   $_id('pop').style.display='none';
                   flag=false;
               }
               else{
                   endGame();
               }
           }
           if(figureRole.x<150){
               if(user.jinzhongzhao!=0){
                   figureRole=null;
                   user.jinzhongzhao -=1;
                   $_id('pop').style.display='none';
               }
                else{
                   endGame();
               }
           }
           else{
               figureRole.draw();
           }
       }
        }
    ,10)
}
function change(){
    if(ischange){
        ischange=false;
        clearInterval(runID);
    }
    else{
        ischange=true;
        gamerun();
    }

}
function next(){
    user.glod +=parseInt(user.score/10);
    alert(user.glod);
    message.style.display='block';
    end.style.display='none';
    $_id("user_score").innerHTML=user.score;
    $_id("total_score").innerHTML=user.score+user.reward;
    $_id("user_color").innerHTML=user.clearColor;
    $_id("user_reward").innerHTML=user.reward;
    $_id("user_glod").innerHTML=parseInt(user.score/10);
    $_id("my_gold").innerHTML=user.glod;
    var user_score=$_id("user_score").innerHTML;
    var total_score=$_id("total_score").innerHTML;
    var user_color=$_id("user_color").innerHTML;
    var user_reward=$_id("user_reward").innerHTML;
    var user_gold= $_id("user_glod").innerHTML;
    var my_gold=$_id("my_gold").innerHTML;
    var newuser=JSON.parse(localStorage.users);
    var usernum=parseInt(localStorage.usernum);
    newuser.push({
        user:$_id("bot_name").value,
        user_score:user_score,
        total_score:total_score,
        user_reward:user_reward,
        user_color:user_color,
        user_gold:my_gold,
        user_num:usernum
    })

    function re(a,b){
        return b.total_score-a.total_score;
    }
    newuser.sort(re);
    for(var i=0;i<newuser.length;i++){
        if(newuser[i].user_num=usernum){
            $_id("my_turn").innerHTML=i+1;
        }
    }

    var newstu=JSON.stringify(newuser);
    localStorage.users=newstu;
    localStorage.usernum=usernum+1;
   show();

}
function jixu(){
    main.style.height='0px';
    main.style.width='0px';
    startMove($_id("main"),{width:800,height:600})
    message.style.display='none';
    main.style.display='block';
    go();
}
function home(){
    all.style.height='0px';
    all.style.width='0px';
    startMove($_id("all"),{width:800,height:600})
    message.style.display='none';
    all.style.display='block';
    tool.style.display='none';
}
function initBullets(ary){
    var liStr="";
    for(var i=0;i<ary.length;i++){
        liStr +="<li style='background-color:"+ary[i]+"' onclick='sendBullet(this)'></li>"
    }
    document.getElementById("Bullets").innerHTML=liStr;
}
function sendBullet(obj){
    if(!bulletRole){
    bulletRole =new BulletRole();
    bulletRole.color=obj.style.backgroundColor;
    }
}
//初始化颜色块;
function initRole(obj,num){
    var colorAry=generateColorArray(num);
    initBullets(colorAry);
    //从数组随机抽取颜色；并产生新的数组;
    obj.colorAry=new Array();
    for(var i=0;i<num;i++){
        obj.colorAry[i]=getColor(colorAry);
    }
}
//检测子弹和图形碰撞，如果返回值为false，则表示游戏即将结束，返回true则不会！
function checkImpact(){
    //检测两个对象是否存在，吐过不存在则不需要检测碰撞！
    if(!bulletRole||!figureRole){
        return true;
    }
    //通过两点间的距离公式计算子弹的原点和图形左上角顶点的距离；
    var distance=Math.sqrt(Math.pow(bulletRole.x-figureRole.x,2)+Math.pow(bulletRole.y-figureRole.y,2));
    if(distance<=bulletRole.radius){
        var isClean=false;

        for(var i=0;i<figureRole.colorAry.length;i++){
            if(compareColor(bulletRole.color,figureRole.colorAry[i])){
                figureRole.state[i]=0;
                isClean=true;
                colortime=1;
            }

        }
        return isClean;
    }
    return true;
}


function endGame(){
    clearInterval(runID);
    bgContext.drawImage(ganmeoverImg,250,200)
    setTimeout(function(){
        end.style.height='0px';
        end.style.width='0px';
        startMove($_id("end"),{width:800,height:600})
        main.style.display='none';
        end.style.display='block';
    },1000);
}
function show(){
    var newuser=JSON.parse(localStorage.users);
    var i=newuser.length-1;
    var tb=$_id("left_content");
    $_id("top_score").innerHTML=newuser[0].total_score;
    tb.innerHTML="";
    for(var j=0;j<10;j++){
        var tr=document.createElement("tr");
        tr.innerHTML="<td>"+(j+1)+"</td><td>"+newuser[j].user+"</td><td>"+newuser[j].total_score+"</td>"
        tb.appendChild(tr);
    }
    var newstu=JSON.stringify(newuser);
    localStorage.users=newstu;
}
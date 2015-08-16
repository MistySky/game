/**
 * Created by Administrator on 2015/7/14.
 */
var maprole;
var bulletRole;
var bgCanvas=document.getElementById('bg_canvas');
var bgContext=bgCanvas.getContext('2d');
var bg_role=document.getElementById('bg_role');
var roleContext=bg_role.getContext('2d');
var speed=2;
var figureRole;
var flag=true;
var runID;
var figureRoleAry=[FigureRole1,FigureRole2,FigureRole3,FigureRole4,FigureRole5,FigureRole6];
var ganmeoverImg=new Image();
var user = new  User();
var ischange=true;
var countent=0;
var colortime=0;

ganmeoverImg.src="image/gameover.png"
function User(){
    this.name='不取名字的二逼';
    //用户的姓名
    this.glod=1000;
    //用户的金币
    this.score=0;
    //用户的分数
    this.clearColor=0;
    //用户清除的颜色
    this.reward=0;
    //用户的奖励
    this.jinzhongzhao=0;
    //用户的道具1
    this.slow=0;
    //用户的道具2
    this.x=100;
    //用户的坐标
    this.y=200;
    //用户的坐标
}
function Maprole(){
    this.x=0;
    //背景的x坐标
    this.y=0;
    //背景的y坐标
    this.width=800;
    //背景的宽度
    this.height=600;
    //背景的高度
    this.color=generateColor();
    //背景的颜色，调用随机生产颜色；
    this.draw=function(){
        //背景的绘制
        bgContext.fillStyle=this.color;
        bgContext.fillRect(this.x,this.y,this.width,this.height);
    }
}
function BulletRole(){
    this.x=100;
    this.y=250;
    this.radius=0;
    this.color;
    this.draw=function(){
        bgContext.beginPath();
            bgContext.fillStyle=this.color;
            bgContext.arc(this.x,this.y,this.radius,0,Math.PI*2);
            bgContext.closePath();
            bgContext.fill();
            this.radius +=15;
            if(this.radius>800){
                bulletRole=null;
                flag=true;
        }

    }
}
function BaseFigurRole(){
    this.x=800;
    this.y=200;
    //图形中所有小图标的颜色
    this.colorAry;
    //图形中是否绘制小图形的状态
    this.state;
}
//子图形一；
FigureRole1.prototype=new BaseFigurRole();
FigureRole2.prototype=new BaseFigurRole();
FigureRole3.prototype=new BaseFigurRole();
FigureRole4.prototype=new BaseFigurRole();
FigureRole5.prototype=new BaseFigurRole();
FigureRole6.prototype=new BaseFigurRole();
function FigureRole1(){
    this.state=[1,1];
    initRole(this,2)
    this.draw=function(){
        this.draw1=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[0];
            roleContext.arc(this.x,this.y,50,0,Math.PI*2);
            roleContext.closePath();
            roleContext.fill();
        }
        this.draw2=function(){
            roleContext.fillStyle=this.colorAry[1];
            roleContext.fillRect(this.x,this.y+100,100,200);
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(!this.state[0]&&!this.state[1]){
            figureRole=null;
            flag=false;
        }this.x -=speed;
    }
}
function FigureRole2(){
    this.state=[1,1,1];
    initRole(this,3)
    this.draw=function(){
        this.draw1=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[0];
            roleContext.moveTo(this.x+100,this.y+100);
            roleContext.lineTo(this.x+80,this.y+100);
            roleContext.lineTo(this.x+75,this.y+130);
            roleContext.lineTo(this.x+225,this.y+130);
            roleContext.lineTo(this.x+220,this.y+100);
            roleContext.lineTo(this.x+200,this.y+100);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw2=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[1];
            roleContext.moveTo(this.x+100,this.y+100);
            roleContext.quadraticCurveTo(this.x+150,this.y+50,this.x+200,this.y+100);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw3=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[2];
            roleContext.moveTo(this.x+100,this.y+130);
            roleContext.lineTo(this.x+100,this.y+280);
            roleContext.lineTo(this.x+200,this.y+280);
            roleContext.lineTo(this.x+200,this.y+130);
            roleContext.closePath();
            roleContext.fill();
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        if(!this.state[0]&&!this.state[1]&&!this.state[2]){
            figureRole=null;
            flag=false;
        }this.x -=speed;
    }
}
function FigureRole3(){
    this.state=[1,1,1];
    initRole(this,3)
    this.draw=function(){
        this.draw1=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[0];
            roleContext.moveTo(this.x+150,this.y+20);
            roleContext.lineTo(this.x+70,this.y+100);
            roleContext.lineTo(this.x+220,this.y+100);
            roleContext.closePath();
            roleContext.fill();
        }
        this.draw2=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[1];
            roleContext.moveTo(this.x+100,this.y+100);
            roleContext.lineTo(this.x+20,this.y+180);
            roleContext.lineTo(this.x+260,this.y+180);
            roleContext.lineTo(this.x+180,this.y+100);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw3=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[2];
            roleContext.moveTo(this.x+100,this.y+180);
            roleContext.lineTo(this.x+100,this.y+290);
            roleContext.lineTo(this.x+180,this.y+290);
            roleContext.lineTo(this.x+180,this.y+180);
            roleContext.fill();
            roleContext.closePath();
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        if(!this.state[0]&&!this.state[1]&&!this.state[2]){
            figureRole=null;
            flag=false;
        }this.x -=speed;
    }
}
function FigureRole4(){
    this.state=[1,1,1,1];
    initRole(this,4)
    this.draw=function(){
        this.draw1=function(){

            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[0];
            roleContext.moveTo(this.x+70,this.y+50);
            roleContext.lineTo(this.x+20,this.y+120);
            roleContext.lineTo(this.x+380,this.y+120);
            roleContext.lineTo(this.x+330,this.y+50);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw2=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[1];
            roleContext.moveTo(this.x+110,this.y+50);
            roleContext.lineTo(this.x+110,this.y+10);
            roleContext.lineTo(this.x+150,this.y+10);
            roleContext.lineTo(this.x+150,this.y+50);
            roleContext.closePath();
            roleContext.fill();
        }
        this.draw3=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[2];
            roleContext.moveTo(this.x+80,this.y+120);
            roleContext.lineTo(this.x+80,this.y+280);
            roleContext.lineTo(this.x+250,this.y+280);
            roleContext.lineTo(this.x+250,this.y+200);
            roleContext.lineTo(this.x+280,this.y+200);
            roleContext.lineTo(this.x+280,this.y+280);
            roleContext.lineTo(this.x+340,this.y+280);
            roleContext.lineTo(this.x+340,this.y+120);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw4=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[3];
            roleContext.lineTo(this.x+250,this.y+280);
            roleContext.lineTo(this.x+250,this.y+200);
            roleContext.lineTo(this.x+280,this.y+200);
            roleContext.lineTo(this.x+280,this.y+280);
            roleContext.fill();
            roleContext.closePath();
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        if(this.state[3]){
            this.draw4();
        }
        if(!this.state[0]&&!this.state[1]&&!this.state[2]&&!this.state[3]){
            figureRole=null;
            flag=false;
        }this.x -=speed;
    }
}
function FigureRole5(){
    this.state=[1,1];
    initRole(this,2)
    this.draw=function(){
        this.draw1=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[0];
            roleContext.moveTo(this.x+80,this.y+20);
            roleContext.lineTo(this.x+20,this.y+230);
            roleContext.lineTo(this.x+370,this.y+230);
            roleContext.lineTo(this.x+300,this.y+150);
            roleContext.lineTo(this.x+80,this.y+150);
            roleContext.lineTo(this.x+80,this.y+20);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw2=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[1];
            roleContext.moveTo(this.x+190,this.y+150);
            roleContext.lineTo(this.x+190,this.y+50);
            roleContext.lineTo(this.x+380,this.y+50);
            roleContext.lineTo(this.x+380,this.y+150);
            roleContext.fill();
            roleContext.closePath();
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(!this.state[0]&&!this.state[1]){
            figureRole=null;
            flag=false;
        }
        this.x -=speed;
    }
}
function FigureRole6(){
    this.state=[1,1,1];
    initRole(this,3)
    this.draw=function(){
        this.draw1=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[0];
            roleContext.moveTo(this.x+10,this.y+10);
            roleContext.lineTo(this.x+10,this.y+130);
            roleContext.lineTo(this.x+290,this.y+130);
            roleContext.lineTo(this.x+290,this.y+10);
            roleContext.moveTo(this.x+10,this.y+10);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw2=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[1];
            roleContext.arc(this.x+60,this.y+150,20,0,2*Math.PI);
            roleContext.fill();
            roleContext.closePath();
        }
        this.draw3=function(){
            roleContext.beginPath();
            roleContext.fillStyle=this.colorAry[2];
            roleContext.arc(this.x+250,this.y+150,20,0,2*Math.PI);
            roleContext.fill();
            roleContext.closePath();
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        if(!this.state[0]&&!this.state[1]&&!this.state[2]){
            figureRole=null;
            flag=false;
        }
        this.x -=speed;
    }
}
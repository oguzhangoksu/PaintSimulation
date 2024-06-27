
var Clicked="";
var startX;
var startY;
var endX;
var endY;
var trigger=false;
var data=[]; // data is for saving the points
var canvas2=document.getElementById("canvas2")
var ctx2 = canvas2.getContext('2d');



document.addEventListener("DOMContentLoaded", ()=>{// waiting for the page to load
    draw();
    count=0; // Count is counting for clicking mouse for understand start and end point


    canvas2.addEventListener("mousedown", (e)=>{ // when mouse is clicked down
        if(Clicked==="Cliping"){ // if the selected option is cliping
            let x = e.clientX-canvas2.getBoundingClientRect().left;
            let y = e.clientY-canvas2.getBoundingClientRect().top;
            startX=x;
            startY=y;
            ctx2.fillRect(x,y,1,1)
        }
        if(Clicked==="Translation"){ // if the selected option is Translation
            if(document.getElementById("divx")||document.getElementById("divy")||document.getElementById("button")){
                document.getElementById("divx").remove()
                document.getElementById("divy").remove()
                document.getElementById("button").remove()
            }
            data=[]
            let x = e.clientX-canvas2.getBoundingClientRect().left;
            let y = e.clientY-canvas2.getBoundingClientRect().top;
            startX=x;
            startY=y;
            ctx2.fillRect(x,y,1,1)
        }
        
       
    })
    
    canvas2.addEventListener("mouseup", (e)=>{ // when mouse is clicked up
        if(Clicked==="Cliping"){ // if the selected option is cliping
            let x = e.clientX-canvas2.getBoundingClientRect().left;
            let y = e.clientY-canvas2.getBoundingClientRect().top;
            clearOutsideArea(startX,startY,x,y)
        }
    })


    canvas2.addEventListener("click", (e)=>{ // when mouse is clicked
        
        let x = e.clientX-canvas2.getBoundingClientRect().left;
        let y = e.clientY-canvas2.getBoundingClientRect().top;
        ctx2.fillStyle="black"
        console.log("x:"+(x-506)+"y:"+(346-y));
        console.log(Clicked)
        if(Clicked==="Cursor"){} // if the selected option is cursor
        else if(Clicked==="Dot"){
            ctx2.fillRect(x,y,1,1)
        }
        else if(Clicked==="Point"){ // if the selected option is point
            ctx2.fillRect(x,y,1,1)
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
        }
        else if(Clicked==="Line Segment"){ // if the selected option is line segment
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count===0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                lineSegment(startX,startY,x,y)
                count=0;
            }

        }
        else if(Clicked==="DDA"){ // if the selected option is DDA
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count===0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                DDA(startX,startY,x,y)
                count=0;
            }
        }
        else if(Clicked==="Bresenham Line"){ // if the selected option is Bresenham
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count===0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                bresenhamLine(startX,startY,x,y)
                count=0;
            }
        }
        else if(Clicked==="Implicit Circle"){ // if the selected option is Implicit Circle
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count===0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                drawEdge(startX,startY,x,y)
                implicitCircle(startX,startY,x,y)
                count=0;
            }

        }
        else if(Clicked=="Bresenham Circle"){ // if the selected option is Bresenham Circle
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count==0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                drawEdge(startX,startY,x,y)
                bresenhamCircle(startX,startY,x,y)
                count=0;
            }

        }
        else if(Clicked=="Implicit Ellipse"){   // if the selected option is Implicit Ellipse
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count==0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                drawEdge(startX,startY,x,y)
                implicitEllipse(startX,startY,x,y)
                count=0;
            }
        }
        else if(Clicked=="Bresenham Ellipse"){
            ctx2.fillText("("+Math.round((x-506))+","+Math.round((346-y))+")",x-4,y-4)
            if(count==0){
                startX=x;
                startY=y;
                count++;
            }
            else{
                drawEdge(startX,startY,x,y)
                implicitEllipse(startX,startY,x,y)
                count=0;
            }
        }
        else if (Clicked=="Translation"){
            let x = e.clientX-canvas2.getBoundingClientRect().left;
            let y = e.clientY-canvas2.getBoundingClientRect().top;
            endX=x;endY=y;
            drawEdge(startX,startY,endX,endY)
            let miny=Math.min(startY,endY)+1;let maxy=Math.max(startY,endY)-1;let minx=Math.min(startX,endX);let maxx=Math.max(startX,endX);
            while(miny<=maxy){
                for (let i=minx+1;i<maxx;i++){
                    var pixelData = ctx2.getImageData(i, miny, 1, 1).data;
                    const red= parseInt(pixelData[0]);
                    const green= parseInt(pixelData[1]);
                    const blue= parseInt(pixelData[2]);
                    const alpha= parseInt(pixelData[3]);
                    data.push([i,miny,red,green,blue,alpha])
                }
                miny++;
            }
            let divx=document.createElement("input")
            divx.setAttribute("type","number")
            divx.setAttribute("id","divx")
            divx.setAttribute("placeholder","x")
            divx.style.marginLeft="1040px"

            let divy=document.createElement("input")
            divy.setAttribute("type","number")
            divy.setAttribute("id","divy")
            divy.setAttribute("placeholder","y")
            divy.style.marginLeft="1040px"

            let button=document.createElement("button")
            button.setAttribute("id","button")
            button.style.marginLeft="1040px"
            button.innerHTML="Translate"
            button.setAttribute("onclick","ClickedButton()")
            document.getElementById("content").appendChild(divx)
            document.getElementById("content").appendChild(divy)
            document.getElementById("content").appendChild(button)
   
            
          
        }
         
       
    })
  
});


function handleClicked(e){
    console.log("clicked",e)
    document.getElementById("selected").innerHTML ="Selected:"+ e;
    Clicked=e;
    if(document.getElementById("divx")||document.getElementById("divy")||document.getElementById("button")){
        document.getElementById("divx").remove()
        document.getElementById("divy").remove()
        document.getElementById("button").remove()
    }
    if(document.getElementById("reflectX")||document.getElementById("reflectY")||document.getElementById("reflectXY")){
        document.getElementById("reflectX").remove()
        document.getElementById("reflectY").remove()
        document.getElementById("reflectOrigin").remove()
    }
     
    if(e==="Reflection"){
        let buttonX=document.createElement("button")
        buttonX.setAttribute("id","reflectX")
        buttonX.style.marginLeft="1040px"
        buttonX.innerHTML="Reflection of X axis"
        buttonX.setAttribute("onclick","ClickedReflection('reflectX')")
        document.getElementById("content").appendChild(buttonX)
        let buttonY=document.createElement("button")
        buttonY.setAttribute("id","reflectY")
        buttonY.style.marginLeft="1040px"
        buttonY.innerHTML="Reflection of Y axis"
        buttonY.setAttribute("onclick","ClickedReflection('reflectY')")
        document.getElementById("content").appendChild(buttonY)
        let buttonXY=document.createElement("button")
        buttonXY.setAttribute("id","reflectOrigin")
        buttonXY.style.marginLeft="1040px"
        buttonXY.innerHTML="Reflection of Origin"
        buttonXY.setAttribute("onclick","ClickedReflection('reflectOrigin')")
        document.getElementById("content").appendChild(buttonXY)
    }
    
    if(e==="Clear"){
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }
}


function draw() {
    let canvas1 = document.getElementById('canvas1');
    let canvas2 = document.getElementById('canvas2');
    if (!canvas1.getContext) {
        return;
    }

    //---SETINGS FOR CANVAS---
    
        const ctx = canvas1.getContext('2d');
        ctx.fillStyle = "black";
        ctx.lineWidth = 1;
        // x line
        ctx.beginPath();
        ctx.moveTo(5, 346);
        ctx.lineTo(1006, 346);
        ctx.stroke();
        // y line
        ctx.beginPath();
        ctx.moveTo(506, 5);
        ctx.lineTo(506, 686);
        ctx.stroke();

        // split into every 20 px x line 
        ctx.font = "7px Arial";
        
        for (let i =1;i<=1001;i+=20){
            ctx.fillRect(i+5,342,1,5)
            ctx.fillText(`${i-501}`,i,357)
        }
        ctx.font = "15px Arial";
        ctx.fillText(`X`,1005,340)
        ctx.font = "7px Arial";
        // split into every 30 px y line 
        for (let i =1;i<=681;i+=20){
            ctx.fillRect(504,i+5,5,1)
            ctx.fillText(`${341-i}`,510,i+5)
        }
        ctx.font = "15px Arial";
        ctx.fillText(`Y`,490,690)
        
        //---END SETINGS FOR CANVAS---

}



//DDA ALGORITHM
function DDA(x0,y0,x1,y1){
    const dx=x1-x0;const dy=y1-y0;
    const length=Math.max(Math.abs(dx),Math.abs(dy))
    const xinc=dx/length;const yinc=dy/length;

    for(var i=1;i<=length;i++){
        ctx2.fillRect(Math.round(x0),Math.round(y0),1,1)
        x0+=xinc;y0+=yinc;
    }
} 

//Line Segment
function lineSegment(x0,y0,x1,y1){
    var dx=x1-x0;var dy=y1-y0;var m=dy/dx;var b = y0-m*x0;
    if(m==Infinity || m==-Infinity){
        if(y0>y1){
            for(var i=y1;i<=y0;i++){
                ctx2.fillRect(Math.round(x0),Math.round(i),1,1)
            }
        }
        else{
            for(var i=y0;i<=y1;i++){
                ctx2.fillRect(Math.round(x0),Math.round(i),1,1)
            }
        }
    }
    if(dx>0){
        dx=1;
        for(var i=x0;i<=x1;i+=dx){
            ctx2.fillRect(i,Math.round(y0),1,1)
            y0=m*i+b;
        }    
    }
    else{
        dx=-1;
        for(var i=x0;i>=x1;i+=dx){
            ctx2.fillRect(i,Math.round(y0),1,1)
            y0=m*i+b;
        }
    }
    

}

//Bresenham Line ALGORITHM
function bresenhamLine(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx;
    let sy;
    if(x0<x1){
        sx=1;
    }else{
        sx=-1;
    }
    if(y0<y1){
        sy=1;
    }else{
        sy=-1;
    }
    let err = dx - dy;
 
    while(true) {
        ctx2.fillRect(x0,y0,1,1)
 
       if ((x0 === x1) && (y0 === y1)){ break};
       var e2 = 2*err;
       if (e2 > -dy) { err -= dy; x0  += sx; }
       if (e2 < dx) { err += dx; y0  += sy; }
    }
 }

//Implicit Circle ALGORITHM

function implicitCircle(x0,y0,x1,y1){
    let R=Math.min(Math.abs(x1-x0),Math.abs(y1-y0)) // I select 2 point so I try to find min delta x and delta y. If I selecet max one it will be outside of the other line.That's why, I select min one.
    let r=R/2
    middlepointx=Math.min(x0,x1)+r;
    middlepointy=Math.min(y0,y1)+r;
    var y=0;
    var x=Math.min(x0,x1);
    for (let i=0; i<=R;i++){
        y=middlepointy+Math.sqrt(Math.pow(r,2)-Math.pow((x-middlepointx),2))
        ctx2.fillRect(x,y,1,1)
        y=middlepointy-Math.sqrt(Math.pow(r,2)-Math.pow((x-middlepointx),2))
        ctx2.fillRect(x,y,1,1)
        x=x+1;
    }
}
//Bresenham Circle ALGORITHM
function bresenhamCircle(x0,y0,x1,y1){
    let R=Math.min(Math.abs(x1-x0),Math.abs(y1-y0))
    let r=R/2;let d=3-2*r;let x=0;let y=r;
    middlepointx=Math.min(x0,x1)+r;
    middlepointy=Math.min(y0,y1)+r;
    drawCircle(middlepointx,middlepointy,x,y)
    while(y>=x){
        x++;
        if(d>0){
            y--;
            d=d+4*(x-y)+10;
        }
        else{
            d=d+4*x+6;
        }
        drawCircle(middlepointx,middlepointy,x,y)
    }

}
function drawCircle(xc,yc,x,y){
    ctx2.fillRect(xc+x,yc+y,1,1)
    ctx2.fillRect(xc-x,yc+y,1,1)
    ctx2.fillRect(xc+x,yc-y,1,1)
    ctx2.fillRect(xc-x,yc-y,1,1)
    ctx2.fillRect(xc+y,yc+x,1,1)
    ctx2.fillRect(xc-y,yc+x,1,1)
    ctx2.fillRect(xc+y,yc-x,1,1)
    ctx2.fillRect(xc-y,yc-x,1,1)

}

//Implicit Ellipse ALGORITHM

function implicitEllipse(x0,y0,x1,y1){
    let dx=Math.abs(x1-x0);let dy=Math.abs(y1-y0);
    let a=dx/2;let b=dy/2;    
    let middlepointx=Math.min(x0,x1)+a;
    let middlepointy=Math.min(y0,y1)+b;
    let y=0; let x=Math.min(x0,x1);
    for(let i=0;i<=dx;i++){
        y=middlepointy+(b*Math.sqrt(1-(Math.pow(x-middlepointx,2)/Math.pow(a,2))))
        ctx2.fillRect(x,y,1,1)
        y=middlepointy-(b*Math.sqrt(1-(Math.pow(x-middlepointx,2)/Math.pow(a,2))))
        ctx2.fillRect(x,y,1,1)
        x=x+1;
    }
}
//Bresenham Ellipse ALGORITHM


function drawEdge(startX,startY,x,y){
    for(let i=Math.min(startX,x);i<=Math.max(startX,x);i=i+10){
        ctx2.fillRect(i,startY,5,1)                    
    }
    for(let i=Math.min(startY,y);i<=Math.max(startY,y);i=i+10){
        ctx2.fillRect(startX,i,1,5)                    
    }
    for(let i=Math.min(startX,x);i<=Math.max(startX,x);i=i+10){
        ctx2.fillRect(i,y,5,1)                    
    }
    for(let i=Math.min(startY,y);i<=Math.max(startY,y);i=i+10){
        ctx2.fillRect(x,i,1,5)                    
    }
}

function ClickedButton(){
    
    let x=parseInt(document.getElementById("divx").value)
    let y=parseInt(document.getElementById("divy").value)
       


    for (let i=0;i<data.length;i++){
        
        if(data[i][2]>50||data[i][3]>50||data[i][4]>50||data[i][5]>50){
            ctx2.fillStyle="black"
            ctx2.fillRect(data[i][0]+x,data[i][1]+y,1,1)
            
        }
    }
    
}

function ClickedReflection(e){
    let width=canvas2.getBoundingClientRect().width
    let height=canvas2.getBoundingClientRect().height
    let data=[]
    for(let y=0;y<height;y++){
           
        for (let x=0;x<width;x++){
            var pixelData = ctx2.getImageData(x, y, 1, 1).data;
            
            if(pixelData[0]>50||pixelData[1]>50||pixelData[2]>50||pixelData[3]>50){
                data.push([x,y])      
            } 
            
        }     
    }
    if(e==="reflectX"){
        
        
        for (i=0;i<data.length;i++){
            if(data[i][1]>346){
                ctx2.fillRect(data[i][0],346-(data[i][1]-346),1,1)
            }
            else{
                ctx2.fillRect(data[i][0],695-data[i][1],1,1)
            }
        }
    }
    else if(e==="reflectY"){
        for (i=0;i<data.length;i++){
            if(data[i][1]>506){
                ctx2.fillRect(506-(data[i][0]-506),data[i][1],1,1)
            }
            else{
                ctx2.fillRect(1006-(data[i][0]),data[i][1],1,1)
            }
        }
    }
    else if(e==="reflectOrigin"){
        for (i=0;i<data.length;i++){
            ctx2.fillRect(1006-data[i][0],686-data[i][1],1,1)
        }
    
    }
    
    
}

function clearOutsideArea(startX,startY,x,y){
    
    ctx2.fillRect(x,y,1,1)
    for(var i=Math.min(startX,x);i<Math.max(startX,x);i++){
        ctx2.fillRect(i,startY,1,1)
        
    }
    for(var i=Math.min(startY,y);i<Math.max(startY,y);i++){
        ctx2.fillRect(x,i,1,1)
    }
    for(var i=Math.min(startY,y);i<Math.max(startY,y);i++){
        ctx2.fillRect(startX,i,1,1)
    }
    for(var i=Math.min(startX,x);i<Math.max(startX,x);i++){
        ctx2.fillRect(i,y,1,1)
    }
    ctx2.clearRect(0,0,Math.min(startX,x),1000)
    ctx2.clearRect(0,0,1000,Math.min(startY,y))
    ctx2.clearRect(Math.max(startX,x)+2,Math.min(startY,y),1000,1000)
    ctx2.clearRect(0,Math.max(startY,y)+2,1000,1000)
}

function clearInsideArea(startX,startY,x,y){
    ctx2.clearRect(Math.min(startX,x),Math.min(startY,y),Math.max(startX+5,x+5)-Math.min(startX-5,x-5),Math.max(startY+5,y+5)-Math.min(startY-5,y-5))
}

//Dropdown Javascript

function myFunction(content) {
    document.getElementById(content).classList.toggle("show");
  }


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


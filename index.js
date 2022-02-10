const container=d3.select('.container');

const svg = container
  .append("svg")
  .attr("height", window.innerHeight)
  .attr("width", window.innerWidth);


let digits=[
  [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
  ],
  [
    [0,1,0],
    [1,1,0],
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [1,1,1],
  ],
  [
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [1,1,1],
    [1,0,0],
    [1,0,0],
    [1,1,1],
  ],
  [
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [1,1,1],
  ],
  [
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
  ],
  [
    [1,1,1],
    [1,0,0],
    [1,0,0],
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [1,1,1],
  ],
  [
    [1,1,1],
    [1,0,1],
    [1,0,0],
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
  ],
  [
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
  ],
  [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
  ],
  [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [1,1,1],
  ],
]


let squareData={
  height:45,
  width:45,
  x:0,
  y:0,
  color:"black",
  margin:0
}

let makeDigit=(d)=>{
  let digitData=[];

  for(let i=0;i<7;i++){
    for(let j=0;j<3;j++){
      let currSquare={...squareData};
      currSquare.x=j*(currSquare.width+currSquare.margin)+d+250;
      currSquare.y=i*(currSquare.width+currSquare.margin)+200;

      digitData.push(currSquare);
    }
  }
  return digitData;
}

let clockdata=[];
let gap=0;
for(let i=0;i<6;i++){
  let d=i*(3*(squareData.width+squareData.margin)+10);
  if(i==2)
    gap+=squareData.width;
  else if(i==4)
    gap+=squareData.width
  clockdata.push(makeDigit(d+gap));
}



let virtualObjects=[];
for(let i=0;i<6;i++){
  virtualObjects.push(svg.selectAll("rect").data(clockdata[i]))
}



let render=()=>{
  for(let i=0;i<6;i++){
  virtualObjects[i].enter()
  .append("rect")
  .attr("height",(d)=>d.height)
  .attr("width",(d)=>d.width)
  .attr("x",(d)=>d.x)
  .attr("y",(d)=>d.y)
  .attr("margin",(d)=>d.margin)
  .attr("fill",(d)=>d.color)
  }
}

let updateDigit=(digitData,s)=>{
  for(let i=0;i<digitData.length;i++){
    let r=Math.floor(i/3);
    let c=i%3;

    if(digits[s][r][c]===1){
      digitData[i].color='white';
    }else{
      digitData[i].color='black';
    }
  }
}

let updateAllDigits=(h,m,s)=>{
  updateDigit(clockdata[0],Math.floor(h/10));
  updateDigit(clockdata[1],h%10);
  updateDigit(clockdata[2],Math.floor(m/10));
  updateDigit(clockdata[3],m%10);
  updateDigit(clockdata[4],Math.floor(s/10));
  updateDigit(clockdata[5],s%10);
}


setInterval(()=>{
  let time=new Date();
  let h=time.getHours();
  let m=time.getMinutes();
  let s=time.getSeconds();
  
  updateAllDigits(h%12,m,s);
  render();
},1000);

var game=[];
var played=[];
var flags=0;
var numMines=6;

//0,0 is in the top left

//0=no mines in sight
//1-8=# of adjacent mines
//9=mine

var colors=["", "#0377fc", "#4bbf4b", "#b81f1f", "#6822bd", "#bbd41e", "#1fc6cc", "#363d3d", "#22345e"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateMines(num){
    for(i=0;i<num;i++){
        var x=getRandomInt(8);
        var y=getRandomInt(8);
        while(game[x][y]!=0){
            x=getRandomInt(8);
            y=getRandomInt(8);
        }
        game[x][y]=9;
    }
}

function calcValues(){
    for(i=0;i<game.length;i++){
        for(j=0;j<game[i].length;j++){
            var adjMines=0;
            if(game[i][j]!=9){
                if((i-1)>=0 && (j+1)<8 && game[i-1][j+1]==9){ adjMines++; }
                if((j+1)<8 && game[i][j+1]==9){ adjMines++; }
                if((i+1)<8 && (j+1)<8 && game[i+1][j+1]==9){ adjMines++; }
                if((i-1)>=0 && game[i-1][j]==9){ adjMines++; }
                if((i+1)<8 && game[i+1][j]==9){ adjMines++; }
                if((i-1)>=0 && (j-1)>=0 && game[i-1][j-1]==9){ adjMines++; }
                if((j-1)>=0 && game[i][j-1]==9){ adjMines++; }
                if((i+1)<8 && (j-1)>=0 && game[i+1][j-1]==9){ adjMines++; }
                game[i][j]=adjMines;
            }
        }
    }
}

function generateBoxes(){
    var rid=0;
    var id=0;
    var ctr=0;
    for(i=0;i<game.length;i++){
        row = document.createElement("div");
        row.id="r"+rid;
        row.classList.add("row");
        document.getElementById("main").appendChild(row);
        id=0;
        for(j=0;j<game[i].length;j++){
            box = document.createElement("div");
            box.id=(rid*8)+id;
            box.classList.add("box");
            if(ctr%2==0){
                box.classList.add("b");
            }
            box.addEventListener("click", function (e) {
                click(e);
            });
            row.appendChild(box);
            id++;
            ctr++;
        }
        rid++;
        ctr++;
    }
}

function click(e){
    var flag=false;
    if(e.altKey){ 
        flag=true; 
        showBox(e.target, flag);
    } else {
        showBox(e.target, false);
        calculateBoxes(e.target);
    }
    checkCond(e.target, flag);
}

function showBox(el, flag){
    var x=Number(el.id%8);
    var y=Number((el.id-(el.id%8))/8);

    if (flag) {
        flags[y][x]=flags[y][x]+1;
        if(flags[y][x]%2==0){
            el.classList.remove("flag");
        } else{
            el.classList.add("flag");
        }
    } else { 
        if(game[y][x]!=0){
            el.textContent=game[y][x];
        }
        el.style.color=colors[game[y][x]];
        el.classList.add("show");
        if(game[y][x]==9){
            gameOver();
        }
    }
}

function checkCond(el, flag){
    var x=Number(el.id%8);
    var y=Number((el.id-(el.id%8))/8);

    if(game[y][x]==9&&!flag){
        gameOver();
    }

    var mines=0;
    played[y][x]=game[y][x];
    for(i=0;i<played.length;i++){
        for(j=0;j<played[i].length;j++){
            if(played[i][j]==9){
                mines++;
            }
        }
    }
    if(mines==numMines){
        win();
    }
    console.log(mines);
    debugger;
}

//dumbbbb
function contains(array, array2, param){
    for(i=0;i<array.length;i++){
      if(array[i][0]==param[0]&&array[i][1]==param[1]){ return true; }
    }
    for(i=0;i<array2.length;i++){
        if(array2[i][0]==param[0]&&array2[i][1]==param[1]){ return true; }
    }
    return false;
}
  

function calculateBoxes(start){
    var explored=[];
    var temp=[Number((start.id%8)), Number((start.id-(start.id%8))/8)]
    if(game[temp[1]][temp[0]]==0){
        var waiting=[[temp[0], temp[1]]];
        while(waiting.length>0){
            var current=waiting.pop();
            
            var i=current[0];
            var j=current[1];
            if((i-1)>=0 && (j+1)<8 && !contains(explored, waiting, ([i-1, j+1]))){ 
                if(game[j+1][i-1]==0){
                    waiting.unshift([i-1, j+1]); 
                } else{
                    explored.push([i-1, j+1]);
                }
            } 
            if((j+1)<8 && !contains(explored, waiting, ([i, j+1]))){ 
                if(game[j+1][i]==0){
                    waiting.unshift([i, j+1]); 
                } else{
                    explored.push([i, j+1]);
                }
            } 
            if((i+1)<8 && (j+1)<8 && !contains(explored, waiting, ([i+1, j+1]))){ 
                if(game[j+1][i+1]==0){
                    waiting.unshift([i+1, j+1]); 
                } else{
                    explored.push([i+1, j+1]);
                }
            }
            if((i-1)>=0 && !contains(explored, waiting, ([i-1, j]))){ 
                if(game[j][i-1]==0){
                    waiting.unshift([i-1, j]); 
                } else{
                    explored.push([i-1, j]);
                }
            }
            if((i+1)<8 && !contains(explored, waiting, ([i+1, j]))){ 
                if(game[j][i+1]==0){
                    waiting.unshift([i+1, j]); 
                } else{
                    explored.push([i+1, j]);
                }
            }
            if((i-1)>=0 && (j-1)>=0 && !contains(explored, waiting, ([i-1, j-1]))){ 
                if(game[j-1][i-1]==0){
                    waiting.unshift([i-1, j-1]); 
                } else{
                    explored.push([i-1, j-1]);
                }
            }
            if((j-1)>=0 && !contains(explored, waiting, ([i, j-1]))){ 
                if(game[j-1][i]==0){
                    waiting.unshift([i, j-1]); 
                } else{
                    explored.push([i, j-1]);
                }
            }
            if((i+1)<8 && (j-1)>=0 && !contains(explored, waiting, ([i+1, j-1]))){ 
                if(game[j-1][i+1]==0){
                    waiting.unshift([i+1, j-1]); 
                } else{
                    explored.push([i+1, j-1]);
                }
            }
            explored.push(current);
        }
        console.log(explored);
        for(i=0;i<explored.length;i++){
            showBox(document.getElementById((explored[i][1]*8)+explored[i][0]));
        }
    }
}

function gameOver(){
    alert("Oh no! You hit a mine!");
    reset();
}

function win(){
    alert("You Won!");
    reset();
}

function reset(){
    document.body.replaceChildren([]);
    main = document.createElement("div");
    main.id="main";
    document.body.appendChild(main);
    game=[  [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
    ];
    played=[[9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9],
            [9,9,9,9,9,9,9,9]
    ];
    flags=[ [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
    ];
    generateMines(numMines);
    calcValues();
    generateBoxes();
    console.log(game);
}

reset();
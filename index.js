var game=[  [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
];

//0,0 is in the top left

//0=no mines in sight
//1-8=# of adjacent mines
//9=mine

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
    showBox(e.target);
    calculateBoxes(e.target);
}

function showBox(el){
    var x=Number(el.id%8);
    var y=Number((el.id-(el.id%8))/8);
    
    console.log(el.id, x, y);
    if(game[y][x]!=0){
        el.textContent=game[y][x];
    }
    el.classList.add("show");
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
    console.log(temp[0], temp[1]);
    if(game[temp[1]][temp[0]]==0){
        var waiting=[[temp[0], temp[1]]];
        while(waiting.length>0){
            var current=waiting.pop();
            
            var i=current[0];
            var j=current[1];
            if((i-1)>=0 && (j+1)<8 && game[j+1][i-1]==0 && !contains(explored, waiting, ([i-1, j+1]))){ waiting.unshift([i-1, j+1]); } 
            if((j+1)<8 && game[j+1][i]==0 && !contains(explored, waiting, ([i, j+1]))){ waiting.unshift([i, j+1]); } 
            if((i+1)<8 && (j+1)<8 && game[j+1][i+1]==0 && !contains(explored, waiting, ([i+1, j+1]))){ waiting.unshift([i+1, j+1]); }
            if((i-1)>=0 && game[j][i-1]==0 && !contains(explored, waiting, ([i-1, j]))){ waiting.unshift([i-1, j]); }
            if((i+1)<8 && game[j][i+1]==0 && !contains(explored, waiting, ([i+1, j]))){ waiting.unshift([i+1, j]); }
            if((i-1)>=0 && (j-1)>=0 && game[j-1][i-1]==0 && !contains(explored, waiting, ([i-1, j-1]))){ waiting.unshift([i-1, j-1]); }
            if((j-1)>=0 && game[j-1][i]==0 && !contains(explored, waiting, ([i, j-1]))){ waiting.unshift([i, j-1]); }
            if((i+1)<8 && (j-1)>=0 && game[j-1][i+1]==0 && !contains(explored, waiting, ([i+1, j-1]))){ waiting.unshift([i+1, j-1]); }

            explored.push(current);
            //debugger;
        }
        console.log(explored);
        for(i=0;i<explored.length;i++){
            showBox(document.getElementById((explored[i][1]*8)+explored[i][0]));
        }
    }
}

generateMines(9);
calcValues();
generateBoxes();
console.log(game);
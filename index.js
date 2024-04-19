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
        row.id=rid;
        row.classList.add("row");
        document.getElementById("main").appendChild(row);
        id=0;
        for(j=0;j<game[i].length;j++){
            box = document.createElement("div");
            box.id=id;
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
    var x=e.target.id;
    var y=e.target.parentElement.id;
    e.target.textContent=game[x][y];
}

function showBox(x,y){
    document.getElementById()
}

function showBoxes(x,y){
    g=true;
    while(g){

    }
}

generateMines(9);
calcValues();
generateBoxes();
console.log(game);
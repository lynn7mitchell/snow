window.onload = makeItSnow("sky", "white");
window.onload = makeItSnow("othersky", "white");

var audio = new Audio('../audio/videoplayback.m4a');
audio.play();

function makeItSnow(canvasId, color, speed){
    
    //get the canvas and context and store in vars
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    
    //set canvas dims to window height and width
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    
    ctx.globalCompositeOperation = "destination-over";
    
    //generate the snowflakes and apply attributes
    var mf = 2000; //max flakes
    var flakes = []
    
    
    //loop though the empty flakes and apply attributes
    for(var i = 0; i < mf; i++){
        
        flakes.push({
            x: Math.random()*W,
            y: Math.random()*H,
            r: Math.random()*5+2, //min of 2px and max 7px
            d: Math.random() + 1 //desity of the flake
        })
    }
    
    //draw flakes onto canvas
    function drawFlakes(){
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = color;
        ctx.beginPath();
        for(var i = 0; i < mf; i++){
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
    }
    
    
    //animate the flakes
    var angle = 0;
    
    function moveFlakes(){
        angle += 0.01;
        for(var i = 0; i < mf; i++){
            //store current flake
            var f = flakes[i];
            
            //update X and Y coordinates of each snowflake
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;
            
            //if the snowglake reaches the bottom, send a new on to the top
            if(f.y > H){
                flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d};
            }
        }
    }
   
    
    setInterval(drawFlakes, 25);
}



window.onload = function() {
    alert(`
    • Use △ button to move up.
    • Use ▷ button to move right.
    • Use ▽ button to move down.
    • Use ◁ button to move left.
    • Enjoy ♥️♥️
@BS_Linux_2
Black Storm.
        
        
    # Social
        
    • Instagram : https://instagram.com/hossam_reda_96
    
    • Telegram: https://t.me/BS_Linux_2
    
    • Telegram Bot: https://t.me/hossam7bot
    
    • Github : https://github.com/BSLinux4
        `);
        
    let audio = new Audio('https://github.com/ayushkumarsingh2422005/snake-grid-game/blob/main/music?raw=true');
    audio.autoplay = true;
    audio.volume = 0.5;
    let food = new Audio('https://github.com/ayushkumarsingh2422005/snake-grid-game/blob/main/food?raw=true');
    let gameovers = new Audio('https://github.com/ayushkumarsingh2422005/snake-grid-game/blob/main/gameover?raw=true');
    let moves = new Audio('https://github.com/ayushkumarsingh2422005/snake-grid-game/blob/main/move?raw=true')
    
    const up_btn = document.querySelector('#up');
    const right_btn = document.querySelector('#right');
    const down_btn = document.querySelector('#down');
    const left_btn = document.querySelector('#left');
    const board = document.querySelector('#board');
    const move = document.querySelector('#move');
    const joystick = document.querySelector('#joystick');
    const score_board = document.querySelector('#score');
    var score = 0;
    var direction = 0;
    var sped = null;
    var snake_pos = [
        { x: 12, y: 12 }
    ];
    var food_pos = {
        x : 12,
        y : 13
    }
    var inteval;
    document.querySelector('#strt').onclick = function() {
        audio.play();
        var inp = document.querySelectorAll('input');
        document.querySelector('#start').style.display = 'none';
        if (inp[0].checked == true) {
            sped = 350;
        }
        if (inp[1].checked == true) {
            sped = 200;
        }
        if (inp[2].checked == true) {
            sped = 120;
        }
        if (inp[3].checked == true) {
            sped = 70;
        }
        
        inteval = setInterval(run_snake, sped);
    }
    document.querySelector("#restart").onclick = function(){
        document.querySelector('#start').style.display = 'block';
        document.querySelector('#end').style.display = 'none';
        
        score = 0;
        snake_pos = [
            { x: 12, y: 12 }
        ];
        food_pos = {
            x: 12,
            y: 13
        }
        clearInterval(inteval);
        direction = 0;
    }
    
    
    function getRandom() { // min and max included 
        return Math.floor(Math.random() * (25 - 1 + 1) + 1);
    }
    function gameover(){
        document.querySelector('#end').style.display = 'block';
        document.querySelector('#final').innerHTML = 'Score : '+score;
        gameovers.play();
    }
    function run_snake() {
        /*if(
            (snake_pos[0].x+1)==27 || 
            (snake_pos[0].y+1)==27 || 
            (snake_pos[0].x-1)==-1 || 
            (snake_pos[0].y-1)==-1
        ){
            //console.log('game up');
            clearInterval(inteval);
            gameover();
            return;
        }*/
        var new_x = snake_pos[0].x;
        var new_y = snake_pos[0].y;
        switch (direction) {
            case 1:
                new_y = snake_pos[0].y + 1;
                if (new_y > 25) {
                    clearInterval(inteval);
                    gameover();
                    return;
                }
                break;
            case -2:
                new_x = snake_pos[0].x + 1;
                if (new_x > 25) {
                    clearInterval(inteval);
                    gameover();
                    return;
                }
                break;
            case -1:
                new_y = snake_pos[0].y - 1;
                if (new_y < 0) {
                    clearInterval(inteval);
                    gameover();
                    return;
                }
                break;
            case 2:
                new_x = snake_pos[0].x - 1;
                if (new_x < 0) {
                    clearInterval(inteval);
                    gameover();
                    return;
                }
                break;
        }
        if(snake_pos[0].x == food_pos.x && snake_pos[0].y == food_pos.y){
            food.play();
            score_board.innerHTML = 'Score : '+(++score);
            food_pos.x = getRandom();
            food_pos.y = getRandom();
            snake_pos.unshift({x : new_x, y : new_y});
        }
        else{
            snake_pos.unshift({x : new_x, y : new_y});
            snake_pos.pop();
        }
        //console.log(JSON.stringify(snake_pos));
        board.innerHTML = '';
        for (i in snake_pos) {
            let element = document.createElement('div');
            element.style.gridRowStart = snake_pos[i].x;
            element.style.gridColumnStart = snake_pos[i].y;
            element.classList.add('body');
            board.appendChild(element);
        }
        let element_f = document.createElement('div');
        element_f.style.gridRowStart = food_pos.x;
        element_f.style.gridColumnStart = food_pos.y;
        element_f.classList.add('food');
        board.appendChild(element_f);
    }
    function confirm_direction(direction_new) {
        if(direction == (- direction_new)){
            return;
        }
        else{
            direction = direction_new;
            moves.play();
        }
    }
    up_btn.onclick = function(){
        confirm_direction(2);
    }
    right_btn.onclick = function() {
        confirm_direction(1);
    }
    down_btn.onclick = function() {
        confirm_direction(-2);
    }
    left_btn.onclick = function() {
        confirm_direction(-1);
    }
    //inteval = setInterval(run_snake, sped);
    
    
    
    move.ontouchstart = function(){
        clearInterval(inteval);
    }
    move.ontouchmove = function(event){
        joystick.style.left = event.touches[0].clientX - 75 +'px'
        joystick.style.top = event.touches[0].clientY - 75+'px'
        //console.log(event.touches[0].clientX)
    }
    move.ontouchend = function(){
        inteval = setInterval(run_snake, sped);
    }
}
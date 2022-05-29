const changeBotStatus = (a) => {
    let firstMoveCurrentEl = document.querySelector("#settings .first-move .current") ;
    let status = ['Off','Easy','Medium','Hard'];
    let index;
    index =  status.indexOf(Game.bot) >= 0 ? status.indexOf(Game.bot) : 0 ;
    if (a=='r'){
       index++;
       index > status.length-1 ? index=3 : '' ;
    }else if (a=='l'){
       index--;
       index < 0 ? index=0 : '';
    }
    Game.bot = status[index];
 
    if (Game.bot == 'Off'){
       Game.player_name[0] = "Player 1";
       if (firstMoveCurrentEl.innerHTML == "Bot (AI)") firstMoveCurrentEl.innerHTML = "Player 1";
       
    }else{
       Game.player_name[0] = "Bot (AI)";
       if (firstMoveCurrentEl.innerHTML == "Player 1") firstMoveCurrentEl.innerHTML = "Bot (AI)";
       
    }
 
    document.querySelector("#settings .bot .current").innerHTML = Game.bot;
 
    
 }
 
 
 const openSettings = () =>{
    let settings = document.getElementById('settings');
    let board = document.querySelector("#game .board");
    settings.style = " display : block  ; position :absolute ; left :500px ;top : 100px ;z-index: 99;";
    board.style.display = "none";
 }
 const closeSetting = () => {
    let settings = document.getElementById('settings');
    let board = document.querySelector("#game .board");
    
    if (board.childElementCount >0){
       settings.style.display = "none";
       board.style.display  = "block";
    }
 }
 
 const checkBackJump = (item) =>{
    let pointer = document.querySelector('.back-jump .pointer')
    let groupElement = document.querySelector('.back-jump .group')
    pointer.classList[1] = '';
    pointer.classList.toggle('back-jump-1');
 
    if ( Game.back_jump == 'on' ){
       Game.back_jump = 'off'
    }else{
       Game.back_jump = 'on';
    }
    
 }
 const changeSkin = (element, player) => {
    // if (event.target.parentElement.dataset.color != undefined){kind = event.target.parentElement.dataset.color;}else{kind =  event.target.dataset.color;}
    let playerSkin = element.dataset.skin;
    let opponent = player+1;
    if (opponent>2) { opponent -=2  }
   
    Game.player_skin[player - 1] = playerSkin;
    document.querySelector("#settings .skins .player-" + player + " .active-skin").classList.remove('active-skin');
    document.querySelectorAll("#settings .skins .player-" + player + " img").forEach((item) => {
       if (item.dataset.skin == playerSkin ) {
          item.classList.add('active-skin');
       }
    })
 
    if (Game.player_skin[0] == Game.player_skin[1]) {
       for (i=0;i<Game.skins.length;i++){
             if (Game.skins[i] != playerSkin){
             Game.player_skin[opponent-1] = Game.skins[i];
             document.querySelector("#settings .skins .player-" + opponent + ' .active-skin ').classList.remove('active-skin');
             document.querySelectorAll("#settings .skins .player-"+ opponent + " img").forEach((item)=>{
                if (item.dataset.skin == Game.skins[i]){
                   item.classList.add('active-skin');
                }
             })
             break;
          }
       }
    }
 } 
 const exchangeSkin = () => {
    document.querySelectorAll("#settings .skins img").forEach((item)=>{
       if ( item.classList.contains('active-skin') ) {
          item.classList.remove('active-skin');
       }
    });
    [Game.player_skin[0], Game.player_skin[1]] = [Game.player_skin[1], Game.player_skin[0]];
 
    document.querySelectorAll('#settings .skins .player-1 img').forEach((item)=>{
       if (item.dataset.skin == Game.player_skin[0]){
          item.classList.add('active-skin');
       }
    })
    document.querySelectorAll('#settings .skins .player-2 img').forEach((item)=>{
       if (item.dataset.skin == Game.player_skin[1]){
          item.classList.add('active-skin');
       }
    })
 
 
 }
 const toggleSound = () => {
    if (Game.audio == 'on') {
       Game.audio = 'off';
       document.querySelector('.toggle-sound').src = 'images/audio-off.png';
    } else if (Game.audio == 'off') {
       Game.audio = 'on';
       document.querySelector('.toggle-sound').src = 'images/audio-on.png';
    }
 }
 
 const toggleMusic = () => {
    if (Game.music == 'on') {
       Game.music = 'off';
       document.querySelector('.toggle-music').src = 'images/audio-off.png';
    } else if (Game.music == 'off') {
       Game.music = 'on';
       document.querySelector('.toggle-music').src = 'images/audio-on.png';
    }
 }
 const changeFirstMover = (a) => {
    let element =  document.querySelector('.first-move .current');
    let p = Game.turn;
    p++;
    if (p > 2) p = p - 2
    Game.turn = p;
    element.innerHTML  = Game.player_name[p-1];
 }
 function GameAudio() {
    if (Game.audio == 'on') {
       var audio = new Audio('audio/retro-game.wav');
       audio.play();
       audio.volume = 0.1;
    }
 }
 
 function GameMusic() {
    if (Game.music == 'on') {
       let audio = new Audio('audio/sad-piano.mp3');
       audio.loop = true;
       audio.play();
    }
 }
 function changeVolume(e) {
    let pointerElement = document.querySelector("#settings .music .pointer");
    let startPosition = document.querySelector("#settings .music .bar").getBoundingClientRect().left;
    console.log(startPosition);
    let currentPosition = e.clientX;
    let result = currentPosition - startPosition;
    console.log(e);
    if (result > 100) { result = 100 }
    else if (result < 0) { result = 0 }
    Game.music = result;
    pointerElement.style.left = result + "px";
 
 
 
 }
 
 
 
 const playNewGame = (stone_count) => {
    document.getElementById('game').style.display = 'block';
    document.querySelector("#game .board").style.display = "block";  
    document.querySelector("#game .board").innerHTML = "";
    document.getElementById('settings').style.display = 'none';
    Game.turn_element.innerHTML = Game.player_name[Game.turn-1];
 
    if (Game.player_name[Game.turn-1] == 'Bot (AI)' ){
       playAI();
    }
 
    startGame(stone_count);
 }
 
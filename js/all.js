var Game = {
    skins: ['black', 'red', 'white'],
    player_skin: ['black', 'red'],
    player_name: ['Player 1', 'Player 2'],
    audio: 'on',
    music: 'off',
    back_jump: 'on',
    bot: 'off',
    turn: 1,
    turn_element: document.querySelector("#game .nav .current"),
    selected_stone: [0, 0],
    selected_stone_type: 0,
    selected_stone_span: 0,
    possible_move: [],
    createStone: function (player, type = 'a') {

        let imgElement = document.createElement('img');
        imgElement.dataset.player = player;
        imgElement.dataset.type = type;
        imgElement.setAttribute("onclick", "firstStep(event)");
        imgElement.src = 'images/stone/' + Game.player_skin[player - 1] + '-' + type + '.png';
        return imgElement;
    }

}




const startGame = (stone_count = 12) => {
    let max = 12 / 4;
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let color;
            if (i % 2 == 1 & j % 2 == 0 || i % 2 == 0 & j % 2 == 1) { color = "primary" } else { color = "secondary " }
            document.querySelector('#game .board').innerHTML += ` <span class="${color}  for-1-${i}-${j} for-2-${9 - i}-${j}"   >  </span> `;
        }
    }

    // b tipli stonelarin testi

    //  document.querySelector('.game .for-1-3-4').append(Game.createStone(1,'b'))
    //  document.querySelector('.game .for-1-5-4').append(Game.createStone(1,'b'))
    //  document.querySelector('.game .for-1-7-6').append(Game.createStone(1,'b'))
    //  document.querySelector('.game .for-1-3-8').append(Game.createStone(1,'b'))
    //  document.querySelector('.game .for-2-1-3').append(Game.createStone(2,'b'))

    if (stone_count == 8) max = 8 / 4;
    if (stone_count == 4) max = 4 / 4;

    for (let i = 1; i <= max; i++) {
        for (let j = 1; j <= 8; j++) {
            if (i % 2 == 1 & j % 2 == 0 || i % 2 == 0 & j % 2 == 1) {
                document.querySelector(`.game .for-1-${i}-${j}`).append(Game.createStone(1));
            }
        }
    }

    for (let i = 1; i <= max; i++) {
        for (let j = 1; j <= 8; j++) {
            if (i % 2 == 1 & j % 2 == 1 || i % 2 == 0 & j % 2 == 0) {
                document.querySelector(`.game .for-2-${i}-${j}`).append(Game.createStone(2));
            }
        }
    }

    GameMusic();

}



function firstStep(event) {
    let i, j, result_1, result_2;
    let player = event.target.dataset.player;
    if (Game.turn != player) return false;

    if (Game.selected_stone[0] != 0) {
        Game.selected_stone_span.classList.remove('active');
        Game.possible_move.forEach((item) => { document.querySelector(item).classList.remove('green'); document.querySelector(item).setAttribute("onclick", "") })
    }

    i = parseInt(event.target.parentElement.classList[player].slice(6, 7));
    j = parseInt(event.target.parentElement.classList[player].slice(8));
    Game.selected_stone = [i, j];
    Game.selected_stone_span = document.querySelector(`.game .for-${Game.turn}-${Game.selected_stone[0]}-${Game.selected_stone[1]}`);
    Game.selected_stone_span.classList.add('active');
    Game.selected_stone_type = event.target.dataset.type;
    Game.selected_stone_type == 'a' ? stoneA() : stoneB();
}









function checkSlotStatus(i, j) {
    let item = document.querySelector(`.for-${Game.turn}-${i}-${j}`) || false;
    if (item === false) {
        return false;
    }

    if (item.childElementCount == 0) {
        return 'empty';
    } else if (item.children[0].dataset.player == Game.turn) {
        return 'same';
    }
    else {
        return 'opponent';
    }


}

function makeItGreen(x, y, trash = []) {
    let g = document.querySelector(`.for-${Game.turn}-${x}-${y}`)
    Game.possible_move.push(`.for-${Game.turn}-${x}-${y}`);
    g.classList.add('green');
    g.setAttribute('onclick', `moveStone(${x},${y},[` + trash.join(',') + `])`);
}

function moveStone(x, y, trash = []) {
    let i = Game.selected_stone[0]; let j = Game.selected_stone[1];
    document.querySelector(`.for-${Game.turn}-${i}-${j}`).children[0].remove();
    let type = (Game.selected_stone_type == 'b' || x == 8) ? 'b' : 'a';
    document.querySelector(`.for-${Game.turn}-${x}-${y}`).append(Game.createStone(Game.turn, type));
    Game.possible_move.forEach((item) => { document.querySelector(item).classList.remove('green'); document.querySelector(item).setAttribute("onclick", "") })

    if (trash.length > 0) {
        for (let index = 0; index < trash.length; index += 2) {
            let son = document.querySelector(`.for-${Game.turn}-${trash[index]}-${trash[index + 1]}`) || false;
            if (son != false & typeof son !== undefined) {
                son.children[0].remove();
            }
        }
    }

    Game.turn == 1 ? Game.turn = 2 : Game.turn = 1;
    Game.selected_stone_span.classList.remove('active');
    Game.selected_stone = [0, 0];
    Game.selected_stone_type = 0;
    Game.selected_stone_span = null;
    console.log();
    let counter = 0;
    document.querySelectorAll("#game .board img").forEach((item) => {
        if (item.dataset.player == Game.turn) counter++

    })

    document.querySelector("#game .nav .current").innerHTML = Game.turn == 1 ? 'Computer' : 'Player 2'
    if (counter == 0) {
        alert("you lose");
        playNewGame();
    }


    GameAudio();




}

const changeBotStatus = (a) => {
    let firstMoveCurrentEl = document.querySelector("#settings .first-move .current");
    let status = ['Off', 'Easy', 'Medium', 'Hard'];
    let index;
    index = status.indexOf(Game.bot) >= 0 ? status.indexOf(Game.bot) : 0;
    if (a == 'r') {
        index++;
        index > status.length - 1 ? index = 3 : '';
    } else if (a == 'l') {
        index--;
        index < 0 ? index = 0 : '';
    }
    Game.bot = status[index];

    if (Game.bot == 'Off') {
        Game.player_name[0] = "Player 1";
        if (firstMoveCurrentEl.innerHTML == "Bot (AI)") firstMoveCurrentEl.innerHTML = "Player 1";

    } else {
        Game.player_name[0] = "Bot (AI)";
        if (firstMoveCurrentEl.innerHTML == "Player 1") firstMoveCurrentEl.innerHTML = "Bot (AI)";

    }

    document.querySelector("#settings .bot .current").innerHTML = Game.bot;


}


const openSettings = () => {
    let settings = document.getElementById('settings');
    let board = document.querySelector("#game .board");
    settings.style = " display : block  ; width:600px; position :absolute ; left :700px ;top : 10px ;z-index: 99;";
    board.style.display = "none";
}
const closeSetting = () => {
    let settings = document.getElementById('settings');
    let board = document.querySelector("#game .board");

    if (board.childElementCount > 0) {
        settings.style.display = "none";
        board.style.display = "block";
    }
}

const checkBackJump = (item) => {
    let pointer = document.querySelector('.back-jump .pointer')
    let groupElement = document.querySelector('.back-jump .group')
    pointer.classList[1] = '';
    pointer.classList.toggle('back-jump-1');

    if (Game.back_jump == 'on') {
        Game.back_jump = 'off'
    } else {
        Game.back_jump = 'on';
    }

}
const changeSkin = (element, player) => {
    // if (event.target.parentElement.dataset.color != undefined){kind = event.target.parentElement.dataset.color;}else{kind =  event.target.dataset.color;}
    let playerSkin = element.dataset.skin;
    let opponent = player + 1;
    if (opponent > 2) { opponent -= 2 }

    Game.player_skin[player - 1] = playerSkin;
    document.querySelector("#settings .skins .player-" + player + " .active-skin").classList.remove('active-skin');
    document.querySelectorAll("#settings .skins .player-" + player + " img").forEach((item) => {
        if (item.dataset.skin == playerSkin) {
            item.classList.add('active-skin');
        }
    })

    if (Game.player_skin[0] == Game.player_skin[1]) {
        for (i = 0; i < Game.skins.length; i++) {
            if (Game.skins[i] != playerSkin) {
                Game.player_skin[opponent - 1] = Game.skins[i];
                document.querySelector("#settings .skins .player-" + opponent + ' .active-skin ').classList.remove('active-skin');
                document.querySelectorAll("#settings .skins .player-" + opponent + " img").forEach((item) => {
                    if (item.dataset.skin == Game.skins[i]) {
                        item.classList.add('active-skin');
                    }
                })
                break;
            }
        }
    }
}
const exchangeSkin = () => {
    document.querySelectorAll("#settings .skins img").forEach((item) => {
        if (item.classList.contains('active-skin')) {
            item.classList.remove('active-skin');
        }
    });
    [Game.player_skin[0], Game.player_skin[1]] = [Game.player_skin[1], Game.player_skin[0]];

    document.querySelectorAll('#settings .skins .player-1 img').forEach((item) => {
        if (item.dataset.skin == Game.player_skin[0]) {
            item.classList.add('active-skin');
        }
    })
    document.querySelectorAll('#settings .skins .player-2 img').forEach((item) => {
        if (item.dataset.skin == Game.player_skin[1]) {
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
    let element = document.querySelector('.first-move .current');
    let p = Game.turn;
    p++;
    if (p > 2) p = p - 2
    Game.turn = p;
    element.innerHTML = Game.player_name[p - 1];
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
    Game.turn_element.innerHTML = Game.player_name[Game.turn - 1];

    if (Game.player_name[Game.turn - 1] == 'Bot (AI)') {
        playAI();
    }

    startGame(stone_count);
}

function stoneA(i = Game.selected_stone[0], j = Game.selected_stone[1]) {
    let cases = [i + 1, j + 1, i + 1, j - 1]
    for (let index = 0; index < cases.length; index = index + 2) {
        checkSlotStatus(cases[index], cases[index + 1]) == 'empty' ? makeItGreen(cases[index], cases[index + 1]) : '';
    }


    stoneA_1(i, j);
    stoneA_2(i, j);

    if (Game.back_jump == 'on'){
        stoneA_3(i, j);
        stoneA_4(i, j);
    }

   
}

function stoneA_1(i, j, trash = []) {
    if (checkSlotStatus(i + 1, j + 1) == 'opponent' & checkSlotStatus(i + 2, j + 2) == 'empty') {
        trash.push(i + 1, j + 1);
        makeItGreen(i + 2, j + 2, trash);
        stoneA_(i + 2, j + 2, trash, 1);
    }
}
function stoneA_2(i, j, trash = []) {
    if (checkSlotStatus(i + 1, j - 1) == 'opponent' & checkSlotStatus(i + 2, j - 2) == 'empty') {
        trash.push(i + 1, j - 1);
        makeItGreen(i + 2, j - 2, trash);
        stoneA_(i + 2, j - 2, trash, 2);
    }
}

function stoneA_3(i, j, trash = []) {
    if (checkSlotStatus(i - 1, j + 1) == 'opponent' & checkSlotStatus(i - 2, j + 2) == 'empty') {
        trash.push(i - 1, j + 1);
        makeItGreen(i - 2, j + 2, trash);
        stoneA_(i - 2, j + 2, trash, 3);
    }
}
function stoneA_4(i, j, trash = []) {
    if (checkSlotStatus(i - 1, j - 1) == 'opponent' & checkSlotStatus(i - 2, j - 2) == 'empty') {
        trash.push(i - 1, j - 1);
        makeItGreen(i - 2, j - 2, trash, 3);
        stoneA_(i - 2, j - 2, trash, 4);
    }
}

function stoneA_(i, j, trash, next) {

    if (next == 1) {
        stoneA_1(i, j, trash); stoneA_2(i, j, trash);
        Game.back_jump == 'on' ? stoneA_3(i, j, trash) : '' ;
        
         //pass 4
    } else if (next == 2) {
        stoneA_1(i, j, trash); stoneA_2(i, j, trash); 
        Game.back_jump == 'on' ? stoneA_4(i, j, trash) : '' ; 
    } else if (next == 3) {
        stoneA_1(i, j, trash); 
        if (Game.back_jump == "on") {stoneA_3(i, j); stoneA_4(i, j, trash); } // pass 2
    } else if (next == 4) {
        stoneA_2(i, j, trash); stoneA_3(i, j, trash); 
        Game.back_jump == 'on' ? stoneA_4(i, j, trash) : ''  ; // pass 1
    }

}
function stoneB(i = Game.selected_stone[0], j = Game.selected_stone[1]) {
    stoneB_1(i, j);
    stoneB_2(i, j);
    stoneB_3(i, j);
    stoneB_4(i, j);

}

function stoneB_1(i, j, trash = []) {
    let haveYouSeenEnemy = false;
    while (j < 8) {
        i++; j++;
        if (checkSlotStatus(i, j) == 'empty') {
            makeItGreen(i, j, trash);
            if (haveYouSeenEnemy) {
                stoneB_(i, j, trash, 1);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j + 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i + 1, j + 1, trash);
            stoneB_(i + 1, j + 1, trash, 1);
            haveYouSeenEnemy = true;
            i++, j++;
        } else {
            break;
        }
    }

}

function stoneB_2(i, j, trash = []) {
    let haveYouSeenEnemy = false;
    while (j > 1) {
        i++; j--;
        if (checkSlotStatus(i, j) == 'empty') {
            makeItGreen(i, j, trash);
            if (haveYouSeenEnemy) {
                stoneB_(i, j, trash, 2);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j - 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i + 1, j - 1, trash);
            stoneB_(i + 1, j - 1, trash, 2);
            haveYouSeenEnemy = true;
            i++; j--;
        } else {
            break;
        }
    }

}

function stoneB_3(i, j, trash = []) {
    let haveYouSeenEnemy = false;
    while (j < 8) {
        i--; j++;
        if (checkSlotStatus(i, j) == 'empty') {
            makeItGreen(i, j, trash);
            if (haveYouSeenEnemy) {
                stoneB_(i, j, trash, 3);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j + 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i - 1, j + 1, trash);
            stoneB_(i - 1, j + 1, trash, 3);
            haveYouSeenEnemy = true;
            i--; j++;
        } else {
            break;
        }
    }

}
function stoneB_4(i, j, trash = []) {
    let haveYouSeenEnemy = false;
    while (j > 1) {
        i--; j--;
        if (checkSlotStatus(i, j) == 'empty') {
            makeItGreen(i, j, trash);
            if (haveYouSeenEnemy) {
                stoneB_(i, j, trash, 4);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j - 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i - 1, j - 1, trash);
            stoneB_(i - 1, j - 1, trash, 4);
            haveYouSeenEnemy = true;
            i--; j--;
        } else {
            break;
        }
    }

}
function stoneB_(i, j, trash, skip) {
    console.log('ana menu ' + i, j, trash, skip);


    if (skip == 1 || skip == 4) {
        stoneB__2(i, j, trash); stoneB__3(i, j, trash);
    }
    if (skip == 2 || skip == 3) {
        stoneB__1(i, j, trash); stoneB__4(i, j, trash);
    }


    // if (skip == 2) {
    //     stoneB__1(i, j, trash);  stoneB__4(i, j, trash);
    // }
    // if (skip == 3) {
    //     stoneB__1(i, j, trash); stoneB__3(i, j, trash); stoneB__4(i, j, trash);
    // }
    // if (skip == 4) {
    //     stoneB__2(i, j, trash); stoneB__3(i, j, trash); 
    // }

}





function stoneB__1(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j < 8) {
        i++; j++;
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j + 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i + 1, j + 1, trash, 1);
            haveYouSeenEnemy = true;
            i++; j++;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {

            makeItGreen(i, j, trash);
            stoneB_(i, j, trash, 1);
        }

    }
}


function stoneB__2(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j > 1) {
        i++; j--;
        console.log('2ci ', i, j);
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j - 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i + 1, j - 1, trash, 2);
            haveYouSeenEnemy = true;
            i++; j--;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash, 2);
        }

    }
}

function stoneB__3(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j < 8) {
        i--; j++;
        console.log('3cu' + i, j);
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j + 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i - 1, j + 1, trash, 3);
            haveYouSeenEnemy = true;
            i--; j++;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
            console.log('gelme de');
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash, 3);

        }

    }
}
function stoneB__4(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j > 1) {
        i--; j--;
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j - 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i - 1, j - 1, trash, 4);
            haveYouSeenEnemy = true;
            i--; j--;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash, 4);
        }

    }
}

function aiplay(){

}
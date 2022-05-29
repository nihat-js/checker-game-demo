var Game = {
   skins: ['black', 'red', 'white'],
   player_skin: ['black', 'red'],
   player_name : ['Player 1','Player 2'] ,
   audio: 'on',
   music: 'off',
   back_jump  : 'on' ,
   bot : 'off',
   turn: 1,
   turn_element  :document.querySelector("#game .nav .current"),
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
   if (stone_count == 4) max = 4/4;

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
   let counter  = 0;
   document.querySelectorAll("#game .board img").forEach((item)=>{
      if (item.dataset.player == Game.turn) counter ++
      
   })

   document.querySelector("#game .nav .current").innerHTML = Game.turn ==1 ? 'Computer' :  'Player 2'
   if (counter ==0){
      alert("you lose");
      playNewGame();
   }


   GameAudio();




}


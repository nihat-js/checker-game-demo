
function stoneA(i = Game.selected_stone[0], j = Game.selected_stone[1]) {
    let cases = [i + 1, j + 1, i + 1, j - 1]
    for (let index = 0; index < cases.length; index = index + 2) {
       checkSlotStatus(cases[index], cases[index + 1]) == 'empty' ? makeItGreen(cases[index], cases[index + 1]) : '';
    }
 
 
    stoneA_1(i, j);
    stoneA_2(i, j);
    stoneA_3(i, j);
    stoneA_4(i, j);
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
       stoneA_1(i, j, trash); stoneA_2(i, j, trash); stoneA_3(i, j, trash); //pass 4
    } else if (next == 2) {
       stoneA_1(i, j, trash); stoneA_2(i, j, trash); stoneA_4(i, j, trash); // pass 3
    } else if (next == 3) {
       stoneA_1(i, j, trash); stoneA_3(i, j); stoneA_4(i, j, trash); // pass 2
    } else if (next == 4) {
       stoneA_2(i, j, trash); stoneA_3(i, j, trash); stoneA_4(i, j, trash); // pass 1
    }
 
 }
 
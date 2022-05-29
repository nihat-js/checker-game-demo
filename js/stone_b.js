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
            if (haveYouSeenEnemy){
                stoneB_(i,j,trash,1);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j + 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i+1,j+1,trash);
            stoneB_(i + 1, j + 1, trash, 1);
            haveYouSeenEnemy = true;
            i++ , j++;
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
            if (haveYouSeenEnemy){
                stoneB_(i,j,trash,2);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j - 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i+1,j-1,trash);
            stoneB_(i + 1, j - 1, trash, 2);
            haveYouSeenEnemy = true;
            i++; j--;
        } else {
            break;
        }
    }

}

function stoneB_3(i, j, trash = []) {
    let haveYouSeenEnemy  = false;
    while (j < 8) {
        i--; j++;
        if (checkSlotStatus(i, j) == 'empty') {
            makeItGreen(i, j, trash);
            if (haveYouSeenEnemy){
                stoneB_(i,j,trash,3);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j + 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i-1,j+1,trash);
            stoneB_(i - 1, j + 1, trash, 3);   
            haveYouSeenEnemy = true;
            i-- ; j++;
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
            if (haveYouSeenEnemy){
                stoneB_(i,j,trash,4);
            }
        } else if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j - 1) == 'empty') {
            trash.push(i, j);
            makeItGreen(i-1,j-1,trash);
            stoneB_(i - 1, j - 1, trash, 4);
            haveYouSeenEnemy = true;
            i--;j--;
        } else {
            break;
        }
    }

}
function stoneB_(i, j, trash, skip) {
    console.log('ana menu ' +  i,j,trash,skip);


    if (skip == 1 || skip ==4 ) {
        stoneB__2(i, j, trash); stoneB__3(i, j, trash);
    }
    if (skip == 2 || skip == 3 ) {
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
            i++;j++;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
          
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash,1);
        }

    }
}


function stoneB__2(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j >1) {
        i++; j--;
        console.log('2ci ',i,j);
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i + 1, j - 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i + 1, j - 1, trash, 2);
            haveYouSeenEnemy = true;
            i++;j--;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash,2);
        }

    }
}

function stoneB__3(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j < 8) {
        i--; j++;
        console.log('3cu'+ i,j);
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j + 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i - 1, j + 1, trash, 3);
            haveYouSeenEnemy = true;
            i--;j++;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
            console.log('gelme de');
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash,3);
            
        }

    }
}


function stoneB__4(i, j, trash) {
    let haveYouSeenEnemy = false;
    while (j >1) {
        i--; j--;
        if (checkSlotStatus(i, j) == 'opponent' & checkSlotStatus(i - 1, j - 1) == 'empty') {
            trash.push(i, j);
            stoneB_(i - 1, j - 1, trash, 4);
            haveYouSeenEnemy = true;
            i--;j--;

        }
        if (checkSlotStatus(i, j) == 'empty' & haveYouSeenEnemy == true) {
            makeItGreen(i, j, trash);
            stoneB_(i, j, trash,4);
        }

    }
}
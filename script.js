var turn;
var msgLabel;
var startButton;
var resetButton;
var gridButtons;
var gridEntry;

window.addEventListener('load', init);

function init() {
    msgLabel = document.getElementById('msgLabel');
    startButton = document.getElementById('startButton');
    resetButton = document.getElementById('resetButton');
    gridButtons = document.getElementsByClassName('gridButton');

    initEvents();
    onResetClick();
}

function initEvents() {
    startButton.addEventListener('click', onStartClick);
    resetButton.addEventListener('click', onResetClick);
    for (let button of gridButtons)
        button.addEventListener('click', onGridButtonClick);
}

function onStartClick() {
    turn++;
    updateMsgLabel();
    setGridDisabled(false);
    startButton.disabled = true;
    resetButton.disabled = false;
}

function onResetClick() {
    turn = 0;
    resetGridLabel();
    resetGridEntry();
    updateMsgLabel();
    setGridDisabled(true);
    startButton.disabled = false;
    resetButton.disabled = true;
}

function onGridButtonClick(event) {
    let button = event.target;

    button.disabled = true;
    updateGridLabel(button);
    updateGridEntry(parseInt(button.id));

    let isWin = checkWin(parseInt(button.id))
    if (isWin) {
        highlightWin(isWin['ids']);
        updateMsgLabel(true);
        setGridDisabled(true);
        startButton.disabled = true;
        resetButton.disabled = false;
        return;
    }

    turn++;
    updateMsgLabel();
}

function checkWin(id) {
    var r = Math.floor(id / 10);
    var c = id % 10;
    var value = gridEntry[r][c];

    // vertical
    if (gridEntry[0][c] == value && gridEntry[1][c] == value && gridEntry[2][c] == value) {
        return { 'ids': ['0' + c, '1' + c, '2' + c] };
    }

    // horizontal
    if (gridEntry[r][0] == value && gridEntry[r][1] == value && gridEntry[r][2] == value) {
        return { 'ids': [r + '0', r + '1', r + '2'] };
    }

    // diagonal
    if (id == 10 || id == 12)
        return;
    if (gridEntry[0][0] == value && gridEntry[1][1] == value && gridEntry[2][2] == value) {
        return { 'ids': ['00', '11', '22'] };
    }
    if (gridEntry[0][2] == value && gridEntry[1][1] == value && gridEntry[2][0] == value) {
        return { 'ids': ['02', '11', '20'] };
    }
}

function highlightWin(ids) {
    ids.forEach(id => {
        document.getElementById(id).style.borderColor = 'black';
    });
}

function updateMsgLabel(isWin = false) {
    if (isWin) {
        winner = turn % 2 == 1 ? 'A' : 'B';
        msg = '<b>PLAYER ' + winner + ' WINS</b>';
    } else {
        if (turn == 0)
            msg = '';
        else if (turn == 10)
            msg = '<b>DRAW</b>';
        else if (turn % 2 == 1)
            msg = 'Player A\'s turn';
        else
            msg = 'Player B\'s turn';
    }
    msgLabel.innerHTML = msg;
}

function resetGridLabel() {
    for (let button of gridButtons) {
        button.innerText = '';
        button.style.background = 'powderblue';
        button.style.borderColor = 'unset';
    }
}

function updateGridLabel(button) {
    if (turn % 2 == 1)
        button.innerText = 'O';
    else
        button.innerText = 'X';
}

function resetGridEntry(button) {
    gridEntry = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
}

function updateGridEntry(id) {
    gridEntry[Math.floor(id / 10)][id % 10] = turn % 2;
}

function setGridDisabled(isDisabled) {
    for (let button of gridButtons)
        button.disabled = isDisabled;
}

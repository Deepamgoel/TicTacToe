var turn;
var msgLabel;
var resetButton;
var gridButtons;
var gridMatrix;

window.addEventListener('load', init);

function init() {
    msgLabel = document.getElementById('msgLabel');
    resetButton = document.getElementById('resetButton');
    gridButtons = document.getElementsByClassName('gridButton');

    initEvents();
    onResetClick();
}

function initEvents() {
    resetButton.addEventListener('click', onResetClick);
    for (let button of gridButtons)
        button.addEventListener('click', onGridButtonClick);
}

function onResetClick() {
    turn = 1;
    resetGridButtons();
    resetGridMatrix();
    updateMsgLabel(null);
    setGridDisabled(false)
}

function onGridButtonClick(event) {
    let button = event.target;

    updateGridButton(button);
    updateGridMatrix(parseInt(button.id));

    let isWin = checkWin(parseInt(button.id));
    if (isWin) {
        setGridDisabled(true);
        highlightButtons(isWin['ids']);
        updateMsgLabel(isWin['msg']);
        return;
    }

    turn++;
    updateMsgLabel(null);
}

function checkWin(id) {
    if (turn < 5)
        return;

    let r = Math.floor(id / 10);
    let c = id % 10;
    let value = gridMatrix[r][c];

    let winner = turn % 2 == 1 ? 'X' : 'O';
    let msg = '<b>PLAYER ' + winner + ' WINS</b>';

    // vertical
    if (gridMatrix[0][c] == value && gridMatrix[1][c] == value && gridMatrix[2][c] == value) {
        return {
            'ids': ['0' + c, '1' + c, '2' + c],
            'msg': msg
        };
    }

    // horizontal
    if (gridMatrix[r][0] == value && gridMatrix[r][1] == value && gridMatrix[r][2] == value) {
        return {
            'ids': [r + '0', r + '1', r + '2'],
            'msg': msg
        };
    }

    // diagonal
    if (gridMatrix[0][0] == value && gridMatrix[1][1] == value && gridMatrix[2][2] == value) {
        return {
            'ids': ['00', '11', '22'],
            'msg': msg
        };
    }
    if (gridMatrix[0][2] == value && gridMatrix[1][1] == value && gridMatrix[2][0] == value) {
        return {
            'ids': ['02', '11', '20'],
            'msg': msg
        };
    }

    if (turn == 9) {
        return {
            'ids': [
                '00', '01', '02',
                '10', '11', '12',
                '20', '21', '22'
            ],
            'msg': '<b>DRAW</b>'
        };
    }
}

function resetGridButtons() {
    for (let button of gridButtons) {
        button.disabled = false;
        button.innerText = '';
        button.style.background = 'powderblue';
        button.style.borderColor = 'unset';
    }
}

function resetGridMatrix(button) {
    gridMatrix = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
}

function updateMsgLabel(msg) {
    if (msg == null) {
        let player = turn % 2 == 1 ? 'X' : 'O';
        msg = 'Player ' + player + '\'s turn';
    }
    msgLabel.innerHTML = msg;
}

function updateGridButton(button) {
    button.disabled = true;
    if (turn % 2 == 1)
        button.innerText = 'X';
    else
        button.innerText = 'O';
}

function updateGridMatrix(id) {
    gridMatrix[Math.floor(id / 10)][id % 10] = turn % 2;
}

function setGridDisabled(isDisabled) {
    for (let button of gridButtons)
        button.disabled = isDisabled;
}

function highlightButtons(ids) {
    ids.forEach(id => {
        document.getElementById(id).style.borderColor = 'black';
    });
}

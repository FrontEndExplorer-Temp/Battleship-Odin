import '../assets/style.css';
import { GameController } from '../core/gameController.js';


const root = document.body;
root.innerHTML = '';

const status   = add('p', 'status', 'Place your ships');
const orientBtn = add('button', '', 'Rotate (Horizontal)');
const randBtn   = add('button', '', 'Randomise');
const startBtn  = add('button', '', 'Start Battle');

const boards = add('div', 'boards');
const ownGrid   = makeGrid('own');
const enemyGrid = makeGrid('enemy');
boards.append(ownGrid, enemyGrid);

const controller = new GameController();


let orientation = 'horizontal';
let lengths     = [5, 4, 3, 3, 2];

orientBtn.onclick = () => {
  orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
  orientBtn.textContent = `Rotate (${orientation[0].toUpperCase()})`;
};

randBtn.onclick = () => {
  controller.randomiseHumanFleet();
  lengths     = [];
  orientation = 'horizontal';
  status.textContent = 'Fleet randomised – click “Start Battle”';
  render();
};

startBtn.onclick = () => {
  if (lengths.length) {
    alert('Place all ships first!');
    return;
  }
  controller.phase = 'battle';
  status.textContent = 'Battle started – your turn!';
  render();
};


ownGrid.addEventListener('click', e => {
  if (controller.phase !== 'placement' || !lengths.length) return;

  const cell = e.target.closest('[data-x]');
  if (!cell) return;
  const x = +cell.dataset.x, y = +cell.dataset.y;
  const len = lengths[0];

  try {
    controller.placeShip({ x, y }, len, orientation);
    lengths.shift();
    if (!lengths.length) {
      status.textContent = 'All ships placed – click “Start Battle”';
      orientation = 'horizontal';
    }
    render();
  } catch (err) {
    status.textContent = err.message;
  }
});

enemyGrid.addEventListener('click', e => {
  if (controller.phase !== 'battle') return;

  const cell = e.target.closest('[data-x]');
  if (!cell) return;
  const x = +cell.dataset.x, y = +cell.dataset.y;

  try {
    controller.humanAttack({ x, y });
  } catch (err) {
    status.textContent = err.message;
  }
});

controller.addEventListener('update', render);
controller.addEventListener('gameover', () => {
  status.textContent =
    controller.humanBoard.allShipsSunk()
      ? '💥  You lost!'
      : '🎉  You won!';
  render();
});

render();


function render() {
  paint(ownGrid,   controller.humanBoard,    true);
  paint(enemyGrid, controller.computerBoard, false);
}

function makeGrid(id) {
  const table = document.createElement('table');
  table.id = id;
  for (let y = 0; y < 10; y++) {
    const tr = document.createElement('tr');
    for (let x = 0; x < 10; x++) {
      const td = document.createElement('td');
      td.dataset.x = x;
      td.dataset.y = y;
      tr.append(td);
    }
    table.append(tr);
  }
  return table;
}

function paint(table, board, revealShips = false) {
  [...table.rows].forEach((row, y) =>
    [...row.cells].forEach((cell, x) => {
      cell.className = '';
      const sq = board.grid[y][x];
      const attacked = board.isAttacked(x, y);

      if (sq === null) {
        if (attacked)
          cell.classList.add('miss');
      } else {
        if (sq.isSunk())       cell.classList.add('sunk');
        else if (attacked)  cell.classList.add('hit');
        else if (revealShips)  cell.classList.add('ship');
      }
    })
  );
}

function add(tag, cls = '', text = '') {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text) el.textContent = text;
  root.append(el);
  return el;
}
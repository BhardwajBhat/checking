const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('src/assets/game.js', 'utf8');

function element() {
  return {
    textContent: '',
    dataset: {},
    attributes: {},
    classes: new Set(),
    listeners: {},
    setAttribute(key, value) { this.attributes[key] = value; },
    addEventListener(event, callback) { this.listeners[event] = callback; },
    click() { this.listeners.click(); },
    focus() { this.focused = true; },
    get classList() {
      return { toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) };
    }
  };
}

function setup() {
  const cells = Array.from({ length: 9 }, element);
  const status = element();
  const restart = element();
  vm.runInNewContext(source, {
    document: {
      querySelectorAll: () => cells,
      getElementById: id => id === 'game-status' ? status : restart
    }
  });
  return { cells, status, restart };
}

test('alternates turns and ignores occupied cells', () => {
  const { cells, status } = setup();
  cells[0].click();
  cells[0].click();
  assert.equal(cells[0].textContent, 'X');
  assert.equal(status.textContent, "O's turn");
  cells[1].click();
  assert.equal(cells[1].textContent, 'O');
  assert.equal(status.textContent, "X's turn");
  assert.equal(cells[1].attributes['aria-label'], 'Row 1, column 2: O');
});

test('detects every winning line, locks play, and resets', () => {
  const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  for (const line of lines) {
    const { cells, status, restart } = setup();
    const others = cells.map((_, i) => i).filter(i => !line.includes(i));
    [line[0], others[0], line[1], others[1], line[2]].forEach(i => cells[i].click());
    assert.equal(status.textContent, 'X wins!');
    assert.ok(line.every(i => cells[i].classes.has('winner')));
    cells[others[2]].click();
    assert.equal(cells[others[2]].textContent, '');
    restart.click();
    assert.equal(status.textContent, "X's turn");
    assert.ok(cells.every(cell => cell.textContent === '' && !cell.classes.has('winner')));
    assert.ok(cells[0].focused);
    cells[0].click();
    assert.equal(cells[0].textContent, 'X');
  }
});

test('detects an O win', () => {
  const { cells, status } = setup();
  [0, 3, 1, 4, 8, 5].forEach(i => cells[i].click());
  assert.equal(status.textContent, 'O wins!');
});

test('detects a draw', () => {
  const { cells, status } = setup();
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(i => cells[i].click());
  assert.equal(status.textContent, "It's a draw!");
  assert.ok(cells.every(cell => !cell.classes.has('winner')));
});

(() => {
  const cells = [...document.querySelectorAll('.cell')];
  const status = document.getElementById('game-status');
  const restart = document.getElementById('restart');
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  let board = Array(9).fill('');
  let player = 'X';
  let finished = false;

  function render(winningLine = []) {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.setAttribute('aria-label',
        `Row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}: ${board[index] || 'empty'}`);
      cell.setAttribute('aria-disabled', String(finished || Boolean(board[index])));
      cell.classList.toggle('winner', winningLine.includes(index));
      cell.dataset.player = board[index];
    });
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (finished || board[index]) return;
      board[index] = player;
      const winningLine = winningLines.find(line =>
        line.every(position => board[position] === player));

      if (winningLine) {
        finished = true;
        status.textContent = `${player} wins!`;
      } else if (board.every(Boolean)) {
        finished = true;
        status.textContent = "It's a draw!";
      } else {
        player = player === 'X' ? 'O' : 'X';
        status.textContent = `${player}'s turn`;
      }
      render(winningLine);
    });
  });

  restart.addEventListener('click', () => {
    board = Array(9).fill('');
    player = 'X';
    finished = false;
    status.textContent = "X's turn";
    render();
    cells[0].focus();
  });

  render();
})();

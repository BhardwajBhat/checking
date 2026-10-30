---
layout: layout.njk
title: Tic-Tac-Toe
---

# Tic-Tac-Toe

Play with a friend on the same device. X goes first.

<section class="game" aria-label="Tic-tac-toe">
  <p id="game-status" role="status" aria-live="polite" aria-atomic="true">X's turn</p>
  <div class="board" role="group" aria-label="Game board">
    <button class="cell" type="button" aria-label="Row 1, column 1: empty"></button>
    <button class="cell" type="button" aria-label="Row 1, column 2: empty"></button>
    <button class="cell" type="button" aria-label="Row 1, column 3: empty"></button>
    <button class="cell" type="button" aria-label="Row 2, column 1: empty"></button>
    <button class="cell" type="button" aria-label="Row 2, column 2: empty"></button>
    <button class="cell" type="button" aria-label="Row 2, column 3: empty"></button>
    <button class="cell" type="button" aria-label="Row 3, column 1: empty"></button>
    <button class="cell" type="button" aria-label="Row 3, column 2: empty"></button>
    <button class="cell" type="button" aria-label="Row 3, column 3: empty"></button>
  </div>
  <button id="restart" type="button">New game</button>
  <noscript><p>Enable JavaScript to play this game.</p></noscript>
</section>

<script src="{{ '/assets/game.js' | url }}" defer></script>

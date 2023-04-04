"use strict"

const COLS = 10;
const ROWS = 20;
const COLS_NEXT = 4;
const ROWS_NEXT = 4;
const BLOCK_SIZE = 30;

const COLORS = [
	'cyan',
	'blue',
	'orange',
	'yellow',
	'green',
	'purple',
	'red'
];

const SHAPES = [
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], // 0,0 -> 2,0 ; 0,1 -> 1,0 ; 0,2 -> 0,0
   [3, 3, 3], // 1,0 -> 2,1 ; 1,1 -> 1,1 ; 1,2 -> 0,1 
   [0, 0, 0]],// 2,0 -> 2,2 ; 2,1 -> 1,2 ; 2,2 -> 0,2
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];

const KEY = {
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	Z: 90,
	X: 88
}

const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
}

const LINES_PER_LEVEL = 10;

const LEVEL = {
  1: 800,
  2: 720,
  3: 630,
  4: 550,
  // ...
}

Object.freeze(LEVEL);
Object.freeze(KEY);
Object.freeze(POINTS);

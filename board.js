class Board {
	grid;
	
	//grid에 2차원 배열을 넣어줌
	reset() {
		this.grid = this.getEmptyBoard();
	}
	
	//0으로 채워져 있는 2차원 배열을 만든다
	getEmptyBoard() {
		return Array.from(
			{length: ROWS}, () => Array(COLS).fill(0)
		);
	}
	
	//
	valid(p) {
		return p.shape.every((row, dy) => {
			return row.every((value, dx) => {
				let x = p.x + dx;
				let y = p.y + dy;
				return value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y));
			});
		});
	}
	
	isInsideWalls(x, y) {
		return x>=0 && x<COLS && y<=ROWS;
	}
	
	notOccupied(x, y) {
		return this.grid[y] && this.grid[y][x] === 0;
	}
	
	rotate(p, direction) {
	// Clone with JSON for immutability.
	let clone = JSON.parse(JSON.stringify(p));
	for (let y = 0; y < p.shape.length; ++y) {
		for (let x = 0; x < y; ++x) {
			[p.shape[x][y], p.shape[y][x]] = 
			[p.shape[y][x], p.shape[x][y]];
		}
	}
	
	if (direction === 'clock') {
	p.shape.forEach((row) => row.reverse());
	} else if (direction === 'R_clock') {
	p.shape.reverse();
	}
		  
	return clone;
	}

    	
}
class Board {
	constructor(ctx, ctxNext) {
		this.ctx = ctx;
		this.ctxNext = ctxNext;
		this.init();
	}
	
	init() {
		this.ctx.canvas.width = COLS * BLOCK_SIZE;
		this.ctx.canvas.height = ROWS * BLOCK_SIZE;
		this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
		
		this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
		this.ctxNext.canvas.height = 4 * BLOCK_SIZE;
		this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
		
		this.bag = new Array();
	}
		
	//grid에 2차원 배열을 넣어줌
	//board에 piece를 할당함
	reset() {
		this.grid = this.getEmptyBoard();
		this.next = new Piece(this.ctx, this.randomGenerator());
		this.getNewPiece();
	}
	
	//0으로 채워져 있는 2차원 배열을 만든다
	getEmptyBoard() {
		return Array.from(
			{length: ROWS}, () => Array(COLS).fill(0)
		);
	}
		
	getNewPiece() {
		this.piece = this.next;	
		this.piece.setStartPosition();
		
		this.next = new Piece(this.ctx, this.randomGenerator());
		this.ctxNext.clearRect(0, 0, BLOCK_SIZE, BLOCK_SIZE);
		this.next.drawNext(this.ctxNext);
				
	}
	
	//블록이 움직일수 있으면 true, 아니면 false를 반환함
	valid(p) {
		return p.shape.every((row, dy) => {
			return row.every((value, dx) => {
				let x = p.x + dx;
				let y = p.y + dy;
				return value === 0 || 
				(this.isInsideWalls(x, y) && 
				 this.notOccupied(x, y));
			});
		});
	}
	
	isInsideWalls(x, y) {
		return x>=0 && x<COLS && y<=ROWS;
	}
	
	notOccupied(x, y) {
		return this.grid[y] && this.grid[y][x] === 0;
	}
	
	//블록을 회전시킴(보드를 통화하는 버그 해결안됨)
	rotate(piece, direction) {
		// Clone with JSON for immutability.
		let p = JSON.parse(JSON.stringify(piece));
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
				
		return p;
		
	}

    drop() {
		let p = moves[KEY.DOWN](this.piece);
		if(this.valid(p)) {
			this.piece.move(p);
		} else {
			this.freeze();
			if (this.piece.y === 0) {
       		 // Game over
				return false;
      		}
			this.getNewPiece();
		}
		return true;
	}
		
	freeze() {
		this.piece.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value>0) {
					this.grid[y+this.piece.y][x+this.piece.x] = value;
				}
			})
		})
		this.clearline();
	}
	
	drawBoard() {
		this.grid.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value>0) {
					this.ctx.fillStyle = COLORS[value - 1];
					this.ctx.fillRect(x, y, 1, 1);
				}
			});
		});
		
	}
	
	draw() {
		this.piece.draw();
		this.drawBoard();
	}
	
	clearline(){
		let lines = 0;
		
		this.grid.forEach((row,y) => {
			if(row.every(value => value > 0)) {
			lines++;
				
			this.grid.splice(y,1);
			this.grid.unshift(Array(COLS).fill(0));
			}
		});
		if (lines>0) {
			//지워진 줄이 있으면 점수를 더한다.
			account.score += this.getLineClearPoints(lines);
			account.lines += lines;
			
			if(account.lines >= LINES_PER_LEVEL) {
				account.level++;
				
				account.lines -= LINES_PER_LEVEL;
				
				time.level = LEVEL[account.level];
			}
			
		}
	}
	
	getLineClearPoints(lines) {
		return lines === 1 ? POINTS.SINGLE :
			   lines === 2 ? POINTS.DOUBLE :  
        	   lines === 3 ? POINTS.TRIPLE :     
         	   lines === 4 ? POINTS.TETRIS : 
        	   0;
	}
	
	//7bag
	randomGenerator(){
		if(this.bag.length === 0) {
			this.bag = this.make_new_bag(COLORS.length);
			
			//shuffle Array
			this.bag.sort(() => Math.random() - 0.5);
			
		}
				
		return this.bag.pop();
		
	}
	
	make_new_bag(bag_count){
		let bag = [];
		
		for(let i = 0; i<bag_count; i++){
			bag.push(i);
		}
		
		return bag;
	}
	
	
}
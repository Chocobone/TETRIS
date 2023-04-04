class Piece {
		
	constructor(ctx) {
		this.ctx = ctx;
		this.spawn();
	}
	
	spawn() {
		const typeId = this.randomizePieceType(COLORS.length);
		this.color = COLORS[typeId];
		this.shape = SHAPES[typeId];
		this.x = 1;
		this.y = 0;
		this.hardDropped = false;
	}
	
	draw() {
		this.ctx.fillStyle = this.color;
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value > 0) {
					this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
				}
			});
		});
	}
	
	drawNext(ctxNext) {
		ctxNext.fillStyle = this.color;
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value > 0) {
					ctxNext.fillRect(this.x + x, this.y + y, 1, 1);
				}
			});
		});
	}
	
	
	move(p) {
		if(!this.hardDropped) {
			this.x = p.x;
			this.y = p.y;
		}
	}	
	
	randomizePieceType(noOfTypes) {
		return Math.floor(Math.random() * noOfTypes);
	}
	
	setStartPosition() {
		this.x = this.typeId === 4 ? 4 : 3;
	}
	
	hardDrop() {
		this.hardDropped = true;
	}
	
}


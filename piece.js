class Piece {
		
	constructor(ctx, typeId) {
		this.ctx = ctx;
		this.typeId = typeId;
		this.spawn();
	}
	
	spawn() {
		this.color = COLORS[this.typeId];
		this.shape = SHAPES[this.typeId];
		this.x = 0;
		this.y = 0;
		this.hardDropped = false;
		
	}
	
	test() {
		alert(this.color);
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
		this.shape = p.shape;
	}	
	
	setStartPosition() {
		this.x = this.typeId === 4 ? 4 : 3;
	}
	
	hardDrop() {
		this.hardDropped = true;
	}
	
}


class Piece {
		
	constructor(ctx, ctxNext) {
		this.ctx = ctx;
		this.ctxNext = ctxNext;
		this.bag = new Array();
		
		this.spawn();
	}
	
	spawn() {
		const typeId = this.randomGenerator()
		this.color = COLORS[typeId];
		this.shape = SHAPES[typeId];
		this.x = 0;
		this.y = 0;
		this.hardDropped = false;
		
		this.setStartPosition();
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
	
	drawNext() {
		this.ctxNext.fillStyle = this.color;
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value > 0) {
					this.ctxNext.fillRect(this.x + x, this.y + y, 1, 1);
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


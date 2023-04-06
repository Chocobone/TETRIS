class Piece {
		
	constructor(ctx) {
		this.ctx = ctx;
		this.bag = new Array();
		this.spawn();
	}
	
	spawn() {
		// const typeId = this.randomizePieceType(COLORS.length);
		const typeId = this.randomGenerator()
		this.color = COLORS[typeId];
		this.shape = SHAPES[typeId];
		this.x = 0;
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
		this.shape = p.shape;
	}	
	
	setStartPosition() {
		this.x = this.typeId === 4 ? 4 : 3;
	}
	
	hardDrop() {
		this.hardDropped = true;
	}
	
	//7bag으로 변형 예정
	randomizePieceType(noOfTypes) {
		return Math.floor(Math.random() * noOfTypes);
	}
	
	randomGenerator(){
		if(this.bag.length === 0) {
			this.bag = this.make_new_bag(COLORS.length);
			
			//shuffle Array
			this.bag.sort(() => Math.random() - 0.5);
			
			alert(this.bag);
			
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


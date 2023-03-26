const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');


let requestId = null;
const time = {start:0, elapsed:0, level:1000};

let board = new Board(ctx, ctxNext);

function play() {
	board.reset();
	board.draw();
	animate();
}

const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.Z]: (p) => board.rotate(p, 'clock'),
  [KEY.X]: (p) => board.rotate(p, 'R_clock'),
  
};

document.addEventListener('keydown', event => {
  if (moves[event.keyCode]) {  
    // 이벤트 버블링을 막는다.
    event.preventDefault();
    
	// 조각의 새 상태를 얻는다.
    let p = moves[event.keyCode](board.piece);
	
    
	if (event.keyCode === KEY.SPACE) {
		// 하드드롭한다
		while(board.valid(p)) {
			board.piece.move(p);
			p = moves[KEY.DOWN](board.piece);
		}
	}
    else if (board.valid(p)) {    
      // 이동이 가능한 상태라면 조각을 이동한다.
      board.piece.move(p);
    } // 그리기 전에 이전 좌표를 지운다.
	
  }
});

function animate(now = 0) {
	time.elapsed = now - time.start;
	
	if(time.elapsed > time.level) {
		time.start = now;
		
		board.drop();
	}
	ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
	
	board.draw();
	requestId = requestAnimationFrame(animate);
}
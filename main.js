// 0. frame
// https://ui.toast.com/weekly-pick/ko_20191216
// 1. 회전시 게임판 밖으로 나가는 문제 해결하기(clear)
// 2. 7bag 방식 도입
// https://simon.lc/the-history-of-tetris-randomizers
// 3. hold 기능 도입
// 4. 40line 모드, 무한모드 등으로 여러 방식의 게임 가능하게 하기
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');


let accountValues = {
	score: 0,
	lines: 0,
	level: 1
}

function updateAccount(key, value) {
	let element = document.getElementById(key);
	if(element) {
		element.textContent = value;
	}
}

let account = new Proxy(accountValues, {
	set: (target, key, value) => {
		target[key] = value;
		updateAccount(key, value);
		return true;
	} 
})

function resetGame() {
	account.score = 0;
	account.lines = 0;
	account.level = 1;
	board = this.getEmptyBoard();
}

let requestId = null;
const time = {start:0, elapsed:0, level:1000};

let board = new Board(ctx, ctxNext);

function play() {
	board.reset();
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
			account.score += POINTS.HARD_DROP;
			board.piece.move(p);
			p = moves[KEY.DOWN](board.piece);
		}
		board.drop();
	}
    else if (board.valid(p)) {
      // 이동이 가능한 상태라면 조각을 이동한다.
    	board.piece.move(p);
		
		if(event.keyCode === KEY.DOWN) {
			account.score += POINTS.SOFT_DROP;
		}
    } 
	
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

function gameover() {
	cancelAnimationFrame(requestId);
	ctx.fillStyle = 'black';
 	ctx.fillRect(1, 3, 8, 1.2);
	ctx.font = '1px Arial';
	ctx.fillStyle = 'red';
	ctx.fillText('GAME OVER', 1.8, 4);
}
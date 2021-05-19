const Board = () => {
	const [player, setPlayer] = React.useState(1);
	const [gameState, setGameState] = React.useState([]);
	let status = `Winner: ${checkForWinner(gameState)}`;

	let playerTurn = `Next turn: ${player == "0" ? "Player O" : "Player X"}`;

	console.log(`${status}`);

	const takeTurn = (id) => {
		setGameState([...gameState, { id: id, player: player }]);
		setPlayer(1-player); // to get the next player
		return player;
	};
	function renderSquare(i) {
		return <Square takeTurn={takeTurn} id={i}></Square>;
	}

	return (
		<div className="game-board">
			<div className="grid-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="grid-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="grid-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
			<div id="info">
				<h1 id="turn">{playerTurn}</h1>
				<h1>{status}</h1>
			</div>
		</div>
	);
};

const Square = ({ takeTurn, id }) => {
	const mark = ["O", "X"];
	const [filled, setFilled] = React.useState(false);
	const [tik, setTik] = React.useState(2);

	return (
		<button
			className={tik == "1" ? "pink" : "blue"}
			onClick={() => {
				setTik(takeTurn(id));
				setFilled(true);
			}}
		>
			<h1>{mark[tik]}</h1>
		</button>
	);
};

const Game = () => {
	return (
		<div className="game">
			<Board></Board>
		</div>
	);
};

//winning combinations

const win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const checkPlayerTurn = (gameState) => {
	return gameState.player;
};

const checkForWinner = (gameState) => {
	// get array of box id's
	// There cannot be a winner in less than 5 turns
	if (gameState.length < 5) return "No Winner Yet";
	let p0 = gameState.filter((item) => {
		if (item.player == 0) return item;
	});
	p0 = p0.map((item) => item.id);
	let px = gameState.filter((item) => {
		if (item.player == 1) return item;
	});
	px = px.map((item) => item.id);
	if (p0 != null && px != null) {
		var win0 = win.filter((item) => {
			return isSuperset(new Set(p0), new Set(item));
		});
		var winX = win.filter((item) => {
			return isSuperset(new Set(px), new Set(item));
		});
	}
	if (win0.length > 0) return "Player O ";
	else if (winX.length > 0) return "Player X ";
	return "No Winner Yet";
};
// check if subset is in the set
function isSuperset(set, subset) {
	for (let elem of subset) {
		if (!set.has(elem)) {
			return false;
		}
	}
	return true;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

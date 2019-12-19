import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

function Square({value, onClick}) {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
}

class Board extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			squares: new Array(9).fill(null),
			xIsNext: true
		}
	}

	handleClick = (i) => {
		/*
		* 使用 slice() 函数为每一步创建 squares 数组的副本，同时把这个数组当作不可变对象。
		* 这样我们就可以把所有 squares 数组的历史版本都保存下来了，然后可以在历史的步骤中随意跳转。
		* 把历史的 squares 数组保存在另一个名为 history 的数组中。
		* history 数组保存了从第一步到最后一步的所有的棋盘状态。
		* history 数组的结构如下所示：
				 history = [
					  // 第一步之前
					  {
					    squares: [
					      null, null, null,
					      null, null, null,
					      null, null, null,
					    ]
					  },
					  // 第一步之后
					  {
					    squares: [
					      null, null, null,
					      null, 'X', null,
					      null, null, null,
					    ]
					  },
					  // ...
					]
		* */
		const squares = this.state.squares.slice()
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O'
		this.setState({
			squares,
			xIsNext: !this.state.xIsNext
		})
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		)
	}

	render() {
		const winner = calculateWinner(this.state.squares)
		let status
		if(winner){
			status = `Winner: ${winner}`
		}else{
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
		}
		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board/>
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

ReactDOM.render(
	<Game/>,
	document.getElementById('root')
);

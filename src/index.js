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
	/*
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
		// const squares = this.state.squares.slice()
		// if (calculateWinner(squares) || squares[i]) {
		// 	return;
		// }
		// squares[i] = this.state.xIsNext ? 'X' : 'O'
		// this.setState({
		// 	squares,
		// 	xIsNext: !this.state.xIsNext
		// })
	// }
	/*
	*/
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		)
	}

	render() {
		return (
			<div>
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
	constructor(props){
		super(props)
		this.state = {
			history: [{squares: Array(9).fill(null)}],
			xIsNext: true,
			stepNumber: 0
		}
	}
	handleClick(i) {
		/*this.state.history.slice(0, this.state.stepNumber + 1)。
		* 如果我们“回到过去”，然后再走一步新棋子，原来的“未来”历史记录就不正确了，这个替换可以保证我们把这些“未来”的不正确的历史记录丢弃掉。
		* */
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			/*concat() 方法可能与你比较熟悉的 push() 方法不太一样，它并不会改变原数组，所以推荐使用 concat()。*/
			history: history.concat([{
				squares: squares
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}
	jumpTo(step){
		/*每当我们落下一颗新棋子的时候，我们需要调用 this.setState 并传入参数 stepNumber: history.length，以更新 stepNumber。
		* 这就保证了保证每走一步 stepNumber 会跟着改变
		* */
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		})
	}
	render() {
		const history = this.state.history
		// const current = history[history.length - 1]
		/*将代码从始终根据最后一次移动渲染修改为根据当前 stepNumber 渲染。*/
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares)

		const moves = history.map((step, move) => {
			const desc = move ? `Go to move #${move}` : 'Go to game start'
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			)
		})

		let status
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={i => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
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

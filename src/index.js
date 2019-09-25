import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*  
a formerly compo, but reduced to a func compo cause we only need a compo with render(), which is a func compo does
this func compo displays X/O based on props.value passed down from Board 
the props.onClick also get passed down from Board 
*/
function Square(props) {
    // full length: onClick={() => this.props.onClick()} | this.props.value
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/*  
a controlled/child compo from Game compo
it has a func to draw Square func compo with 2 props to be passed down:
1 is value X/O given from Game compo and 2 is onClick also from Game compo 
*/
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div></div>
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

/*
a root compo with state storing data for whole app
have a constructor to create & store data to state
handleClick(i) handle logic when clicking on square
- checks if can click on square (game won or square already clicked)
- then check value when clicked will be X/O based on bool xIsNext
- finally manually update Game state 

jumpTo(step): this func will be binded to each button to "turn back"
- manually update Game compo state

render(): dont understand fully ATM

*/
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null) // create a new Array instance with 9 empty eles, then fill 9 eles with value null
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        // check tutorial to see what history will look like - an arr of Board, which is another arr of Squares
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // create a copy of squares arr, and do changes on this new one
        // for more reason why, check tutorial for details explaination

        // ignore clicking if calculateWinner(squares) returns a value (every value is true, excepts null -> someone wins) or squares[i] already has value excepts null
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O"; // determine X or O based on bool
        // after assigning the ele with the right value, we have to manually update this compo state
        this.setState({
            // squares: squares, // update manually this compo state of the squares arr with 1 changed ele from X to O/O to X
            history: history.concat([{ squares: squares }]), // use concat() instead of push(); add new Board arr to history arr
            stepNumber: history.length, // number of Board arr in history === number of steps of the game
            xIsNext: !this.state.xIsNext // change X -> O and O -> X
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
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
    // define 8 lines that can win the game
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

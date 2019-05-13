import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    function Square(props) {
        return (
            //quando o botão for clicado
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
        );
    }

    //retorna
    function calculateWinner(squares){
        //conjunto de quadrados que pode definir um vencedor
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

        for(let i = 0; i < lines.length; i++){
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a];
            }
        }
        return null;
    }
  
    class Board extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                squares: Array(9).fill(null),
                 // por padrão o jogo é iniciado pelo X
                nextIsX: true,
            };
    }

    handleClick(i){
        //cria um cópia dos estados atuais dos squares
        const squares = this.state.squares.slice();
        //se o vencedor já tiver sido escolhido não deixa mudar os valores
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        //verifica se agora é a vez do X ou O
        squares[i] = this.state.nextIsX ? 'X' : 'O';
        this.setState({
            squares: squares,
            nextIsX: !this.state.nextIsX, //define quem é o próximo a jogar
        });
    }

    renderSquare(i) {
      return (
        <Square
            value = {this.state.squares[i]} 
            onClick={()=> this.handleClick(i)}
        />
      );
    }
  
    render() {
        const winner = calculateWinner(this.state.squares)
        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.nextIsX ? 'X' : 'O');
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
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

//===============================

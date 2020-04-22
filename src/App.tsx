import React, { useState, useEffect } from "react";

import { uuid } from "uuidv4";

import styled from "styled-components";
import { Tile } from "./components/Tile";

const Container = styled.div`
  padding: 4em;
`;

const GameContainer = styled.div`
  width: 880px;
  height: 880px;
  display: flex;
  flex-wrap: wrap;
`;

function createBoard() {
  let board: any = [];

  for (let i = 0; i < 40; i++) {
    board[i] = [];
    for (let j = 0; j < 40; j++) {
      if (Math.random() < 0.5) {
        board[i][j] = false;
      } else {
        board[i][j] = true;
      }
    }
  }
  return board;
}

function neighborCount(i: any, j: any, board: any) {
  let count = 0;

  try {
    if (board[i - 1][j] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i + 1][j] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i][j - 1] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i][j + 1] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i - 1][j - 1] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i - 1][j + 1] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i + 1][j - 1] === true) {
      count++;
    }
  } catch (error) {}
  try {
    if (board[i + 1][j + 1] === true) {
      count++;
    }
  } catch (error) {}

  return count;
}

function iterateBoard(board: any) {
  console.log("iterating");

  let newboard = board;

  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      // live cell with fewer than two neighbors dies
      if (board[i][j] && neighborCount(i, j, board) < 2) {
        newboard[i][j] = false;
      }

      // live cell with two or three lives on
      if (
        (board[i][j] && neighborCount(i, j, board) === 2) ||
        neighborCount(i, j, board) === 3
      ) {
        newboard[i][j] = true;
      }

      // dead cell with more than 3 lives
      if (!board[i][j] && neighborCount(i, j, board) > 3) {
        newboard[i][j] = true;
      }

      // live cell with more than 3 dies
      if (board[i][j] && neighborCount(i, j, board) > 3) {
        newboard[i][j] = false;
        console.log("die");
      }
    }
  }

  return newboard;
}

function TogglePiece(i: any, j: any, board: any) {
  let newboard = board;
  newboard[i][j] = !newboard[i][j];
  return newboard;
}

function App() {
  const [board, setboard] = useState(createBoard());

  return (
    <Container>
      <h1>Game of Life</h1>
      <GameContainer>
        {board.map((row: any, indexi: number) =>
          row.map((col: any, indexj: number) => (
            <Tile
              key={uuid()}
              alive={col}
              onClick={() => {
                setboard([...TogglePiece(indexi, indexj, board)]);
              }}
            ></Tile>
          ))
        )}
      </GameContainer>
      <button
        onClick={() => {
          setboard([...iterateBoard(board)]);
          console.log(board);
        }}
      >
        Iterate Board
      </button>
    </Container>
  );
}

export default App;

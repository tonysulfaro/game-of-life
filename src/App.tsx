import React from "react";
import styled from "styled-components";
import { Game } from "./components/Game";

const Container = styled.div`
  padding: 4em;
`;

function App() {

  return (
    <Container>
      <h1>Game of Life</h1>
      <Game></Game>
    </Container>
  );
}

export default App;

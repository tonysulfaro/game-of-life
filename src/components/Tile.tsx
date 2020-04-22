import styled, { css } from "styled-components";

interface ITile {
  alive: boolean;
  onClick?: Function;
}

export const Tile = styled.div<ITile>`
  width: 20px;
  height: 20px;
  background-color: gray;
  border: 1px solid black;

  ${(props) =>
    props.alive &&
    css`
      background-color: green;
    `};
`;

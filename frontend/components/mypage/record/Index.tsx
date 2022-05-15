import React from "react";
import styled from "styled-components";
import Favorite from "./Favorite";
import Solved from "./Solved";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2em;
`;

const Grid = styled.div`
  max-height: 40em;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const Col = styled.div<{size: number}>`
  flex: ${props => props.size};
  justify-content: center;
  max-height: 40em;
`;

const Index = () => {
  return (
    <Container>
      <Grid>
        <Favorite />
      </Grid>
      <Grid>
        <Solved />
      </Grid>
    </Container>
  );
};

export default Index;
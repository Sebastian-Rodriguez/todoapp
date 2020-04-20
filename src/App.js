import React from 'react';
import { Container } from 'reactstrap'
import Title from './components/Title'
import Todos from './components/Todos'

function App() {
  return (
    <Container>
      <Title></Title>
      <Todos></Todos>
    </Container>
  );
}

export default App;

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 10px;
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.boxColor};
`

const FollowItem = ({ username }) => {
  return (<Container>
    {username}
  </Container>);
}

export default FollowItem;
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import LevelStep from '../LevelStep';
import HomeLayout from './HomeLayout';

const Box = styled.div`
  grid-row: 2 / 3;
  background-color: rgb(207, 255, 175, 0.2);
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
`

const LevelIcons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`

const Wrapper = styled.div``

const Level = () => {
  return (<HomeLayout
    className="levelLayout"
    layout="levelLayout"
    title="Level"
    msg="Level up by earning points"
    left={false}
  >
    <Box>
      <LevelIcons>
      </LevelIcons>
      <Wrapper></Wrapper>
    </Box>
  </HomeLayout>);
}

export default Level;
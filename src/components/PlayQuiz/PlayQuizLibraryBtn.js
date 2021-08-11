import React from 'react';
import { faFolderOpen, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const NavBtn = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 50px;
  svg {
    margin-right: 10px;
  }
`

const Play = styled.div``

const Library = styled.div``

const PlayQuizLibraryBtn = () => {
  return (<NavBtn>
    <Play><FontAwesomeIcon icon={faPlay} />퀴즈 진행</Play>
    <Library><FontAwesomeIcon icon={faFolderOpen} />라이브러리</Library>
  </NavBtn>);
}

export default PlayQuizLibraryBtn;
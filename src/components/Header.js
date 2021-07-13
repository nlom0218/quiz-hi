import React from 'react';
import styled from 'styled-components';
import { faSearch, faMoon, faPencilAlt, faPlay, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faListAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import headerNav from "../animation/headerNav"

const SHeader = styled.div`
  box-shadow: 3px 1px 1px gray;
`

const List = styled.ul`
  width: 1200px;
  margin: 0 auto;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`

const Nav = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 16px;
    cursor: pointer;
    &:hover {
      animation: ${headerNav} 1.5s linear infinite forwards;
    }
  }
`

const SiteName = styled.li`
  grid-column: 5 / span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    cursor: pointer;
    font-size: 24px;
    letter-spacing: 10px;
    font-family: 'Zilla Slab', serif;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const Header = () => {
  return (<SHeader>
    <List>
      <Nav><FontAwesomeIcon icon={faMoon} /></Nav>
      <Nav><FontAwesomeIcon icon={faSearch} /></Nav>
      <Nav><FontAwesomeIcon icon={faListAlt} /></Nav>
      <Nav><FontAwesomeIcon icon={faClipboard} /></Nav>
      <SiteName>
        <span>quiz Hi</span>
      </SiteName>
      <Nav><FontAwesomeIcon icon={faPencilAlt} /></Nav>
      <Nav><FontAwesomeIcon icon={faPlay} /></Nav>
      <Nav><FontAwesomeIcon icon={faUser} /></Nav>
      <Nav><FontAwesomeIcon icon={faSignOutAlt} /></Nav>
    </List>
  </SHeader>);
}

export default Header;
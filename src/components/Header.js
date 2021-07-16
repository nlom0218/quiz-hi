import React from 'react';
import styled from 'styled-components';
import { faSearch, faMoon, faPencilAlt, faPlay, faUser, faSignOutAlt, faSun, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faListAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import headerNav from "../animation/headerNav"
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, disableDarkMode, enableDarkMode, isLoggedInVar, logOutUser } from '../apollo';

const SHeader = styled.div`
  /* background-color: ${props => props.theme.fontColor}; */
`

const List = styled.ul`
  width: 1100px;
  margin: 0 auto;
  padding-top: 40px;
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
`

const SiteNameText = styled.span`
  cursor: pointer;
  font-size: 24px;
  letter-spacing: 10px;
  font-weight: 600;
  text-transform: uppercase;
  a {
    color: ${props => props.theme.fontColor};
  }
`



const Header = () => {
  const darkMode = useReactiveVar(darkModeVar)
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const onCLickDarkMode = () => {
    if (darkMode === true) {
      disableDarkMode()
    } else if (darkMode === false) {
      enableDarkMode()
    }
  }
  const onClickAccount = () => {
    logOutUser()
  }
  return (<SHeader>
    <List>
      <Nav><FontAwesomeIcon icon={darkMode ? faSun : faMoon} onClick={onCLickDarkMode} /></Nav>
      <Nav><FontAwesomeIcon icon={faSearch} /></Nav>
      <Nav><FontAwesomeIcon icon={faListAlt} /></Nav>
      <Nav><FontAwesomeIcon icon={faClipboard} /></Nav>
      <SiteName>
        <SiteNameText><Link to="/">quiz Hi</Link></SiteNameText>
      </SiteName>
      <Nav><FontAwesomeIcon icon={faPencilAlt} /></Nav>
      <Nav><FontAwesomeIcon icon={faPlay} /></Nav>
      <Nav><FontAwesomeIcon icon={faUser} /></Nav>
      <Nav>
        {isLoggedIn ?
          <FontAwesomeIcon icon={faSignOutAlt} onClick={onClickAccount} />
          :
          <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /></Link>
        }
      </Nav>
    </List>
  </SHeader>);
}

export default Header;
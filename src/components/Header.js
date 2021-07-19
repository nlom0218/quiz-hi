import React, { useEffect } from 'react';
import styled from 'styled-components';
import { faSearch, faMoon, faPencilAlt, faPlay, faUser, faSignOutAlt, faSun, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faListAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import headerNav from "../animation/headerNav"
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, disableDarkMode, enableDarkMode, isLoggedInVar, logOutUser } from '../apollo';
import useUser from '../hooks/useUser';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
gsap.registerPlugin(ScrollTrigger)

const SHeader = styled.div`
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
  :last-child {
    grid-column: -2 / -1;
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
`

const Header = () => {
  useEffect(() => {
    gsap.from(".headerContainer", {
      duration: 2,
      y: "-100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  const darkMode = useReactiveVar(darkModeVar)
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const user = useUser()
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
  return (<SHeader className="headerContainer">
    <List>
      <Nav>
        <FontAwesomeIcon
          icon={darkMode ? faSun : faMoon}
          onClick={onCLickDarkMode}
          style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
        />
      </Nav>
      <Nav><FontAwesomeIcon icon={faSearch} /></Nav>
      <Nav><FontAwesomeIcon icon={faClipboard} /></Nav>
      <Nav><FontAwesomeIcon icon={faListAlt} /></Nav>
      <SiteName>
        <SiteNameText><Link to="/">quiz Hi</Link></SiteNameText>
      </SiteName>
      {user && <React.Fragment>
        <Nav><FontAwesomeIcon icon={faPencilAlt} /></Nav>
        <Nav><Link to="/play-quiz"><FontAwesomeIcon icon={faPlay} /></Link></Nav>
        <Nav>
          {user?.avatarURL === !null ?
            <></>
            : <FontAwesomeIcon icon={faUser} />
          }
        </Nav>
      </React.Fragment>
      }
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
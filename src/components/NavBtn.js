import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0px 2px 1px 0.5px rgba(0,0,0,0.2);
  transition: background-color 0.3s linear, color 0.6s linear;
  :hover {
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const BarBtn = styled.div`
  margin-right: 20px;
  cursor: pointer;
`

const SToTopBtn = styled.div`
  cursor: pointer;
`

const NavBtn = () => {
  const onClinkToTopBtn = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    })
  }

  return (
    <Wrapper>
      <BarBtn>
        <FontAwesomeIcon icon={faBars} />
      </BarBtn>
      <SToTopBtn onClick={onClinkToTopBtn}>
        <FontAwesomeIcon icon={faArrowUp} />
      </SToTopBtn>
    </Wrapper>
  )
}

export default NavBtn;
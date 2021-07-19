import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const SToTopBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 1px 0.5px rgba(0,0,0,0.2);
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  transition: background-color 0.3s linear, color 0.6s linear;
  :hover {
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
  }
`

const ToTopBtn = () => {
  const onClinkToTopBtn = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0
    })
  }
  return (<SToTopBtn onClick={onClinkToTopBtn}>
    <FontAwesomeIcon icon={faArrowUp} />
  </SToTopBtn>);
}

export default ToTopBtn;
import React from 'react';
import styled from 'styled-components';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Title = styled.div`
  font-size: 18px;
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  letter-spacing: 3px;
  line-height: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
    font-size: 16px;
  }
`

const DetailTitle = ({ title }) => {
  return (<Title>
    <FontAwesomeIcon icon={title === "퀴즈" ? faBook : faBookOpen} /> {title}
  </Title>);
}

export default DetailTitle;
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Conatiner = styled.div``

const Title = styled.div``

const TagQuestion = () => {
  return (<Conatiner>
    <Title><FontAwesomeIcon icon={faBookOpen} /> 문제</Title>
  </Conatiner>);
}

export default TagQuestion;
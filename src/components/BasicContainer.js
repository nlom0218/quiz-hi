import React from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { BasicContainerGsap } from '../hooks/Gsap';
gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  width: 1200px;
  /* height: 100vh; */
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  row-gap: 60px;
  position: relative;
`

const BasicContainer = ({ children }) => {
  return (<Container className="basicContainer">
    <BasicContainerGsap />
    {children}
  </Container>);
}

export default BasicContainer;
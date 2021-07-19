import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  row-gap: 60px;
  position: relative;
`

const BasicContainer = ({ children }) => {
  useEffect(() => {
    gsap.from(".basicContainer", {
      duration: 2,
      delay: 0.5,
      y: "100",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return (<Container className="basicContainer">
    {children}
  </Container>);
}

export default BasicContainer;
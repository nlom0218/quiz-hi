import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
gsap.registerPlugin(ScrollTrigger)

const SAccountContainer = styled.div`
  height: 100vh;
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 400px 100px 300px;
  grid-template-rows: 1fr auto 1fr;
  align-content: flex-start;
`

const AccountContainer = ({ children }) => {
  useEffect(() => {
    gsap.from(".accountContainer", {
      duration: 1,
      y: "60",
      opacity: 0,
      ease: "power3.out",
    })
  }, [])
  return (<SAccountContainer className="accountContainer">
    {children}
  </SAccountContainer>);
}

export default AccountContainer;
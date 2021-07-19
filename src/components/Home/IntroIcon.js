import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
gsap.registerPlugin(ScrollTrigger)

const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 400px;
  background-color: rgb(173, 242, 26, 0.2);
`

const IntroIcon = () => {
  useEffect(() => {
    gsap.from(".iconContainer", {
      duration: 1.5,
      y: "80",
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".iconContainer",
        start: "top 95%",
        // markers: true,
        // toggleActions: "restart complete reverse reset"
      }
    })
  }, [])
  return (<Layout className="iconContainer">

  </Layout>);
}

export default IntroIcon;
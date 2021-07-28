import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const SStep = styled.div`
  grid-column: 2 / -3;
`

const Layout = styled.div`
  /* grid-column: 1 / 13; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-bottom: 50px;
  animation: ${fadeIn} 1s linear forwards;
`

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 5px;
  letter-spacing: 5px;
`

const Msg = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
`

const Step = ({ step, msg, children }) => {
  useEffect(() => {
    window.scrollBy({
      top: 1200,
      behavior: "smooth"
    })
  }, [])
  return (<SStep>
    <Layout>
      <Title>{step}단계</Title>
      <Msg>{msg}</Msg>
      {children}
    </Layout>
  </SStep>);
}

export default Step;
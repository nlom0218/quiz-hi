import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`

  svg {
    font-size: 60px;
    outline-color: red;
  }
`

const
  LevelStep = ({ level }) => {
    const [color, setColor] = useState(undefined)
    useEffect(() => {
      if (level === 1) {
        setColor("rgb(255, 221, 53, 0.8)")
      } else if (level === 2) {
        setColor("rgb(73, 142, 67, 0.8)")
      } else if (level === 3) {
        setColor("rgb(79, 140, 247, 0.8)")
      } else if (level === 4) {
        setColor("rgb(252, 136, 53, 0.8)")
      } else if (level === 5) {
        setColor("rgb(159, 34, 201, 0.8)")
      } else if (level === 6) {
        setColor("rgb(163, 103, 47, 0.8)")
      } else if (level === 7) {
        setColor("rgb(229, 43, 36, 0.8)")
      } else if (level === 8) {
        setColor("linear-gradient(to bottom left, cyan 50%, palegoldenrod 50%)")
      } else if (level === 2) {
        setColor("rgb(73, 142, 67, 0.8)")
      } else if (level === 2) {
        setColor("rgb(73, 142, 67, 0.8)")
      }
    }, [])
    return (<Layout>
      <FontAwesomeIcon icon={faCrown} color={color} />
    </Layout>);
  }

export default
  LevelStep;
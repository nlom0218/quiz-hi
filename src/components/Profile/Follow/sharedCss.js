import styled from "styled-components";

export const FollowTitle = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  align-items: center;
`

export const FollowList = styled.div`
  background-color: ${props => props.theme.boxColor};
`
import styled from "styled-components"
import { fadeIn } from "../../../animation/fade"

export const ActionBox = styled.div`
  animation: ${fadeIn} 0.6s ease;
  position: absolute;
  background-color: rgb(42, 140, 0);
  top: -80px;
  right: 50px;
  width: 1000px;
  height: 510px;
  border-radius: 5px;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto auto;
  row-gap: 20px;
`

export const LeaveBtn = styled.div`
  justify-self: flex-end;
  margin-right: 15px;
  margin-top: 10px;
  cursor: pointer;
`

export const ActionContent = styled.div`
  margin: 20px 40px;
  justify-self: center;
  font-size: 36px;
  max-height: 340px;
  overflow-y: scroll;
`

export const NextStep = styled.div`
  font-size: 20px;
  margin-right: 40px;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 40px;
  div {
    cursor: pointer;
  }
  span {
    margin-right: 10px;
    font-size: 16px;
  }
`

export const BottomLine = styled.div`
  background-color: rgb(158, 81, 26);
  height: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
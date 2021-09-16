import React, { useState } from 'react';
import styled from 'styled-components';
import { faEnvelopeOpenText, faFlag, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SDetailContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const SendMsgLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const SendMsg = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
`

const EditMsg = styled.div``

const ChargeMsg = styled.div`
  color: tomato;
`

const EditMsgForm = styled.form`
  background-color: ${props => props.theme.boxColor};
  padding: 40px 30px;
  border-radius: 5px;
`

const ChargeMsgForm = styled.form``

const DetailContainer = ({ children }) => {
  const [editMsg, setEditMsg] = useState(false)
  const [chargeMsg, setChargeMsg] = useState(false)
  const onClickEditMsg = () => {
    setEditMsg(prev => !prev)
    setChargeMsg(false)
  }
  const onClickChargeMsg = () => {
    setChargeMsg(prev => !prev)
    setEditMsg(false)
  }
  return (<SDetailContainer>
    {children}
    <SendMsgLayout>
      <SendMsg>
        <EditMsg onClick={onClickEditMsg}><FontAwesomeIcon icon={faEnvelopeOpenText} /> 메세지 보내기</EditMsg>
        <ChargeMsg onClick={onClickChargeMsg}><FontAwesomeIcon icon={faFlag} /> 신고하기</ChargeMsg>
      </SendMsg>
      {editMsg && <EditMsgForm>
        EditMsg
      </EditMsgForm>}
      {chargeMsg && <ChargeMsgForm>
        ChargeMsg
      </ChargeMsgForm>}
    </SendMsgLayout>
  </SDetailContainer>);
}

export default DetailContainer;
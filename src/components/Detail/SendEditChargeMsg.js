import { faEnvelopeOpenText, faFlag, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeIn } from '../../animation/fade';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

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
  div {
    cursor: pointer;
  }
`

const EditMsg = styled.div``

const ChargeMsg = styled.div`
  color: tomato;
`

const EditMsgForm = styled.form`
  background-color: ${props => props.theme.boxColor};
  padding: 40px 30px;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const ChargeMsgForm = styled.form`
  background-color: ${props => props.theme.boxColor};
  padding: 40px 30px;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const Msg = styled.div``

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
`

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear, color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const SubmitBtn = styled.input`
  background-color: ${props => props.value === "신고하기" ? "tomato" : "rgb(255, 165, 0, 0.6)"};
  color: ${props => props.value === "신고하기" ? "#f4f4f4" : "#383838"};
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  transition: opacity 0.6s ease;
  opacity: ${props => props.disabled ? "0.6" : "1"};
  cursor: pointer;
`

const SendEditDChargeMsg = ({ user: { email } }) => {
  const [editMsg, setEditMsg] = useState(false)
  const [chargeMsg, setChargeMsg] = useState(false)
  useEffect(() => {
    if (!editMsg && !chargeMsg) {
      return
    }
    window.scrollBy({
      top: 1200,
      behavior: "smooth"
    })
  }, [editMsg, chargeMsg])
  const { register, formState: { isValid }, setValue } = useForm({
    mode: "onChange"
  })
  const onClickEditMsg = () => {
    setEditMsg(prev => !prev)
    setChargeMsg(false)
    setValue("chargeInfo", "")
  }
  const onClickChargeMsg = () => {
    setChargeMsg(prev => !prev)
    setEditMsg(false)
    setValue("editInfo", "")
  }
  return (<SendMsgLayout>
    <SendMsg>
      <EditMsg onClick={onClickEditMsg}><FontAwesomeIcon icon={faEnvelopeOpenText} /> 메세지 보내기</EditMsg>
      <ChargeMsg onClick={onClickChargeMsg}><FontAwesomeIcon icon={faFlag} /> 신고하기</ChargeMsg>
    </SendMsg>
    {editMsg && <EditMsgForm>
      <Msg>• 퀴즈 / 문제에 수정이 필요할 부분이 있다면 메세지를 보내주세요.</Msg>
      <Msg>• 메세지는 퀴즈 / 문제를 작성한 선생님께 전달됩니다.</Msg>
      <Wrapper>
        <div>내용</div>
        <Textarea
          cols={20}
          rows={4}
          {...register("editInfo", {
            required: true
          })}
        ></Textarea >
      </Wrapper>
      <SubmitBtn
        type="submit"
        value="메세지 보내기"
        disabled={!isValid}
      />
    </EditMsgForm>}
    {chargeMsg && <ChargeMsgForm>
      <Msg>• 퀴즈 / 문제에 부적절한 내용이 포함 된다면 신고해주세요.</Msg>
      <Msg>• 신고내용은 퀴즈 / 문제를 작성한 선생님과 관리자에게 전달됩니다.</Msg>
      <Msg>• 다른 선생들에 의해 신고 내용이 10회 누적 되면 퀴즈 / 문제는 삭제됩니다.</Msg>
      <Wrapper>
        <div>신고 내용</div>
        <Textarea
          cols={20}
          rows={4}
          {...register("chargeInfo", {
            required: true
          })}
        ></Textarea >
      </Wrapper>
      <SubmitBtn
        type="submit"
        value="신고하기"
        disabled={!isValid}
      />
    </ChargeMsgForm>}
  </SendMsgLayout>);
}

export default SendEditDChargeMsg;
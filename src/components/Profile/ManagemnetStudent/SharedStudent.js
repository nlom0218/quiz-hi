import React from 'react';
import styled from 'styled-components';
import EditInput from '../Edit/EditInput';
import EditProfileBox from '../Edit/EditProfileBox';

const EditPageForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`
const DeleteMsg = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const EditPageItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  column-gap: 20px;
  align-items: center;
`

const DelBtn = styled.input`
  text-align: center;
  background-color: tomato;
  color: #F4F4F4;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
  cursor: pointer;
`

const SharedStudent = () => {
  return (<EditProfileBox>
    {/* <EditPageForm>
      <DeleteMsg>
        <div className="delMsg">∙ 생성된 학생 계정을 모두 일괄 삭제합니다.</div>
        <div className="delMsg">∙ 삭제한 학생 계정은 다시 복구되지 않습니다.</div>
        <div className="delMsg">∙ 학생 계정의 퀴즈 점수가 모두 삭제됩니다.</div>
        <div className="delMsg">∙ 생성된 숙제는 모두 삭제되며 복구되지 않습니다.</div>
      </DeleteMsg>
      <EditPageItem>
        <div>선생님 계정 비밀번호</div>
        <EditInput
          type="password"
          autoComplete="off"
        />
      </EditPageItem>
      <DelBtn type="submit" value="탈퇴하기" />
    </EditPageForm> */}
  </EditProfileBox>);
}

export default SharedStudent;
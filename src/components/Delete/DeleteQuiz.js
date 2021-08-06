import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const PageTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  svg {
    margin-right: 10px;
  }
`

const DeleteMsg = styled.div`
  padding: 40px 30px;
  border: 1px solid ${props => props.theme.fontColor};
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: border 1s ease;
`

const CheckPassword = styled.div``

const DeleteQuiz = () => {
  return (<Container>
    <PageTitle>
      <FontAwesomeIcon icon={faTrash} />퀴즈 삭제
    </PageTitle>
    <DeleteMsg>
      <div className="delMsg">∙ 삭제된 퀴즈 / 문제는 다시 복구되지 않습니다.</div>
      <div className="delMsg">∙ 퀴즈를 삭제 할 경우 퀴즈의 문제는 삭제되지 않습니다.</div>
      <div className="delMsg">∙ 공유한 퀴즈 / 문제인 경우 이를 공유한 사용자들은 더 이상 해당 퀴즈 / 문제를 사용할 수 없습니다.</div>
      <div className="delMsg">∙ 퀴즈 / 문제의 좋아요, 댓글, 조희수가 모두 삭제되며 이는 사용자 레벨에 영향을 미칩니다.</div>
    </DeleteMsg>
    <CheckPassword>
      비밀번호 확인
    </CheckPassword>
  </Container>);
}

export default DeleteQuiz;
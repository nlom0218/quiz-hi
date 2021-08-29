import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import EditProfileBox from '../Edit/EditProfileBox';
import SaveBtn from '../Edit/SaveBtn';

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  svg {
    margin-right: 10px;
    cursor: pointer;
  }
  .edit_title {
    font-weight: 600;
  }
`

const PageList = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  border-radius: 5px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const EditFirstPage = ({ }) => {
  return (<EditProfileBox>
    <EditForm>
      <Wrapper>
        <div className="edit_title">QUIZ HI 첫 페이지 설정</div>
        <PageList>
          <div><FontAwesomeIcon icon={faCircle} />홈</div>
          <div><FontAwesomeIcon icon={faCircle} />피드</div>
          <div><FontAwesomeIcon icon={faCircle} />게시판</div>
          <div><FontAwesomeIcon icon={faCircle} />퀴즈 만들기</div>
          <div><FontAwesomeIcon icon={faCircle} />퀴즈 진행하기</div>
          <div><FontAwesomeIcon icon={faCircle} />프로필</div>
        </PageList>
      </Wrapper>
      <SaveBtn type="submit" value={"저장하기"} />
    </EditForm>
  </EditProfileBox>);
}

export default EditFirstPage;
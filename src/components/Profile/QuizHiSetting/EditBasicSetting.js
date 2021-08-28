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
  }
`

const PageList = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
`

const FontList = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const EditBasicSetting = ({ homeSettingArr }) => {
  console.log(homeSettingArr);
  return (<EditProfileBox>
    <EditForm>
      <Wrapper>
        <div>QUIZ HI 첫 페이지 설정</div>
        <PageList>
          <div><FontAwesomeIcon icon={faCircle} />홈</div>
          <div><FontAwesomeIcon icon={faCircle} />피드</div>
          <div><FontAwesomeIcon icon={faCircle} />게시판</div>
          <div><FontAwesomeIcon icon={faCircle} />퀴즈 만들기</div>
          <div><FontAwesomeIcon icon={faCircle} />퀴즈 진행하기</div>
          <div><FontAwesomeIcon icon={faCircle} />프로필</div>
        </PageList>
      </Wrapper>
      <Wrapper>
        <div>QUIZ HI 폰트 설정</div>
        <FontList>
          <div><FontAwesomeIcon icon={faCircle} />홈</div>
          <div><FontAwesomeIcon icon={faCircle} />피드</div>
          <div><FontAwesomeIcon icon={faCircle} />게시판</div>
          <div><FontAwesomeIcon icon={faCircle} />퀴즈 만들기</div>
          <div><FontAwesomeIcon icon={faCircle} />퀴즈 진행하기</div>
          <div><FontAwesomeIcon icon={faCircle} />프로필</div>
        </FontList>
      </Wrapper>
      <SaveBtn type="submit" value={"저장하기"} />
    </EditForm>
  </EditProfileBox>);
}

export default EditBasicSetting;
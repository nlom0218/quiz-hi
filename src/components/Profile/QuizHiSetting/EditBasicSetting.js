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

const FontList = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  border-radius: 5px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const Font = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
`

const EditBasicSetting = ({ homeSettingArr }) => {
  console.log(homeSettingArr);
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
      <Wrapper>
        <div className="edit_title">QUIZ HI 폰트 설정</div>
        <FontList>
          <Font style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            <div><FontAwesomeIcon icon={faCircle} />기본</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Nanum Myeongjo', serif" }}>
            <div><FontAwesomeIcon icon={faCircle} />명조</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Nanum Gothic', sans-serif" }}>
            <div><FontAwesomeIcon icon={faCircle} />고딕</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Gowun Batang', serif" }}>
            <div><FontAwesomeIcon icon={faCircle} />바탕</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
          <Font style={{ fontFamily: "'Hahmlet', serif" }}>
            <div><FontAwesomeIcon icon={faCircle} />햄릿</div>
            <div>가나다라마바사아자차카타파하123456ABCDEabcde</div>
          </Font>
        </FontList>
      </Wrapper>
      <SaveBtn type="submit" value={"저장하기"} />
    </EditForm>
  </EditProfileBox>);
}

export default EditBasicSetting;
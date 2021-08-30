import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
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

const ScoreList = styled.div`
  background-color: ${props => props.theme.bgColor};
  padding: 20px;
  border-radius: 5px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  transition: background-color 1s ease;
`

const Score = styled.div``

const EditScore = ({ goldenbellScore, setGoldenbellScore, cooperationScore, setCooperationScore, username, id }) => {
  const { handleSubmit } = useForm()
  const onSubmit = () => {

  }
  const processGoldenBellScore = (score) => {
    if (score === goldenbellScore) {
      return true
    } else {
      return false
    }
  }
  const processCooperationScore = (score) => {
    if (score === cooperationScore) {
      return true
    } else {
      return false
    }
  }
  const onClickGoldenBellBtn = (score) => {
    setGoldenbellScore(score)
  }
  const onClickCooperationBtn = (score) => {
    setCooperationScore(score)
  }
  return (<EditProfileBox>
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <div className="edit_title">골든벨 모드 점수 설정</div>
        <div>골든벨을 울린 학생들에게 부여하는 점수를 설정합니다.</div>
        <ScoreList>
          {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((item, index) => {
            return <Score key={index}>
              <FontAwesomeIcon
                onClick={() => onClickGoldenBellBtn(item)}
                icon={processGoldenBellScore(item) ? faCheckCircle : faCircle}
              /> {item}점
          </Score>
          })}
        </ScoreList>
      </Wrapper>
      <Wrapper>
        <div className="edit_title">협동 모드 점수 설정</div>
        <div>협동 모드에서 학생들이 목표 점수를 넘기면 부여하는 점수를 설정합니다.</div>
        <ScoreList>
          {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((item, index) => {
            return <Score key={index}>
              <FontAwesomeIcon
                onClick={() => onClickCooperationBtn(item)}
                icon={processCooperationScore(item) ? faCheckCircle : faCircle}
              /> {item}점
          </Score>
          })}
        </ScoreList>
      </Wrapper>
      <SaveBtn type="submit"
      // value={loading ? "저장중..." : "저장하기"}
      />
    </EditForm>
  </EditProfileBox>);
}

export default EditScore;
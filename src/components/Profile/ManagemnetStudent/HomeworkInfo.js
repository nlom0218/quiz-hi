import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';

const SHomeworkInfo = styled.div`
  /* border-top: 1px solid rgb(200, 200, 200, 0.8); */
  animation: ${fadeIn} 0.6s ease;
  grid-column: 1 / -1;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const InfoMsg = styled.div`

`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
`

const Title = styled.div`
  font-weight: 600;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Student = styled.div`
  margin-right: 10px;
  margin-bottom: 5px;
`

const FinishBtn = styled.div`
  background-color: tomato;
  color: #F4F4F4;
  text-align: center;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
`

const Finish = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
`

const FinishMsg = styled.div`
  color: tomato;
  justify-self: center;
`

const DeleteBtn = styled.div`
  background-color: tomato;
  color: #F4F4F4;
  text-align: center;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
`

const FINSIH_HOMEWORK_MUTATION = gql`
  mutation finishHomework($homeworkId: Int!, $totalScore: Int) {
    finishHomework(homeworkId: $homeworkId, totalScore: $totalScore) {
      ok
    }
  }
`

const DELETE_HOMEWORK_MUTATION = gql`
  mutation deleteHomework($homeworkId: Int!) {
    deleteHomework(homeworkId: $homeworkId) {
      ok
    }
  }
`

const HomeworkInfo = ({ score, student, targetScore, order, homeworkId, finish, teacherId }) => {
  const maxScore = JSON.parse(score).map((item) => item.score).reduce((acc, cur) => acc + cur, 0)
  const curScore = () => {
    const scoreArr = student.map((item) => {
      const quizScore = JSON.parse(item.quizScore).filter((quizScoreItem) => quizScoreItem.teacherId === teacherId).filter((item) => item.order === order)[0]
      if (quizScore) {
        return quizScore.score
      } else {
        return 0
      }
    })
    return scoreArr.reduce((acc, cur) => acc + cur, 0)
  }
  const completeStduent = student.filter((item) => {
    const exist = JSON.parse(item.quizScore).filter((quizScoreItem) => quizScoreItem.teacherId === teacherId).filter((quizScoreItem) => {
      return quizScoreItem.order === order
    })
    return Boolean(exist.length === 1)
  })
  const disCompleteStudnet = student.filter((item) => {
    const exist = JSON.parse(item.quizScore).filter((quizScoreItem) => quizScoreItem.teacherId === teacherId).filter((quizScoreItem) => {
      return quizScoreItem.order === order
    })
    return Boolean(exist.length === 0)
  })
  const onCompleted = (result) => {
    const { finishHomework: { ok } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [finishHomework, { loading }] = useMutation(FINSIH_HOMEWORK_MUTATION, {
    onCompleted
  })
  const onClickFinishBtn = () => {
    if (loading) {
      return
    }
    if (window.confirm("????????? ????????????????????????? \n???????????? ?????? ??? ????????? ???????????? ????????? ?????? ??? ??? ????????????.")) {
      finishHomework({
        variables: {
          homeworkId,
          totalScore: curScore()
        }
      })
    }
  }
  const [deleteHomework, { loading: deleteLoading }] = useMutation(DELETE_HOMEWORK_MUTATION, {
    onCompleted: (result) => {
      const { deleteHomework: { ok } } = result
      if (ok) {
        window.location.reload()
      }
    }
  })
  const onClickDeleteBtn = () => {
    if (deleteLoading) {
      return
    }
    if (window.confirm("????????? ????????????????????????? \n???????????? ?????? ???????????? ????????? ?????? ??????(??????&??????)??? ??? ??? ????????????.")) {
      deleteHomework({
        variables: {
          homeworkId,
        }
      })
    }
  }
  return (<SHomeworkInfo>
    {!finish &&
      <React.Fragment>
        <InfoMsg>???????????? ?????? ??? ?????? ?????? ????????? <span style={{ color: "tomato", fontSize: "20px" }}>{maxScore}???</span>?????????.</InfoMsg>
        {targetScore &&
          <React.Fragment>
            <InfoMsg>
              ?????? ????????? ?????? ?????????  <span style={{ color: "tomato", fontSize: "20px" }}>{targetScore}???</span>??????,
            ???????????? ????????? ????????? <span style={{ color: "tomato", fontSize: "20px" }}>{curScore()}???</span>?????????.
          </InfoMsg>
            <InfoMsg>
              ????????? ???????????? ?????? ???????????? ?????? ????????? ?????? ??? ??? ????????????.
          </InfoMsg>
          </React.Fragment>
        }
        <Wrapper>
          <Title>????????? ??????</Title>
          <List>{completeStduent.map((item, index) => { return <Student key={index}>{item.nickname}</Student> })}</List>
        </Wrapper>
        <Wrapper>
          <Title>??? ????????? ??????</Title>
          <List>{disCompleteStudnet.map((item, index) => { return <Student key={index}>{item.nickname}</Student> })}</List>
        </Wrapper>
      </React.Fragment>}
    {finish ?
      <Finish>
        <FinishMsg>????????? ?????? ?????????.</FinishMsg>
        <DeleteBtn onClick={onClickDeleteBtn}>????????????</DeleteBtn>
      </Finish>
      :
      <FinishBtn onClick={onClickFinishBtn}>????????????</FinishBtn>}
  </SHomeworkInfo>);
}

export default HomeworkInfo;
import React, { useState } from 'react';
import styled from 'styled-components';
import EditProfileBox from '../Edit/EditProfileBox';
import CreateStudents from './CreateStudents';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`

const ListMsg = styled.div`
  /* align-self: flex-end; */
`

const ActionStudentsBtn = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  background-color: rgb(255, 165, 0, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color linear 0.5s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`


const StudentList = ({ students, id }) => {
  const [createStudents, setCreateStudents] = useState(false)
  const onClickCreateStudents = () => {
    setCreateStudents(true)
  }
  return (<React.Fragment>
    <EditProfileBox>
      {students.length === 0 ?
        <Wrapper>
          <ListMsg>생성된 학생이 없습니다. 학생 계졍을 생성하려면 아래의 버튼을 눌러 다음 단계를 진행하세요.</ListMsg>
          <ActionStudentsBtn onClick={onClickCreateStudents}>학생 계정 생성하기</ActionStudentsBtn>
          {createStudents && <CreateStudents id={id} />}
        </Wrapper>
        :
        <></>
      }
    </EditProfileBox>
  </React.Fragment>);
}

export default StudentList;
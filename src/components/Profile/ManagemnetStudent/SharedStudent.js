import React, { useState } from 'react';
import styled from 'styled-components';
import EditProfileBox from '../Edit/EditProfileBox';
import SharedStudnetSend from './SharedStudentSend';


const SharedStudent = ({ students, username }) => {
  const [userStudents, setUserStudents] = useState(students.filter((item) => item.username.split("_")[0] === username) || [])
  const [sharedStudents, setSharedStudents] = useState(students.filter((item) => item.username.split("_")[0] !== username) || [])
  return (<EditProfileBox>
    <SharedStudnetSend userStudents={userStudents} />
  </EditProfileBox>);
}

export default SharedStudent;
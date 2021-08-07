import { faImage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput from './EditInput';
import EditProfileBox from './EditProfileBox';
import SaveBtn from './SaveBtn';

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const EditTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const ProfileImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  row-gap: 10px;
`

const PreviewImage = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  justify-self: center;
  align-self: center;
  div {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgb(200, 200, 200, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    font-size: 50px;
  }
`

const ImageLabel = styled.label`
  align-self: flex-start;
  text-align: center;
  padding: 10px 0px;
  border-radius: 5px;
  background-color: rgb(200, 200, 200, 0.2);
  cursor: pointer;
  transition: background-color 0.2s linear;
  svg {
    margin-left: 10px;
  }
  :hover {
    background-color: rgb(200, 200, 200, 0.4);
  }
`

const EditBasicInfo = ({ nickname, caption, avatarURL }) => {
  console.log(nickname, caption, avatarURL);
  const { register } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname,
      caption
    }
  })
  return (<EditProfileBox>
    <EditForm>
      <Wrapper>
        <div>닉네임</div>
        <EditInput
          {...register("nickname", { required: true })}
          type="text"
        />
      </Wrapper>
      <Wrapper>
        <div>자기소개</div>
        <EditTextArea
          cols={20}
          rows={2}
          {...register("caption", { required: true })}>
        </EditTextArea>
      </Wrapper>
      <ProfileImage>
        <div>프로필 이미지</div>
        <PreviewImage>
          <div><FontAwesomeIcon icon={faUser} /></div>
        </PreviewImage>
        <ImageLabel htmlFor="userAvatar">
          이미지 선택하기<FontAwesomeIcon icon={faImage} />
        </ImageLabel>
        <EditInput
          type="file"
          id="userAvatar"
          style={{ display: "none" }}
          accept="image/jpeg, image/jpg, image/png"
        />
      </ProfileImage>
      <SaveBtn type="submit" value="저장하기" />
    </EditForm>
  </EditProfileBox>);
}

export default EditBasicInfo;
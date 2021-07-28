import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const ImageLabel = styled.label`
  text-align: center;
  padding: 10px 0px;
  border-radius: 5px;
  background-color: ${props => props.bgColor};
  cursor: pointer;
  transition: background-color 0.2s linear;
  svg {
    margin-left: 10px;
  }
  :hover {
    background-color: ${props => props.hvBgColor};
  }
`

const PreviewImageBox = styled.div`
  margin-top: 10px; 
  position: relative;
  svg {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: tomato;
    cursor: pointer;
  }
`

const PreviewImage = styled.img`
  width: 100%;
  animation: ${fadeIn} 1s linear forwards;
`

const ImageContainer = ({ register, setValue, setImage, nextMode, bgColor, hvBgColor, imageId }) => {
  const [previewImg, setPreviewImg] = useState(undefined)
  const onChangeImage = ({ target: { files } }) => {
    if (files.length) {
      const file = files[0]
      setImage(file)
      let reader = new FileReader();
      reader.onload = function (e) { setPreviewImg(e.target.result); }
      reader.readAsDataURL(file);
    }
  }
  const onClickRemoveImage = () => {
    setPreviewImg(undefined)
    setValue("image", null)
  }
  return (<React.Fragment>
    <span className="inputTitle">・ 이미지</span>
    <span className="subMsg">이미지가 필요하나요?</span>
    <span className="subMsg">아래의 박스를 눌러 이미지를 불러오세요.</span>
    {nextMode === "" && <ImageLabel htmlFor={imageId} bgColor={bgColor} hvBgColor={hvBgColor}>
      사진선택하기
        <FontAwesomeIcon icon={faImage} />
    </ImageLabel>}
    <input
      {...register("image")}
      type="file"
      id={imageId}
      style={{ display: "none" }}
      accept="image/jpeg, image/jpg, image/png"
      onChange={onChangeImage}
    />
    {previewImg && <PreviewImageBox>
      <PreviewImage src={previewImg} />
      {nextMode === "" && <FontAwesomeIcon icon={faTimesCircle} onClick={onClickRemoveImage} />}
    </PreviewImageBox>}
  </React.Fragment>);
}

export default ImageContainer;
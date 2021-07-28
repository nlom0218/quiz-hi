import React from 'react';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeIn } from '../../animation/fade';

const TagInput = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const PlusBtn = styled.div`
  font-size: 30px;
  border-radius: 50%;
  grid-column: 2 / 4;
  align-self: center;
  justify-self: left;
  margin-left: 20px;
  cursor: pointer;
  color: ${props => props.color};
  opacity: 0.6;
  transition: opacity 0.2s linear;
  :hover {
    opacity: 1;
  }
`

const SeeTag = styled.div`
  margin-top: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color:  ${props => props.bgColor};
  margin-bottom: 10px;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.6s linear forwards;
`

const RemoveBtn = styled.div`
  margin-left: 5px;
  cursor: pointer;
`

const TagContainer = ({ getValues, tags, setTags, setValue, register, subMsg1, subMsg2, nextMode, question, color, bgColor }) => {
  const onClickPlusQuizTag = () => {
    if (getValues("tag") === "") {
      return
    }
    const newQuizTags = [...tags, getValues("tag")]
    setTags(newQuizTags)
    setValue("tag", "")
  }
  const onClickRemoveQuizTag = (tag) => {
    const newQuizTags = tags.filter((item) => item !== tag)
    setTags(newQuizTags)
  }
  const limitEvent = (type) => {
    if (type === "read") {
      if (question && nextMode !== "") {
        return "readOnly"
      } else {
        return ""
      }
    } else if (type === "btn") {
      if (question && nextMode !== "") {
        return false
      } else {
        return true
      }
    }
  }
  return (<React.Fragment>
    <span className="inputTitle">・ 태그</span>
    <span className="subMsg">{subMsg1}</span>
    <span className="subMsg">{subMsg2}</span>
    <TagInput>
      <input
        {...register("tag")}
        type="text"
        autoComplete="off"
        readOnly={limitEvent("read")}
      />
      <PlusBtn color={color}><FontAwesomeIcon icon={faPlusCircle} onClick={onClickPlusQuizTag} /></PlusBtn>
      {tags.length !== 0 && <SeeTag>
        {tags.map((item, index) => {
          return <TagBox key={index} bgColor={bgColor}>
            {item}
            {limitEvent("btn") && <RemoveBtn>
              <FontAwesomeIcon
                icon={faMinusCircle}
                onClick={() => onClickRemoveQuizTag(item)}
              />
            </RemoveBtn>}
          </TagBox>
        })}
      </SeeTag>}
    </TagInput>
  </React.Fragment>);
}

export default TagContainer;
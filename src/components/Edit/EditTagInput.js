import React from 'react';
import styled from 'styled-components';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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
  color: rgb(201, 102, 255, 0.2);
  transition: color 0.4s linear;
  :hover {
    color: rgb(201, 102, 255, 0.6);
  }
`

const SeeTag = styled.div`
  margin-top: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color: rgb(201, 102, 255, 0.4);
  font-size: 14px;
  margin-bottom: 10px;
  padding: 5px 10px;
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

const EditTagInput = ({ register, tags, getValues, setValue, setTags }) => {
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
  return (<TagInput>
    <input
      {...register("tag")}
      type="text"
      autoComplete="off"
    />
    <PlusBtn><FontAwesomeIcon icon={faPlusCircle} onClick={onClickPlusQuizTag} /></PlusBtn>
    {tags.length !== 0 && <SeeTag>
      {tags.map((item, index) => {
        return <TagBox key={index}>
          {item}
          <RemoveBtn>
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => onClickRemoveQuizTag(item)}
            />
          </RemoveBtn>
        </TagBox>
      })}
    </SeeTag>}
  </TagInput>);
}

export default EditTagInput;
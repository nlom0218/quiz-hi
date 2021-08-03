import React from 'react';
import styled from 'styled-components';

const SPageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
`

const PageBarBtn = styled.div`
  padding: 8px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.firstPage && "0.4"};
    cursor: ${props => props.firstPage ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
    opacity: ${props => props.lastPage && "0.4"};
    cursor: ${props => props.lastPage ? "not-allowd" : "pointer"};
  }
`

const PageBar = ({ page, lastPage, setPage }) => {
  const onClickPageBtn = (type) => {
    if (type === "pre") {
      if (page === 1) {
        return
      }
      setPage(pre => pre - 1)
    } else if (type === "next") {
      if (lastPage === page) {
        return
      }
      setPage(pre => pre + 1)
    }
  }
  return (<SPageBar>
    <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
    <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
  </SPageBar>);
}

export default PageBar;
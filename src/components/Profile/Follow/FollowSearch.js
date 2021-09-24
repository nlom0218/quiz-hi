import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 360px 1fr;
`

const Layout = styled.div`
  background-color: ${props => props.theme.boxColor};
`

const FollowSearch = () => {
  return (<Container>
    <div><FontAwesomeIcon icon={faSearch} /> 팔로워 / 팔로잉 검색</div>
    <Layout>

    </Layout>
  </Container>);
}

export default FollowSearch;
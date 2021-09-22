import React from 'react';
import AccountContainer from '../components/Account/AccountContainer';
import Title from '../components/Account/Title';
import FormLayout from '../components/Account/FormLayout';
import styled from 'styled-components';
import InputLayout from '../components/Account/InputLayout';
import { useForm } from 'react-hook-form';
import PasswordEmailForm from '../components/Account/PasswordEmailForm';

const Msg = styled.div``

const PasswordReset = () => {
  const { register } = useForm()
  return (<AccountContainer>
    <Title page="비밀번호 찾기" />
    <FormLayout>
      <PasswordEmailForm />
    </FormLayout>
  </AccountContainer>);
}

export default PasswordReset;
import { useRef, ChangeEvent, useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { FiCamera } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { GetServerSideProps } from 'next';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import styles from '../styles/pages/profile.module.scss';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import getValidationErrors from '../utils/getValidationErrors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface User {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const { updateUser } = useAuth();

  async function handleSubmit(data: ProfileFormData): Promise<void> {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? {
              old_password,
              password,
              password_confirmation,
            }
          : {}),
      };

      const response = await api.put('/profile', formData);

      updateUser(response.data);
      formRef.current.clearField('old_password');
      formRef.current.clearField('password');
      formRef.current.clearField('password_confirmation');

      toast.success(
        'Suas informações do perfil foram atualizadas com sucesso!',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      formRef.current.clearField('old_password');
      formRef.current.clearField('password');
      formRef.current.clearField('password_confirmation');

      toast.error('Ocorreu um erro ao atualizar perfil, tente novamente.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function handleAvatarChange(
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then(response => {
        updateUser(response.data);

        toast.success(
          'Suas informações do perfil foram atualizadas com sucesso!',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    }
  }

  return (
    <>
      <Head>
        <title>Pokedex | Perfil</title>
      </Head>
      <ToastContainer />
      <main className={styles.container}>
        <div>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.avatarInput}>
              <img
                src={user.avatar_url ? user.avatar_url : '/images/user.png'}
                alt="Avatar"
              />
              <label htmlFor="avatar">
                <FiCamera />
                <input onChange={handleAvatarChange} type="file" id="avatar" />
              </label>
            </div>

            <Input
              name="name"
              defaultValue={user.name}
              type="text"
              placeholder="Nome"
            />

            <Input
              name="email"
              defaultValue={user.email}
              type="email"
              placeholder="E-mail"
            />

            <Input
              name="old_password"
              type="password"
              placeholder="Senha atual"
            />

            <Input name="password" type="password" placeholder="Nova senha" />

            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmar senha"
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = req.cookies;

  const returnUser = JSON.parse(user);
  return {
    props: {
      user: returnUser,
    },
  };
};

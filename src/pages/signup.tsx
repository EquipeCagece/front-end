import { useState, useEffect, useRef } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import styles from '../styles/pages/commonStylesHome.module.scss';
import getValidationErrors from '../utils/getValidationErrors';
import api from '../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const [randomValue, setRandoValue] = useState(0);

  const { push } = useRouter();

  useEffect(() => {
    setRandoValue(Math.floor(Math.random() * 10));
  }, []);

  async function handleSubmit(data: SignUpFormData): Promise<void> {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password')],
          'Confirmação incorreta'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      push('/');
      
      toast.success('Cadastro realizado. Você já pode fazer seu logon na PokeTeam.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      toast.error('Erro no Cadastro. Ocorreu um erro ao fazer o cadastro, tente novamente.', {
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

  return (
    <>
      <Head>
        <title>PokeTeam | Cadastro</title>
      </Head>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url("/images/background_${randomValue}.jpg")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="Logo" />
          </a>
        </Link>
        <div>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro</h1>

            <Input name="name" type="text" id="name" placeholder="Nome" />

            <Input name="email" type="text" id="email" placeholder="E-mail" />

            <Input
              name="password"
              type="password"
              id="password"
              placeholder="Senha"
            />

            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <nav className={styles.links}>
            Já possui conta?
            <Link href="/">
              <a>Voltar para login</a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

import { useState, ChangeEvent, useEffect, useRef } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import styles from '../styles/pages/commonStylesHome.module.scss';
import getValidationErrors from '../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

export default function Home(): JSX.Element {
  const { signIn } = useAuth();
  const { push } = useRouter();

  const formRef = useRef<FormHandles>(null);

  const [randomValue, setRandoValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setRandoValue(Math.floor(Math.random() * 10));
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(data: SignInFormData): Promise<void> {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      push('/profile');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      toast.error('Ocorreu um erro ao fazer login, cheque as credenciais.');
    }
  }

  return (
    <>
      <Head>
        <title>PokeTeam | Login</title>
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
            <h1>Login</h1>

            <Input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleInputChange}
            />

            <Input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={handleInputChange}
            />

            <Button type="submit">Entrar</Button>
          </Form>

          <nav className={styles.links}>
            Não tem conta?
            <Link href="/signup">
              <a>Criar conta</a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

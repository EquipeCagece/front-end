import { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';

import { useRouter } from 'next/router';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { FiUpload, FiX } from 'react-icons/fi';

import { Button } from '../Button';
import styles from './styles.module.scss';
import api from '../../services/api';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalTeam({ isOpen, onRequestClose }: ModalProps): JSX.Element {
  const router = useRouter();

  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [name, setName] = useState('');

  async function handleCreateTeam(): Promise<void> {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('image', selectedFile);

      const response = await api.post('/teams', data);

      router.push(`/teams/team/${response.data.id}`);

      toast.success('Time criado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error('Erro na criação de time. Tente novamente!', {
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

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      setSelectedFile(file);
    },
    [setSelectedFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <FiX size={24} color="#fff" />
      </button>
      <div className={styles.container}>
        <h2>Criar time</h2>
        <section className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} accept="image/*" />
          {selectedFileUrl !== '' ? (
            <img
              src={`${isOpen ? selectedFileUrl : setSelectedFileUrl('')}`}
              alt="Team Thumbnail"
            />
          ) : (
            <p>
              <FiUpload />
              Imagem do time
            </p>
          )}
        </section>
        <input
          onChange={event => setName(event.target.value)}
          type="text"
          placeholder="Nome do time"
        />
        <Button onClick={handleCreateTeam}> Criar Time </Button>
      </div>
    </Modal>
  );
}

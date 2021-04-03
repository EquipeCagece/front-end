import { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalTeam({ isOpen, onRequestClose }: ModalProps): JSX.Element {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();

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
        <input type="text" placeholder="Nome do time" />
        <button type="button">Criar Time</button>
      </div>
    </Modal>
  );
}

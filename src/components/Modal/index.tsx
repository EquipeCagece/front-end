/* eslint-disable prettier/prettier */
import { useCallback, useState } from 'react'
import Modal from 'react-modal'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

interface ModalProps {
    isOpen: boolean,
    onRequest: () => void
}

export function ModalTeam({ isOpen, onRequest }: ModalProps): JSX.Element {
    const [selectedFileUrl, setSelectedFileUrl] = useState('')
    const [selectedFile, setSelectedFile] = useState<File>()

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        const fileUrl = URL.createObjectURL(file)

        setSelectedFileUrl(fileUrl)
        setSelectedFile(file)
    }, [setSelectedFile])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequest}>
            <div {...getRootProps()}>
                <input {...getInputProps()} accept="image/*" />
                {
                    selectedFileUrl ? <img src={selectedFileUrl} alt="Team Thumbnail" /> : (
                        <p>
                            <FiUpload />
                        Imagem do time
                        </p>
                    )
                }
            </div>
            <input type="text" placeholder="Nome do time" />
            <button type="button">Criar Time</button>
        </Modal>
    )
}

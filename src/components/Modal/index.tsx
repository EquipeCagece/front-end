/* eslint-disable prettier/prettier */
import Modal from 'react-modal'

interface ModalProps {
    isOpen: boolean,
}

export function ModalTeam({ isOpen }: ModalProps): JSX.Element {
    return (
        <Modal isOpen={isOpen}>
            <form>           
                <input type="text" placeholder="Nome do time"/>
            </form>
        </Modal>
    )
}

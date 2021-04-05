import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import styles from './styles.module.scss';
import api from '../../services/api';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pokemonId: number;
}

interface TeamsProps {
  id: string;
  name: string;
}

export function AddToTeamModal({
  isOpen,
  onRequestClose,
  pokemonId,
}: ModalProps): JSX.Element {
  const [teams, setTeams] = useState<TeamsProps[]>([]);
  const router = useRouter();

  async function handleAddPokemonToTeam(team_id: string): Promise<void> {
    try {
      await api.put('/pokemonTeams', {
        pokemon_id: pokemonId,
        team_id,
      });

      router.push(`/team/teams/${team_id}`);

      toast.success('Pokemon adicionado ao time com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error(
        'Ocorreu um erro ao adicionar pokemon ao time, talvez você já tenha adicionado esse pokemon a esse time!',
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
    }
  }

  useEffect(() => {
    async function loadTeams(): Promise<void> {
      const response = await api.get('/teams');

      setTeams(response.data);
    }

    loadTeams();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <ToastContainer />
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <FiX size={24} color="#fff" />
      </button>
      <div className={styles.container}>
        <h2>Adicionar ao time</h2>
        {teams.map(team => (
          <button
            onClick={() => handleAddPokemonToTeam(team.id)}
            key={team.id}
            type="button"
          >
            <div>{team.name}</div>
          </button>
        ))}
      </div>
    </Modal>
  );
}

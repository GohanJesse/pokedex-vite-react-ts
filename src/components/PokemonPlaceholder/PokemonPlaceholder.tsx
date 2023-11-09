import { motion } from 'framer-motion';
import Styles from './PokemonPlaceholder.module.scss';

type PokemonPlaceholderProps = {
  className?: string;
};


export default function PokemonPlaceholder({ className }: PokemonPlaceholderProps) {
  return (
    <motion.div
      initial={{ x: '200%' }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: '200%' }}
      transition={{ duration: 0.5 }}
      className={`${Styles.pokemonPlaceholder} ${className}`}
    >
      <img className={Styles.pikachuPlaceholder} src="/pikachu.png" alt="Placeholder" />
      <p className={Styles.placeholderPokemonDetails}>Sélectionnez un Pokémon à afficher ici.</p>
    </motion.div>
  )
}

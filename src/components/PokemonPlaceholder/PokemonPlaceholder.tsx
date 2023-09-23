import Styles from './PokemonPlaceholder.module.css';

type PokemonPlaceholderProps = {
  className?: string;
};

export default function PokemonPlaceholder({ className }: PokemonPlaceholderProps) {
  return (
    <div className={`${Styles.pokemonPlaceholder} ${className}`}>
        <img className={Styles.pikachuPlaceholder} src="/pikachu.png" alt="Placeholder" />
        <p className={Styles.placeholderPokemonDetails}>Sélectionnez un Pokémon à afficher ici.</p>
    </div>
  )
}

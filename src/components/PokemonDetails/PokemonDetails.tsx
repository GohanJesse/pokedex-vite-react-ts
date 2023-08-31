import Styles from './PokemonDetails.module.css';
import { Pokemon } from '../../models/PokemonTypes';

type PokemonDetailsProps = {
  pokemon: Pokemon;
};


export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className={Styles.modalDetails}>
      <div className={Styles.starReturn}>
        Croix retour
      </div>
      <div className={Styles.cardPokemonDetails}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <span>#{pokemon.id}</span>
        <h2 className={Styles.pokemonCardName}>{pokemon.name}</h2>
        <div className={Styles.linePokemonType}>
          {pokemon.types.map(type => (
            <div key={type.type.name} className={Styles.typeContainer}>
              {type.type.name}
            </div>
          ))}
        </div>
        <h4>Entrée Pokédex</h4>
        <span>description</span>
        <div className={Styles.linePhysic}>
          <div className={Styles.pokemonHeight}>
            <h4>taille</h4>
            <div>{pokemon.height / 10}m</div>
          </div>
          <div className={Styles.pokemonWeight}>
            <h4>Poids</h4>
            <div>{pokemon.weight / 10}kg</div>
          </div>
        </div>
        <div className={Styles.lineCapacity}>
          <h4>Capacités</h4>
          <div className={Styles.containerCapacity}>
            {pokemon.abilities.map(ability => (
            <div key={ability.ability.name}>
              {ability.ability.name}
            </div>
          ))}
          </div>
        </div>
        <h4>Statistiques</h4>
        <div className={Styles.rowCenter}>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className={Styles.pokemonStatContainer}>
              <div className={Styles.pokemonStatName}>{stat.stat.name}</div>
              <div className={Styles.pokemonStat}>{stat.base_stat}</div>
            </div>
          ))}
        </div>
        <div className={Styles.evolutionContainer}>
          <h4>Évolution</h4>
          <div className={Styles.rowCenter}>
            <img src="" alt="" />
            <div className={Styles.evolutionLevelFirst}>niv. 15</div>
            <img src="" alt="" />
            <div className={Styles.evolutionLevelLast}>niv. 30</div>
            <img src="" alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}

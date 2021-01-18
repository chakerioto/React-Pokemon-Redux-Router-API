import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemon } from '../actions/PokemonAction';
import _ from 'lodash';

const Pokemon = props => {
  const pokemonState = useSelector(state => state.PokemonMultipleReducer);

  const dispatch = useDispatch();
  const pokemonName = props.match.params.pokemon;
  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return (
        <div className="pokemon-wrapper">
          <div className="items">
            <h1>{pokemonName}</h1>
            <h3>Sprites</h3>
            <img alt="" src={pokeData.sprites['back_default']}></img>
            <img alt="" src={pokeData.sprites['front_shiny']}></img>
            <img alt="" src={pokeData.sprites['back_shiny']}></img>
            <img alt="" src={pokeData.sprites['front_default']}></img>
          </div>
          <div className="item">
            <h1>Stats</h1>
            {pokeData.stats.map(el => {
              return (
                <p>
                  {el.stat.name} {el.base_stat}
                </p>
              );
            })}
          </div>
          <div className="item">
            <h1>Skills</h1>
            {pokeData.abilities.map(el => {
              return (
                <div>
                  <p>{el.ability.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== '') {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>Error getting pokemon</p>;
  };

  return <div className="poke">{ShowData()}</div>;
};

export default Pokemon;

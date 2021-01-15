import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { GetPokemonList } from '../actions/PokemonAction';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(state => state.PokemonList);

  useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const ShowData = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="poke-data">
          {pokemonList.data.map(el => (
            <div>
              <p>{el.name}</p>
              <Link to={`/pokemon/${el.name}`}>View</Link>
            </div>
          ))}
        </div>
      );
    }
    if (pokemonList.loading) {
      return <p>Loading....</p>;
    }
    if (pokemonList.errorMsg !== '') {
      return <p>{pokemonList.errorMsg}</p>;
    }
    return <p>unable to get DATa</p>;
  };

  return <div>{ShowData()}</div>;
};

export default PokemonList;

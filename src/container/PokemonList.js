import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { GetPokemonList } from '../actions/PokemonAction';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PokemonList = props => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const pokemonList = useSelector(state => state.PokemonList);

  useEffect(() => {
    FetchData(1);
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleClick = e => {
    e.preventDefault();
    props.history.push(`/pokemon/${search}`);
  };

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const ShowData = () => {
    if (pokemonList.loading) {
      return <p>Loading....</p>;
    }
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className="poke-data">
          {pokemonList.data.map(el => (
            <div class="pokemon-item">
              <p>{el.name}</p>
              <Link to={`/pokemon/${el.name}`}>View</Link>
            </div>
          ))}
        </div>
      );
    }
    if (pokemonList.errorMsg !== '') {
      return <p>{pokemonList.errorMsg}</p>;
    }
    return <p>unable to get DATa</p>;
  };

  return (
    <div>
      <div className="search-wrapper">
        <p>Search:</p>
        <input type="text" onChange={handleChange} value={search} />
        <button onClick={handleClick}>Search</button>
      </div>
      {ShowData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={data => FetchData(data.selected + 1)}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

export default PokemonList;

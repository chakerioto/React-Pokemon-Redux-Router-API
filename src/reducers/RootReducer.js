import { combineReducers } from 'redux';
import PokemonListReducer from './PokemonListReducer';
import PokemonMultipleReducer from './PokemonMultipleReducer';

const RootReducer = combineReducers({
  PokemonList: PokemonListReducer,
  PokemonMultipleReducer: PokemonMultipleReducer

});

export default RootReducer;

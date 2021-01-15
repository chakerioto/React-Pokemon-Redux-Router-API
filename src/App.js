import './App.css';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import PokemonList from './container/PokemonList';
import Pokemon from './container/Pokemon';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={'/'}>Search</NavLink>
      </nav>
      <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />

        {/* Redirect to "/" if cases above are not matched */}
        <Redirect to={'/'} />
      </Switch>
    </div>
  );
}

export default App;

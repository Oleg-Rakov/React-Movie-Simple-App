import { useState } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import CurrentFilm from './components/CurrentFilm';
import Films from './components/Films';
import Header from './components/Header';
import Search from './components/Search';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <BrowserRouter>
      <Route path="/" exact render={() => <Header />} />
      <Route
        path="/"
        exact
        render={() => (
          <Search
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        )}
      />
      <Route
        path="/"
        exact={true}
        render={() => <Films searchResults={searchResults} />}
      />
      <Route path="/film/:id?" component={CurrentFilm} />
    </BrowserRouter>
  );
}

export default App;

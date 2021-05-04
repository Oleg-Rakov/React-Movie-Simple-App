import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import CurrentFilm from './components/CurrentFilm';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact render={() => <Main />} />
      <Route path="/film/:id?" component={CurrentFilm} />
    </BrowserRouter>
  );
}

export default App;

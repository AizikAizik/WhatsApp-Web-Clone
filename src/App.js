import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './components/auth/Login';
import Chat from './components/chat/Chat';
import SideBar from './components/sidebar/SideBar';
import { useStateValue } from './provider/stateProvider';

function App() {

  const [{user}, dispatch] = useStateValue(null);

  return (
    <div className="App">
      { !user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <SideBar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );

}

export default App;

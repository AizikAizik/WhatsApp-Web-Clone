import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Chat from './components/chat/Chat';
import SideBar from './components/sidebar/SideBar';

function App() {

  return (
    <div className="App">
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
    </div>
  );

}

export default App;

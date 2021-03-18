import './App.css';
import Chat from './components/chat/Chat';
import SideBar from './components/sidebar/SideBar';

function App() {

  return (
    <div className="App">
      <div className="app__body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
  
}

export default App;

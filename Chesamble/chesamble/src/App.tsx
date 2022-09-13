import './App.css';
import Header from './View/components/Header';
import Board from './View/components/Board';
function App() {
  return (
    <div className="App">
      <Header subtitle='Beijing'/>
      <Board />
    </div>
  );
}

export default App;

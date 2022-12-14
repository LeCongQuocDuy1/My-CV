import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <>
        <Header></Header>

        <div className="main">
          <Home></Home>
        </div>
      </>
    </div>
  );
}

export default App;

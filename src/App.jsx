import './App.css';
import Footer from './component/Footer';
import Main from './component/Main';
import Header from './component/Header';


function App() {
  return (
    <div className='root'>
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

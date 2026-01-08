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
      <div>
        This week's specials!
        <div className='buttonMain'>123</div>
      </div>
      <div className='info'>
        Our customers love us
      </div>
      <div>
        <p>Little Lemon</p>
      </div>

      <footer className='info'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

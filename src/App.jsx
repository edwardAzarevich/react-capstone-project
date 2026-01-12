import './App.css';
import Footer from './component/Footer';
import Main from './component/Main';
import Header from './component/Header';
import CallToActionMain from './component/callToAction/CallToActionMain';
import Special from './component/special/Special';


function App() {
    return (
        <div className='root'>
            <header>
                <Header />
            </header>
            <div className='info'>
                <CallToActionMain />
            </div>
            <div>
                <Special />
            </div>
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

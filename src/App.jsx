import './App.css';
import Footer from './component/footer/Footer';
import Header from './component/Header';
import CallToActionMain from './component/callToAction/CallToActionMain';
import Special from './component/special/Special';
import Testimonials from './component/customersSay/Testimonials';
import About from './component/about/About';


function App() {
    return (
        <div className='root'>
            <header>
                <Header />
            </header>
            <div className='info-background'>
                <CallToActionMain />
            </div>
            <div>
                <Special />
            </div>
            {<Testimonials />}
            <About />

            <footer className='info-background'>
                <Footer />
            </footer>
        </div>
    );
}

export default App;

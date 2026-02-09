import './App.css';
import Footer from './component/footer/Footer';
import Header from './component/Header';
import CallToActionMain from './component/callToAction/CallToActionMain';
import Special from './component/special/Special';
import Testimonials from './component/customersSay/Testimonials';
import About from './component/about/About';
import BookingForm from './component/bookingForm/BookingForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function HomePage() {
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
      <Testimonials />
      <About />
      <footer className='info-background'>
        <Footer />
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/booking' element={<BookingForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

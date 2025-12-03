import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        

        <Route path="/pokemon/:name" element={<div>Vou fazer ainda</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
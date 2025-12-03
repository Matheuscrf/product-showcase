import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { TeamProvider } from './contexts/TeamContext';
function App() {
  return (
    <TeamProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/pokemon/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
    </TeamProvider>
    
  );
}

export default App;
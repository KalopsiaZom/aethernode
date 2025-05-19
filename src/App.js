import { Routes, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import Floor1 from './floors/floor1'; 
import Floor2 from './floors/floor2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/floor1" element={<Floor1 />} />
      <Route path="/floor2" element={<Floor2 />} />
    </Routes>
  );
}

export default App;

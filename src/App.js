import { Routes, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import Floor1 from './floors/floor1'; 
import Floor2 from './floors/floor2';
import Floor3 from './floors/floor3';
import Insidehouse from './floors/houseInside'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/floor1" element={<Floor1 />} />
      <Route path="/floor2" element={<Floor2 />} />
      <Route path="/floor3" element={<Floor3 />} />
      <Route path="/insidehouse" element={<Insidehouse />} />
    </Routes>
  );
}

export default App;

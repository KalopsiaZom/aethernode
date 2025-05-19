import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-900">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">My Cool Game</h1>
        <button
          onClick={() => navigate('/floor1')}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black text-xl font-semibold rounded-2xl shadow-lg transition"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default MainMenu;

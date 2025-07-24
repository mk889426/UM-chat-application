import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import Login from './pages/login';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <ChatRoom /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

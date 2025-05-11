import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { PrivateRoute } from './middlewares/privateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />} />
        
        {/* <Route path="/surveys" element={<SurveysPage />} /> */}
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;

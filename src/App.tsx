import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LoginPage } from './features/auth/pages/LoginPage';
import { SurveysPage } from './features/survey/pages/surveyPage';
import { PrivateRoute } from './middlewares/privateRoutes';
import { store } from './store/store';
import Layout from './layouts/layout';
import {setupInterceptors } from "../src/api/axios.service"
import { RegisterPage } from './features/auth/pages/Register.page';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    setupInterceptors(navigate);
  }, []);
  return (
    <Provider store={store}>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/auth">
            <Route path="login" element={<LoginPage />}  />
            <Route path="register" element={<RegisterPage />}  />
          </Route>
          <Route
            path="/surveys"
            element={
              <Layout>
                <SurveysPage />
              </Layout>
            }
          />
        </Routes>
    </Provider>
  );
}

export default App;

import './assets/style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routers/PrivateRoute';
import UserSkills from "./pages/UserSkills";
import SignIn from "./pages/SignIn";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/skills"
          element={
            <PrivateRoute>
              <UserSkills />
            </PrivateRoute>
          } />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

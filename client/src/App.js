import './assets/style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import UserSkills from "./pages/UserSkills";
import SignIn from "./pages/SignIn";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/*<Route
          path="/skills"
          element={
            <PrivateRoute>
              <UserSkills />
            </PrivateRoute>
          } />*/}
        <Route path="/" element={<PublicRoute />}>
          <Route path="/skills" element={<UserSkills />} />
          <Route path="/skills-2" element={<UserSkills />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;

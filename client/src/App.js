import './App.css';
import { BrowserRouter as Router, Route, Routes,  Navigate  } from 'react-router-dom';
import Login from "./views/Login";
import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";
import {AuthProvider} from "./helpers/AuthProvider";
import {PrivateRoute} from "./helpers/PrivateRoute";

function App() {

  return (
      <AuthProvider>
        <Router>
        <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route  path='/dashboard' element={<PrivateRoute/>}>
                <Route  path='/dashboard' element={<Layout><Dashboard></Dashboard> </Layout>}/>
            </Route>
            <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
        </Router>
      </AuthProvider>
  );
}
export default App;

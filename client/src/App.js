import './App.css';
import { BrowserRouter as Router, Route, Routes,  Navigate  } from 'react-router-dom';
import Login from "./views/Login";
import Layout from "./views/Layout";
import Home from "./views/Home";
import {AuthProvider} from "./helpers/AuthProvider";
import {PrivateRoute} from "./helpers/PrivateRoute";

function App() {

  return (
      <AuthProvider>
        <Router>
        <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route  path='/home' element={<PrivateRoute/>}>
                <Route  path='/home' element={<Layout><Home></Home> </Layout>}/>
            </Route>
            <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
        </Router>
      </AuthProvider>
  );
}
export default App;

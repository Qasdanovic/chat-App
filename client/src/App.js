import UserForm from "./components/UserForm";
import LoginForm from "./components/LoginForm";
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import Main from "./components/Accueil/Main";
import UpdateProfile from "./components/profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
       <ToastContainer position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<UserForm />} />
          <Route path="/accueil" element={<Main />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
      {/* <MessagesBox /> */}
      {/* <Main /> */}
      
    </div>
  );
}

export default App;

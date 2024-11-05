import UserForm from "./components/UserForm";
import LoginForm from "./components/LoginForm";
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import MessagesBox from "./components/message/messagesBox";
import Main from "./components/Accueil/Main";
import UpdateProfile from "./components/profile";


function App() {
  return (
    <div className="App">
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

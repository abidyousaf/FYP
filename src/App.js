import React from "react";
import AuthContextProvider from "./contexts/AuthContext";
import RootContainer from "./containers/RootContainer";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import 'react-notifications/lib/notifications.css';

import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";



import './app.css';

function App() {
  return (
    <AuthContextProvider>
      <RootContainer />
      <NotificationContainer/>
      {/* <ToastContainer /> */}
    </AuthContextProvider>
  );
}

export default App;

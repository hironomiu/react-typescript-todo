import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Route, BrowserRouter } from "react-router-dom"
import App from "./components/App"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

import { AuthProvider } from "./contexts/auth"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <>
          <Route exact path="/" component={App} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
        </>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

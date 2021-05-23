import React, { useState, useEffect, useContext } from "react"
import styels from "./SignIn.module.css"
import { Button, FormControl, TextField, Typography } from "@material-ui/core"
import { auth } from "../firebase"
import { useHistory, withRouter } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const { signup } = useContext(AuthContext)

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => user && history.push("/"))
    return () => unSub()
  }, [history])

  return (
    <div className={styels.login__root}>
      <h1>SignUp</h1>
      <br />{" "}
      <FormControl>
        {" "}
        <TextField
          InputLabelProps={{ shrink: true }}
          name="nickname"
          label="Nickname"
          value={nickname}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setNickname(e.target.value)}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          label="E-mail"
          value={email}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setEmail(e.target.value)}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          name="password"
          label="password"
          value={password}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setPassword(e.target.value)}
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={async () => signup(email, password, nickname)}
      >
        register
      </Button>
      <br />
      <Typography align="center">
        <span onClick={() => history.push("SignIn")}>Back to SignIn</span>
      </Typography>
    </div>
  )
}

export default withRouter(SignUp)

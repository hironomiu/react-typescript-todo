import React, { useState, useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/styles"
import { Button, FormControl, TextField, Typography } from "@material-ui/core"
import { auth } from "../utils/firebase"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  const classes = useStyle()
  const { signup } = useContext(AuthContext)

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => user && history.push("/"))
    return () => unSub()
  }, [history])

  return (
    <div className={classes.login__root}>
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

const useStyle = makeStyles({
  login__root: {
    fontFamily: "serif",
    color: "dimgray",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    "& span": {
      cursor: "pointer",
    },
  },
})

export default SignUp

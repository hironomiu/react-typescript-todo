import React, { useState, useEffect, useContext } from "react"
import { FormControl, TextField, List, Grid } from "@material-ui/core"
import {
  AddToPhotos as AddToPhotoIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons"
import TodoItem from "./TodoItem"
import { db, auth } from "../utils/firebase"
import { makeStyles } from "@material-ui/styles"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

interface MyTodos {
  uid: string
  id: string
  title: string
  body: string
}

interface MyProfile {
  created_at: {}
  email: string
  nickname: string
  uid: string
  updated_at: {}
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<MyTodos[]>([
    { uid: "", id: "", title: "", body: "" },
  ])

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const [profile, setProfile] = useState<MyProfile>({
    created_at: {},
    email: "",
    nickname: "",
    uid: "",
    updated_at: {},
  })

  const classes = useStyle()
  const history = useHistory()
  const { uid } = useContext(AuthContext)

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && history.push("SignIn")
    })
    return () => unSub()
  }, [history])

  useEffect(() => {
    if (!uid) return

    const unSub = db
      .collection("users/" + uid + "/todos")
      .onSnapshot((snapshot) => {
        if (!snapshot.docs) return
        setTodos(
          snapshot.docs.map((doc) => ({
            uid: uid,
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
          }))
        )
      })

    return () => unSub()
  }, [uid])

  useEffect(() => {
    if (!uid) return

    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        const data: any = doc.data()
        setProfile(data)
      })
  }, [uid])

  const newTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    db.collection("users/" + uid + "/todos").add({
      title: title,
      body: body,
    })
    setTitle("")
    setBody("")
  }

  return (
    <div className={classes.app__root}>
      <h1 className={classes.app__title}>
        {profile?.nickname}'s ToDo App
        <button
          className={classes.app__logout}
          onClick={async () => {
            try {
              await auth.signOut()
              history.push("/signin")
            } catch (error) {
              alert(error.message)
            }
          }}
        >
          {" "}
          <ExitToAppIcon />
        </button>
      </h1>
      <br />
      <FormControl>
        <Grid container justify="flex-end">
          <TextField
            className={classes.field}
            InputLabelProps={{
              shrink: true,
            }}
            label="New title ?"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          ></TextField>

          <TextField
            className={classes.field}
            InputLabelProps={{
              shrink: true,
            }}
            label="New body ?"
            value={body}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBody(e.target.value)
            }
          ></TextField>
        </Grid>
      </FormControl>
      <button
        disabled={!title || !body}
        onClick={(e) => newTodo(e)}
        className={classes.app__entry_icon}
      >
        <AddToPhotoIcon />
      </button>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            uid={todo.uid}
            id={todo.id}
            title={todo.title}
            body={todo.body}
          />
        ))}
      </List>
    </div>
  )
}

const useStyle = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 30,
  },
  app__root: {
    textAlign: "center",
    color: "dimgray",
    fontFamily: "serif",
  },
  app__title: {
    display: "inline-block",
  },
  app__entry_icon: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    marginTop: "30px",
    color: "dimgray",
    "&:disabled": {
      color: "#ccc",
      cursor: "none",
    },
  },
  app__icon: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    marginTop: "30px",
    color: "dimgray",
  },
  app__logout: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "dimgray",
    marginLeft: "10px",
  },
})

export default App

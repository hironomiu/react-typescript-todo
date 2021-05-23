import React, { useState } from "react"
import { db } from "../firebase"
import { ListItem, Grid, TextField, FormControl } from "@material-ui/core"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import styles from "./TodoItem.module.css"
import { makeStyles } from "@material-ui/styles"

interface PROPS {
  uid: string
  id: string
  title: string
  body: string
}

const useStyle = makeStyles({
  list: {
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
})

const TodoItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)

  const classes = useStyle()

  const editTodo = () => {
    db.collection("users/" + props.uid + "/todos")
      .doc(props.id)
      .set({ title: title, body: body }, { merge: true })
  }
  const deleteTodo = () => {
    db.collection("users/" + props.uid + "/todos")
      .doc(props.id)
      .delete()
  }

  return (
    <ListItem className={classes.list}>
      <FormControl>
        <Grid container justify="flex-end">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Edit title"
            value={title}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setTitle(e.target.value)}
          ></TextField>

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Edit body"
            value={body}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setBody(e.target.value)}
          ></TextField>
        </Grid>
      </FormControl>
      <button className={styles.todoitem__icon} onClick={() => editTodo()}>
        <EditOutlinedIcon />
      </button>
      <button className={styles.todoitem__icon} onClick={() => deleteTodo()}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>
  )
}

export default TodoItem

import React, { useEffect, useRef, useState } from 'react'
import {
  Typography, 
  Container, 
  Paper, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  TextField
} from '@material-ui/core/';
import io from "socket.io-client"
import { makeStyles } from '@material-ui/core/styles';
import CustomAvatar from './CustomAvatar';
import Header from './Header';
import FormInputButton   from './FormInputButton';

const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
        height: '50vh'
    },
    list: {
        marginBottom: theme.spacing(3),
        maxHeight: '100%',
        overflow: 'auto'
    },
}));

const Chat = () => {
    const classes = useStyles();

    const [username, setUsername] = useState()
    const [messages, setMessages] = useState([])

    const socketRef = useRef()

    const handleChange = (event) => {
      setUsername(event.target.value)
    }

    useEffect(() => {
      socketRef.current = io.connect("http://localhost:4000")
      socketRef.current.on("message", (event) => {
        const { username, message } = event;

        setMessages([...messages, {username, message}])
      })

      return () => socketRef.current.disconnect()
    }, [messages])
  
    const stateMessage = (message) => {
      socketRef.current.emit("message", { username, message })
    }
  
    const showMessage = () => {
      return messages.map(({ username, message }, index) => (
        <Container key={index}>
          <CustomAvatar name={username} size="md"/>
          <ListItemText primary={message}  />
        </Container>
      ))
    }

    return (
        <Container>
          <Header />
          <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Write your name"
            autoFocus
            onChange={handleChange} 
            value={username}
          />
          <form>
            <Paper square className={classes.paper}>
              <Typography className={classes.text} variant="h5" gutterBottom>
              Chat
              </Typography>
              <List className={classes.list} >
                <ListItem button>
                <ListItemAvatar>
                  {showMessage()}
                </ListItemAvatar>
              <ListItemText  />
              </ListItem>
              </List>
            </Paper>
            <FormInputButton stateMessage={stateMessage}/>
          </form>
        </Container>
    )
}

export default Chat

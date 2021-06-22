import React, {useEffect, useRef, useState} from 'react'
import { Typography, 
         Container, 
         Paper, 
         List, 
         ListItem, 
         ListItemAvatar, 
         ListItemText, 
         TextField } from '@material-ui/core/';
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

    const [ dispatch, setState ] = useState({ message: "", name: "" })
	
    const [ chat, setChat ] = useState([])
  
    const socketRef = useRef()

    useEffect(
      () => {
        socketRef.current = io.connect("http://localhost:4000")
        socketRef.current.on("message", (event) => {
          const { name, message } = event;

          setChat([ ...chat, { name, message } ])
        })

        return () => socketRef.current.disconnect()
      },
      [ chat ]
    )
  
    const onTextChange = (e) => {
      setState({ ...dispatch, [e.target.name]: e.target.value })
    }
  
    const stateMessage = (message) => {
      const { name } = dispatch
      socketRef.current.emit("message", { name, message })
    }
  
    const showMessage = () => {
      return chat.map(({ name, message }, index) => (
            <Container key={index}>
              <CustomAvatar name={name} size="md"/>
              <ListItemText primary={message}  />
            </Container>
          ))
    }

    return (

        <Container>
         <Header />
         <form>
         <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Write your name"
            autoFocus
            name="name" 
            onChange={(e) => onTextChange(e)} 
            value={dispatch.name}
          />
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

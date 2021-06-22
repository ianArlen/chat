import React, { useState } from 'react'
import { Paper , 
    Button, 
    Grid, 
    Box, 
    TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      paddingTop: 15,
      paddingBottom: 20,
    },
    message: {
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: '0 20px',
    },
    box: {
      height: '100%',
      paddingLeft: 20,
    },
  }));

const FormInputButton = ({stateMessage}) => {

    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault()
      
      setMessage('');

      stateMessage(message);
    }
    
    const handleChange = (event) => {
      setMessage(event.target.value)
    }

    const classes = useStyles();

    return (
        <div>
        <Paper square className={classes.paper}>
       <form onSubmit={handleSubmit}>
        <Grid container spacing={0} direction="row" className={classes.message}>
         <Grid item xs={10}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Write a message"
            autoFocus
            name="text"
            value={message}
            onChange={handleChange}
          />
         </Grid>
         <Grid item xs={2}>
          <Box display="flex" alignItems="center" className={classes.box}>
           <Button
                type="submit"
                variant="contained" 
                color="primary"
                fullWidth
              >
                Send
            </Button>
          </Box>
         </Grid>
        </Grid>
       </form>
      </Paper>    
        </div>
    )
}

export default FormInputButton

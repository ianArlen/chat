import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles({
    sm: {
      width: 28,
      height: 28
    },
    md: {
      width: 42,
      height: 42,
      backgroundColor: '#ff5722',
      fontSize: 12
    },
    lg: {
      width: 64,
      height: 64
    },
    xl: {
      width: 84,
      height: 84,
    },
    bg: {
      backgroundColor: '#ff5722'
    }
  });


const CustomAvatar = ({ name, avatar, size }) => {
    const classes = useStyles();

    return (
      <Avatar
        alt={name}
        src={avatar}
        className={clsx(classes[size], !avatar ? classes.md : null)}
      >
          {name}
      </Avatar>
    )
}

export default CustomAvatar

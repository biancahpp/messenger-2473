import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(.5)
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: theme.spacing(1),
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  avatar: {
    height: 25,
    width: 25,
    margin: theme.spacing(1, 0, 0, 0),
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, otherUser, message, lastRead } = props;
  
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{message.text}</Typography>
      </Box>
      {lastRead && <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>}
    </Box>
  );
};

export default SenderBubble;

import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: convo => (!convo.latestMessageText.isRead && (convo.latestMessageText.senderId === convo.otherUser.id)) ? "black" : "#9CADC8",
    letterSpacing: -0.17,
    fontWeight: convo => (!convo.latestMessageText.isRead && (convo.latestMessageText.senderId === convo.otherUser.id)) && "bold"
  },
}));

const ChatContent = (props) => {
  const classes = useStyles(props.conversation);

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;

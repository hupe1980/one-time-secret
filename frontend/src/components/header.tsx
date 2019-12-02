import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingRight: 24
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  })
);

export interface HeaderProps {
  title?: string | React.ReactElement;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>{title}</div>
      </Toolbar>
    </AppBar>
  );
};

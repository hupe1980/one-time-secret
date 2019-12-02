import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1)
    }
  })
);

export const Section: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Paper className={classes.paper}>{children}</Paper>
    </Container>
  );
};

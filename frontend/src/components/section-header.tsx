import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: theme.spacing(0)
    }
  })
);

export const SectionHeader: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.header}
      component="h1"
      align="center"
      variant="h6"
    >
      {children}
    </Typography>
  );
};

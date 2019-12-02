import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { API } from 'aws-amplify';

import { Section, SectionHeader, SectionBody } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginBottom: theme.spacing(2)
    }
  })
);

export const History: React.FC = () => {
  const classes = useStyles();
  const [history, setHistory] = useState();

  useEffect(() => {
    const fetchHistory = async () => {
      const { items } = await API.get('ApiGatewayRestApi', `/history`, {});
      setHistory(items);
    };
    fetchHistory();
  }, []);

  if (!history) return <div>Loading</div>;

  return (
    <Section>
      <SectionHeader>Historie</SectionHeader>
      <SectionBody>
        <Table
          stickyHeader
          aria-label="history table"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Erstellt</TableCell>
              <TableCell align="right">Ablauf</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row: any) => (
              <TableRow hover key={row.secretId}>
                <TableCell component="th" scope="row">
                  {row.secretId}
                </TableCell>
                <TableCell align="right">{row.creationTime}</TableCell>
                <TableCell align="right">{row.expirationTime}</TableCell>
                <TableCell align="right">TODO</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to="/share"
        >
          Erstelle ein weiteres Geheimnis
        </Button>
      </SectionBody>
    </Section>
  );
};

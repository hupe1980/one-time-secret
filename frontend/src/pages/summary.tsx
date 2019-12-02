import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { API } from 'aws-amplify';

import { Section, SectionHeader, SectionBody, TimeToLive } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginBottom: theme.spacing(2)
    }
  })
);

export const Summary: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [summary, setSummary] = useState();

  useEffect(() => {
    const fetchSummary = async () => {
      const { items } = await API.get('ApiGatewayRestApi', `/history`, {});
      setSummary(items);
    };
    fetchSummary();
  }, []);

  const handleRowClick = (secretId: string) => {
    history.push(`/private/${secretId}`);
  };

  if (!summary) return <div>Loading</div>;

  return (
    <Section>
      <SectionHeader>Übersicht</SectionHeader>
      <SectionBody>
        <Table
          stickyHeader
          aria-label="summary table"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Lebenszeit</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map((row: any) => (
              <TableRow
                hover
                key={row.secretId}
                onClick={() => handleRowClick(row.secretId)}
              >
                <TableCell component="th" scope="row">
                  {row.secretId}
                </TableCell>
                <TableCell align="right">
                  <TimeToLive expirationTime={row.expirationTime} />
                </TableCell>
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

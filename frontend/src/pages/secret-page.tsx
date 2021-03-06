import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { API } from 'aws-amplify';

import { Section, SectionHeader, SectionBody } from '../components';

interface Secret {
  linkId: string;
  creationTime: number;
  expirationTime: number;
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2)
  },
  textfield: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const createSecretLink = (linkId?: string) =>
  linkId ? `${window.location.origin}/retrieve/${linkId}` : '';

const convertEpochToLocalString = (epoch: number) =>
  new Date(epoch * 1000).toLocaleString();

export const SecretPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { secretId } = useParams();
  const [secret, setSecret] = useState<Secret | null>(null);

  useEffect(() => {
    const fetchSecret = async () => {
      const { item } = await API.get(
        'ApiGatewayRestApi',
        `/secrets/${secretId}`,
        {}
      );
      setSecret(item);
    };
    fetchSecret();
  }, [secretId]);

  const handleButtonClick = async () => {
    await API.del('ApiGatewayRestApi', `/secrets/${secretId}`, {});
    history.push('/');
  };

  if (!secret) return <div>Loading!</div>;

  const { creationTime, expirationTime, linkId } = secret;

  return (
    <Section>
      <SectionHeader>Teile diesen Link</SectionHeader>
      <SectionBody>
        <TextField
          disabled
          fullWidth
          variant="filled"
          className={classes.textfield}
          defaultValue={createSecretLink(linkId)}
        />
        <TextField
          disabled
          fullWidth
          label="Erstellzeitpunkt"
          variant="outlined"
          className={classes.textfield}
          defaultValue={convertEpochToLocalString(creationTime)}
        />
        <TextField
          disabled
          fullWidth
          label="Ablaufzeitpunkt"
          variant="outlined"
          className={classes.textfield}
          defaultValue={convertEpochToLocalString(expirationTime)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleButtonClick}
        >
          Geheimnis zerstören
        </Button>
        <Grid container>
          <Grid item xs>
            <MUILink component={Link} to="/">
              Zurück zur Übersicht
            </MUILink>
          </Grid>
        </Grid>
      </SectionBody>
    </Section>
  );
};

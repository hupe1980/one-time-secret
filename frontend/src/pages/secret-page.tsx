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
  linkId?: string;
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const createSecretLink = (linkId?: string) =>
  linkId ? `${window.location.origin}/secrets/${linkId}/retrieve` : '';

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

  const { linkId } = secret;

  return (
    <Section>
      <SectionHeader>Teile diesen Link</SectionHeader>
      <SectionBody>
        <TextField
          disabled
          fullWidth
          variant="outlined"
          defaultValue={createSecretLink(linkId)}
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

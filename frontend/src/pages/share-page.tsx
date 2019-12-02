import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MUILink from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Formik, Field, Form } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { PasswordField } from 'amplify-material-ui';
import { API } from 'aws-amplify';

import { Section, SectionHeader, SectionBody } from '../components';
import { encrypt } from '../utils/crypto';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const SharePage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Section>
      <Formik
        initialValues={{
          secret: '',
          passphrase: '',
          ttl: 4320
        }}
        key="share-form"
        onSubmit={async ({ secret, passphrase, ttl }) => {
          const ciphertext = encrypt(secret, passphrase);

          const { newItem } = await API.post(
            'ApiGatewayRestApi',
            '/secrets/share',
            {
              body: {
                ttl,
                ciphertext
              }
            }
          );

          const { secretId } = newItem;

          history.push(`/secrets/${secretId}`);
        }}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <SectionHeader>
              Füge ein Passwort, eine geheime Nachricht oder einen privaten Link
              unten ein.
            </SectionHeader>
            <SectionBody>
              <Form
                className={classes.form}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <Field
                  id="secret"
                  name="secret"
                  autoFocus
                  placeholder="Der geheime Inhalt kommt hier rein"
                  required
                  multiline
                  fullWidth
                  rows="3"
                  rowsMax="3"
                  margin="normal"
                  helperText="Halte sensible Informationen aus deinen Chat-Logs und E-Mails heraus."
                  variant="outlined"
                  component={TextField}
                />
                <Divider variant="middle" />‚
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography align="center" variant="body1">
                      Passwort:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      id="passphrase"
                      name="passphrase"
                      required
                      fullWidth
                      margin="normal"
                      helperText="Ein Wort oder eine Phrase die schwierig zu erraten ist"
                      variant="outlined"
                      component={PasswordField}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center" variant="body1">
                      Lebenszeit:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl required fullWidth variant="outlined">
                      <Field
                        name="ttl"
                        component={Select}
                        inputProps={{
                          id: 'ttl'
                        }}
                      >
                        <MenuItem value={5}>5 Minuten</MenuItem>
                        <MenuItem value={20}>30 Minuten</MenuItem>
                        <MenuItem value={60}>1 Stunde</MenuItem>
                        <MenuItem value={240}>4 Stunden</MenuItem>
                        <MenuItem value={720}>12 Stunden</MenuItem>
                        <MenuItem value={1440}>1 Tag</MenuItem>
                        <MenuItem value={4320}>3 Tage</MenuItem>
                        <MenuItem value={10080}>7 Tage</MenuItem>
                      </Field>
                      <FormHelperText>
                        Gebe an wie lange der Link gültig sein soll
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  disabled={!isValid}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Erstelle einen geheimen Link
                </Button>
              </Form>
              <Grid container>
                <Grid item xs>
                  <MUILink component={Link} to="/">
                    Zurück zur Übersicht
                  </MUILink>
                </Grid>
              </Grid>
            </SectionBody>
          </>
        )}
      </Formik>
    </Section>
  );
};

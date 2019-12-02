import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import { PasswordField } from 'amplify-material-ui';
import { API } from 'aws-amplify';

import { Section, SectionHeader, SectionBody } from '../components';
import { decrypt } from '../utils/crypto';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Secret: React.FC = () => {
  const classes = useStyles();
  const { linkId } = useParams();
  const [secret, setSecret] = useState('');

  const renderPassphraseForm = () => (
    <Formik
      initialValues={{
        passphrase: ''
      }}
      onSubmit={async ({ passphrase }) => {
        const { item } = await API.post(
          'ApiGatewayRestApi',
          `/secret/${linkId}`,
          {}
        );
        setSecret(decrypt(item.ciphertext, passphrase));
      }}
    >
      {({ handleSubmit, isValid }) => (
        <>
          <SectionHeader>
            Diese Nachricht benötigt eine Passphrase:
          </SectionHeader>
          <SectionBody>
            <Form
              className={classes.form}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field
                id="passphrase"
                name="passphrase"
                autoFocus
                required
                fullWidth
                margin="normal"
                label="Passphrase"
                variant="outlined"
                component={PasswordField}
              />

              <Button
                type="submit"
                disabled={!isValid}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Geheimnis anzeigen
              </Button>
            </Form>
          </SectionBody>
        </>
      )}
    </Formik>
  );

  const renderSecretDisplay = () => (
    <>
      <SectionHeader>Diese Nachricht ist für dich:</SectionHeader>
      <SectionBody>
        <TextField
          defaultValue={secret}
          required
          multiline
          fullWidth
          rows="3"
          rowsMax="3"
          margin="normal"
          helperText="(Vorsicht: Wir werden es nur einmal zeigen.)"
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
        >
          Mit einem Geheimnis antworten
        </Button>
      </SectionBody>
    </>
  );

  return (
    <Section>{secret ? renderSecretDisplay() : renderPassphraseForm()}</Section>
  );
};

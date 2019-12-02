import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { API } from 'aws-amplify';

import { Section, SectionHeader, SectionBody } from '../components';

interface Secret {
  linkId?: string;
}

const createSecretLink = (linkId?: string) =>
  linkId ? `${window.location.origin}/secret/${linkId}` : '';

export const Private: React.FC = () => {
  const { secretId } = useParams();
  const [secret, setSecret] = useState<Secret | null>(null);

  useEffect(() => {
    const fetchSecret = async () => {
      const { item } = await API.get(
        'ApiGatewayRestApi',
        `/private/${secretId}`,
        {}
      );
      setSecret(item);
    };
    fetchSecret();
  }, [secretId]);

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
        <Button type="submit" fullWidth variant="contained" color="primary">
          Geheimnis zerstören
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
        >
          Erstelle ein weiteres Geheimnis
        </Button>
      </SectionBody>
    </Section>
  );
};

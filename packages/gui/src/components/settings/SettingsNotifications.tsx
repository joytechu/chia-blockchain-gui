import { Flex, SettingsHR, SettingsSection, SettingsTitle, SettingsText } from '@chia-network/core';
import { Trans } from '@lingui/macro';
import { FormControlLabel, FormHelperText, Grid, Switch } from '@mui/material';
import React from 'react';

import useNotifications from '../../hooks/useNotifications';

export default function SettingsNotifications() {
  const { enabled, setEnabled } = useNotifications();

  return (
    <Grid container style={{ maxWidth: '624px' }} gap={2}>
      <Grid item style={{ maxWidth: '400px' }}>
        <Flex flexDirection="column" gap={1}>
          <SettingsSection>
            <Trans>Notifications</Trans>
          </SettingsSection>
          <SettingsText>
            <Trans>Choose your notification settings.</Trans>
          </SettingsText>
        </Flex>
      </Grid>

      <Grid item xs={12} sm={12} lg={12}>
        <SettingsHR />
      </Grid>

      <Grid container>
        <Grid item style={{width: "400px"}}>
          <SettingsTitle>
            <Trans>Enable push notifications</Trans>
          </SettingsTitle>
        </Grid>
        <Grid item container xs justifyContent="flex-end" marginTop="-6px">
          <FormControlLabel
            control={<Switch checked={!enabled} onChange={() => setEnabled(!enabled)} inputProps={{ 'data-testid': 'Notifications-Pause-All' }}/>}
          />
        </Grid>
        <Grid item container style={{width: "400px"}} gap={2}>
          <SettingsText>
            <Trans>Turn on/off the ability to show you notifications.</Trans>
          </SettingsText>
        </Grid>
      </Grid>
  
      <Grid item xs={12} sm={12} lg={12}>
        <SettingsHR />
      </Grid>
            {/*
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={!enabled}
                    onChange={() => setEnabled(!enabled)}
                    inputProps={{ 'data-testid': 'Notifications-Offers' }}
                  />
                }
                label={<Trans>Offers</Trans>}
              />
            </FormGroup>
              */}
    </Grid>
  );
}

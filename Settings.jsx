import React, { memo, useState } from 'react';
import { Confirm, FormItem, Text } from '@vizality/components';
import { getModuleByDisplayName } from '@vizality/webpack';
import { open } from '@vizality/modal';

const RadioGroup = getModuleByDisplayName('RadioGroup');

export default memo(({ getSetting, updateSetting }) => {
  const [ platform, setPlatform ] = useState(getSetting('platform', 0));

  return (
    <>
      <FormItem title="Platform">
        <RadioGroup
          options={[
            { name: 'Windows', value: 0 },
            { name: 'OSX', value: 1 },
            { name: 'Linux', value: 2 },
            { name: 'Web', value: 3 }
          ]}
          value={platform}
          onChange={({ value }) => {
            updateSetting('platform', value);
            setPlatform(value);

            open(() => (
              <Confirm
                header="Restart Required"
                confirmText="Restart"
                cancelText="Not now"
                onConfirm={() => {
                  DiscordNative.app.relaunch();
                }}
              >
                <Text>
                  For some changes to take effect, a restart is required.{' '}
                  Would you like to do this now?
                </Text>
              </Confirm>
            ));
          }}
        />
      </FormItem>
    </>
  );
});

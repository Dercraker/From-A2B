'use client'
import {
  ActionIcon,
  Button,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export const SwitchThemeIcon = ({ asButton = false }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const handleChangeTheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  if (asButton) {
    return (
      <Button
        mt="xs"
        variant="subtle"
        onClick={handleChangeTheme}
        leftSection={
          computedColorScheme === 'light' ? (
            <IconSun stroke={1.5} fill="currentColor" />
          ) : (
            <IconMoon stroke={1.5} />
          )
        }>
        Switch theme
      </Button>
    );
  }

  return (
    <ActionIcon onClick={handleChangeTheme} variant="light" size="lg">
      {computedColorScheme === 'light' ? (
        <IconSun stroke={1.5} fill="currentColor" />
      ) : (
        <IconMoon stroke={1.5} />
      )}
    </ActionIcon>
  );
};

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { styled, Theme } from '@storybook/react-native-theming';
import { useLayout } from '@storybook/react-native-ui';
import { forwardRef } from 'react';
import { Platform, TextInput, TextInputProps, TextStyle } from 'react-native';

export function inputStyle({
  theme,
  isTextInput = true,
  focused = false,
  hasError = false,
}: {
  theme: Theme;
  isTextInput?: boolean;
  focused?: boolean;
  hasError?: boolean;
}): TextStyle {
  return {
    backgroundColor: theme.input.background,
    // TODO: border?
    borderWidth: 1,
    borderRadius: theme.input.borderRadius,
    borderColor: hasError
      ? theme.color.negative
      : focused
      ? theme.color.secondary
      : theme.input.border,
    fontSize: theme.typography.size.s2 - 1,
    color: theme.input.color,
    paddingHorizontal: theme.input.paddingHorizontal,

    ...Platform.select({
      android: {
        // Android seems to have builtin vertical padding to `TextInput`,
        // but not for multiline inputs.
        paddingVertical: isTextInput ? 0 : undefined,
      },
      web: {
        // The web (that isn't RNW) doesn't understand `paddingHorizontal` etc.
        paddingLeft: theme.input.paddingHorizontal,
        paddingRight: theme.input.paddingHorizontal,
        paddingTop: theme.input.paddingVertical,
        paddingBottom: theme.input.paddingVertical,
        borderStyle: 'solid',
      },
      default: {
        paddingVertical: theme.input.paddingVertical,
      },
    }),
    margin: 0,
  };
}

const TextInputWithSwitcher = forwardRef<TextInput, TextInputProps>((props, ref) => {
  const { isMobile } = useLayout();

  return isMobile ? (
    // @ts-ignore
    <BottomSheetTextInput ref={ref} {...props} />
  ) : (
    <TextInput ref={ref} {...props} />
  );
});

export const Input = styled(TextInputWithSwitcher)<{
  focused?: boolean;
  isTextInput?: boolean;
  hasError?: boolean;
}>(({ theme, focused, isTextInput, hasError }) => ({
  ...inputStyle({ theme, isTextInput, focused, hasError }),
}));

import React from 'react';
import { Text, type TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
}

/**
 * Wrapper delgado sobre <Text> para heredar className con NativeWind.
 * Usar las clases font-serif / font-sans / font-sans-medium / etc.
 */
export function Typography({ children, className, ...rest }: TypographyProps) {
  return (
    <Text className={`text-foreground ${className ?? ''}`} {...rest}>
      {children}
    </Text>
  );
}

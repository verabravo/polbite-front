import React from 'react';
import { View, type ViewProps } from 'react-native';
import { colors } from '../../theme/colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <View
      className={`bg-card rounded-2xl border border-card-border shadow-sm ${className ?? ''}`}
      style={{ shadowColor: colors.foreground, shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
      {...rest}
    >
      {children}
    </View>
  );
}

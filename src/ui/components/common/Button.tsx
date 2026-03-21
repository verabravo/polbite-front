import React, { useRef, useCallback } from 'react';
import {
  Pressable,
  Animated,
  View,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary active:opacity-90',
  secondary: 'bg-secondary active:opacity-90',
  outline: 'bg-transparent border border-primary',
  ghost: 'bg-transparent',
  destructive: 'bg-destructive active:opacity-90',
};

const variantTextClass: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary',
  ghost: 'text-primary',
  destructive: 'text-white',
};

const sizeStyles: Record<Size, string> = {
  sm: 'py-2 px-4 rounded-xl',
  md: 'py-4 px-6 rounded-pill',
  lg: 'py-5 px-8 rounded-pill',
};

const sizeTextClass: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  disabled,
  style,
  onPressIn,
  onPressOut,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || isLoading;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback((e: any) => {
    Animated.timing(scaleValue, { toValue: 0.98, duration: 100, useNativeDriver: true }).start();
    onPressIn?.(e);
  }, [onPressIn]);

  const handlePressOut = useCallback((e: any) => {
    Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }).start();
    onPressOut?.(e);
  }, [onPressOut]);

  return (
    <Pressable
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{ opacity: isDisabled ? 0.6 : 1 }, style as ViewStyle]}
      {...rest}
    >
      <Animated.View
        style={{ transform: [{ scale: scaleValue }] }}
      >
        <View
          className={`flex-row items-center justify-center gap-2 ${variantStyles[variant]} ${sizeStyles[size]}`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={variant === 'outline' || variant === 'ghost' ? colors.primary : 'white'} />
          ) : (
            <>
              {leftIcon}
              <Typography
                className={`font-sans-medium ${sizeTextClass[size]} ${variantTextClass[variant]}`}
              >
                {children as string}
              </Typography>
            </>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

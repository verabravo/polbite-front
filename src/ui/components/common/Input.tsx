import React, { useState } from 'react';
import { View, TextInput, Pressable, type TextInputProps } from 'react-native';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export function Input({ leftIcon, error, isPassword = false, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = Boolean(error);

  return (
    <View className="gap-1">
      <View className="relative">
        {/* Left icon */}
        {leftIcon && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            {leftIcon}
          </View>
        )}

        <TextInput
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={colors.mutedForeground}
          className={`w-full bg-input-bg rounded-2xl border text-foreground font-sans text-base ${
            leftIcon ? 'pl-12' : 'pl-4'
          } ${isPassword ? 'pr-14' : 'pr-4'} py-4 ${
            hasError ? 'border-destructive' : 'border-input-border'
          }`}
          {...rest}
        />

        {/* Password toggle */}
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff size={20} color={hasError ? colors.destructive : colors.mutedForeground} strokeWidth={1.5} />
            ) : (
              <Eye size={20} color={hasError ? colors.destructive : colors.mutedForeground} strokeWidth={1.5} />
            )}
          </Pressable>
        )}
      </View>

      {/* Error message */}
      {hasError && (
        <View className="flex-row items-center gap-1 px-4">
          <AlertCircle size={14} color={colors.destructive} strokeWidth={1.5} />
          <Typography className="text-destructive text-sm font-sans">{error!}</Typography>
        </View>
      )}
    </View>
  );
}

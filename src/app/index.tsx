import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { router } from 'expo-router';
import { Leaf } from 'lucide-react-native';
import { Typography } from '../ui/components/common/Typography';
import { colors } from '../ui/theme/colors';
import { useAuthStore } from '../application/stores/useAuthStore';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(async () => {
      const hasSession = await checkAuth();
      if (hasSession) {
        router.replace('/(main)/(tabs)/diet');
      } else {
        router.replace('/(auth)/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.primary }}
    >
      <View className="flex-1 items-center justify-center w-full">
        <Animated.View
          style={{ opacity, transform: [{ scale }] }}
          className="items-center gap-3"
        >
          <Leaf size={64} color="white" strokeWidth={1.5} />
          <Typography
            className="text-white text-6xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            polbite
          </Typography>
        </Animated.View>
      </View>
    </View>
  );
}

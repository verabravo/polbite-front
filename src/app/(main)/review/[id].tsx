import { View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Card } from '../../../ui/components/common/Card';
import { colors } from '../../../ui/theme/colors';

export default function ReviewDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
        </Pressable>
        <Typography
          className="flex-1 text-center text-foreground text-xl font-serif"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Revisión semanal
        </Typography>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-4 pb-8">
        <Card className="p-5">
          <Typography className="text-muted-foreground font-sans text-sm">ID</Typography>
          <Typography className="text-foreground font-sans-medium">{id}</Typography>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock } from 'lucide-react-native';
import { Typography } from '../../../ui/components/common/Typography';
import { colors } from '../../../ui/theme/colors';

export default function HistoryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="flex-grow px-6 py-8">
        <Typography
          className="text-foreground text-2xl font-serif mb-8"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Historial semanal
        </Typography>

        {/* Empty state */}
        <View className="flex-1 items-center justify-center py-20">
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-6"
            style={{ backgroundColor: `${colors.primary}1A` }}
          >
            <Clock size={40} color={`${colors.primary}66`} strokeWidth={1.5} />
          </View>
          <Typography
            className="text-foreground text-2xl font-serif mb-3 text-center"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Sin revisiones aún
          </Typography>
          <Typography className="text-muted-foreground font-sans text-center max-w-xs">
            Las revisiones semanales aparecerán aquí para que puedas ver tu evolución
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

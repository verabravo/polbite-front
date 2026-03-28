import { View, Pressable } from 'react-native';
import { ChevronRight, Calendar } from 'lucide-react-native';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { colors } from '../../theme/colors';

interface DietHistoryItemProps {
  name: string;
  dateRange: string;
  avgCalories: number;
  isActive?: boolean;
  onPress?: () => void;
}

export function DietHistoryItem({ name, dateRange, avgCalories, isActive, onPress }: DietHistoryItemProps) {
  return (
    <Pressable onPress={onPress}>
      <Card className="p-4 flex-row items-center gap-4">
        <View
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{ backgroundColor: isActive ? `${colors.primary}1A` : `${colors.muted}` }}
        >
          <Calendar size={20} color={isActive ? colors.primary : colors.mutedForeground} strokeWidth={1.5} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-0.5">
            <Typography className="text-foreground font-sans-medium">{name}</Typography>
            {isActive && (
              <View className="px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors.primary}1A` }}>
                <Typography className="text-xs font-sans-medium" style={{ color: colors.primary }}>Activa</Typography>
              </View>
            )}
          </View>
          <Typography className="text-muted-foreground font-sans text-sm">{dateRange}</Typography>
        </View>
        <Typography className="text-muted-foreground font-sans text-sm mr-1">
          ~{avgCalories} kcal
        </Typography>
        <ChevronRight size={16} color={colors.mutedForeground} strokeWidth={1.5} />
      </Card>
    </Pressable>
  );
}

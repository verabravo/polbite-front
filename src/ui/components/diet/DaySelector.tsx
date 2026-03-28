import { ScrollView, Pressable } from 'react-native';
import { Typography } from '../common/Typography';
import { colors } from '../../theme/colors';
import { DAY_SHORT_LABELS } from '../../../shared/constants';

interface DaySelectorProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function DaySelector({ selectedDay, onSelectDay }: DaySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 pb-2 mb-6"
    >
      {[1, 2, 3, 4, 5, 6, 7].map((day) => {
        const isActive = selectedDay === day;
        return (
          <Pressable
            key={day}
            onPress={() => onSelectDay(day)}
            className="w-12 h-12 rounded-full items-center justify-center border"
            style={isActive
              ? { backgroundColor: colors.primary, borderColor: colors.primary }
              : { backgroundColor: colors.card, borderColor: colors.muted }
            }
          >
            <Typography className={`font-sans-medium ${isActive ? 'text-white' : 'text-primary'}`}>
              {DAY_SHORT_LABELS[day]}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

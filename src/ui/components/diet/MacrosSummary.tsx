import { View } from 'react-native';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { colors } from '../../theme/colors';

interface MacrosSummaryProps {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export function MacrosSummary({ calories, proteinG, carbsG, fatG }: MacrosSummaryProps) {
  const bars = [
    { label: 'P', value: proteinG, max: 150, color: colors.protein },
    { label: 'C', value: carbsG, max: 200, color: colors.carbs },
    { label: 'G', value: fatG, max: 80, color: colors.fat },
  ];

  return (
    <Card className="p-4">
      <View className="flex-row items-center justify-between mb-3">
        <Typography className="text-muted-foreground font-sans text-sm">Hoy</Typography>
        <Typography
          className="text-foreground text-2xl font-serif"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          ~{Math.round(calories)} kcal
        </Typography>
      </View>

      <View className="gap-2">
        {bars.map(({ label, value, max, color }) => (
          <View key={label} className="flex-row items-center gap-2">
            <Typography className="text-muted-foreground text-xs font-sans w-4">{label}</Typography>
            <View className="flex-1 h-2 bg-background rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }}
              />
            </View>
            <Typography className="text-muted-foreground text-xs font-sans w-10 text-right">
              {Math.round(value)}g
            </Typography>
          </View>
        ))}
      </View>
    </Card>
  );
}

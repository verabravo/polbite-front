import { View } from 'react-native';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { type Meal } from '../../../domain/models/MealPlan';
import { colors } from '../../theme/colors';

const ORDER_LABELS: Record<number, string> = {
  1: 'Desayuno',
  2: 'Media mañana',
  3: 'Comida',
  4: 'Merienda',
  5: 'Cena',
};

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const label = ORDER_LABELS[meal.order] ?? `Comida ${meal.order}`;

  return (
    <Card className="p-5">
      <View className="flex-row items-start justify-between mb-2">
        <Typography className="text-xs uppercase tracking-wider text-secondary font-sans-medium">
          {label}
        </Typography>
        <Typography className="text-foreground font-sans-medium">
          {Math.round(meal.total_calories)} kcal
        </Typography>
      </View>

      {meal.items.map((item) => (
        <View key={item.food_id} className="mb-1.5">
          <Typography
            className="text-foreground text-base font-serif leading-snug"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            {item.food_name}
          </Typography>
          <Typography className="text-muted-foreground font-sans text-sm">
            {Math.round(item.quantity_grams)}g — {Math.round(item.calories)} kcal
          </Typography>
        </View>
      ))}

      <View className="flex-row gap-2 mt-3">
        {[
          { label: `P: ${Math.round(meal.total_protein_g)}g`, bg: `${colors.protein}1A`, text: colors.protein },
          { label: `C: ${Math.round(meal.total_carbs_g)}g`, bg: `${colors.carbs}1A`, text: colors.mutedForeground },
          { label: `G: ${Math.round(meal.total_fat_g)}g`, bg: `${colors.fat}1A`, text: colors.fat },
        ].map(({ label: l, bg, text }) => (
          <View key={l} className="px-2 py-1 rounded-full" style={{ backgroundColor: bg }}>
            <Typography className="text-xs font-sans-medium" style={{ color: text }}>{l}</Typography>
          </View>
        ))}
      </View>
    </Card>
  );
}

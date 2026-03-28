import { View } from 'react-native';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react-native';
import { Card } from '../common/Card';
import { Typography } from '../common/Typography';
import { type BiometricEntry, type BiometricMetric, getMetricValue } from '../../../domain/models/BiometricRecord';
import { formatShortDate } from '../../../shared/formatters';
import { METRIC_UNITS } from '../../../shared/constants';
import { colors } from '../../theme/colors';

interface BiometricCardProps {
  entries: BiometricEntry[];
  metric: BiometricMetric;
}

export function BiometricCard({ entries, metric }: BiometricCardProps) {
  const latest = entries[0];
  const oldest = entries[entries.length - 1];

  if (!latest) return null;

  const latestVal = getMetricValue(latest, metric);
  const oldestVal = oldest ? getMetricValue(oldest, metric) : null;

  if (latestVal === null) return null;

  const delta = oldestVal !== null ? latestVal - oldestVal : 0;
  const unit = METRIC_UNITS[metric] ?? '';
  const isWeight = metric === 'weight_kg';

  const DeltaIcon = delta < 0 ? TrendingDown : delta > 0 ? TrendingUp : Minus;
  const deltaColor = delta < 0 ? colors.darkOlive : delta > 0 ? colors.secondary : colors.mutedForeground;

  const formatVal = (v: number) =>
    isWeight ? `${v.toFixed(1).replace('.', ',')} ${unit}` : `${v.toFixed(1).replace('.', ',')} ${unit}`;

  return (
    <Card className="p-6 mb-4">
      <View className="flex-row items-end justify-between">
        <View>
          <Typography
            className="text-foreground font-serif mb-1"
            style={{ fontFamily: 'DMSerifDisplay-Regular', fontSize: 40 }}
          >
            {formatVal(latestVal)}
          </Typography>
          <Typography className="text-muted-foreground font-sans text-sm">
            {formatShortDate(latest.created_at)}
          </Typography>
        </View>

        {delta !== 0 && (
          <View
            className="flex-row items-center gap-1 px-3 py-2 rounded-full"
            style={{ backgroundColor: `${deltaColor}1A` }}
          >
            <DeltaIcon size={16} color={deltaColor} strokeWidth={2} />
            <Typography className="font-sans-medium" style={{ color: deltaColor }}>
              {delta > 0 ? '+' : ''}{delta.toFixed(1)} {unit}
            </Typography>
          </View>
        )}
      </View>
    </Card>
  );
}

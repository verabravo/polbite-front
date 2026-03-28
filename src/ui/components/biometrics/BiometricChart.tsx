import { View } from 'react-native';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryTheme } from 'victory-native';
import { Card } from '../common/Card';
import { type BiometricEntry, type BiometricMetric, getMetricValue } from '../../../domain/models/BiometricRecord';
import { formatShortDate } from '../../../shared/formatters';
import { colors } from '../../theme/colors';

interface BiometricChartProps {
  entries: BiometricEntry[];
  metric: BiometricMetric;
}

export function BiometricChart({ entries, metric }: BiometricChartProps) {
  const chartData = [...entries]
    .reverse()
    .map((e) => {
      const y = getMetricValue(e, metric);
      return y !== null ? { x: formatShortDate(e.created_at), y } : null;
    })
    .filter((d): d is { x: string; y: number } => d !== null);

  if (chartData.length < 2) return null;

  return (
    <Card className="p-4 mb-4">
      <VictoryChart
        theme={VictoryTheme.material}
        height={220}
        padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
      >
        <VictoryAxis
          tickFormat={(t: string) => t}
          style={{
            axis: { stroke: colors.muted },
            tickLabels: { fill: colors.mutedForeground, fontSize: 10, fontFamily: 'Outfit-Regular' },
            grid: { stroke: 'transparent' },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: colors.muted },
            tickLabels: { fill: colors.mutedForeground, fontSize: 10, fontFamily: 'Outfit-Regular' },
            grid: { stroke: colors.muted, strokeDasharray: '3 3' },
          }}
        />
        <VictoryArea
          data={chartData}
          style={{
            data: { fill: `${colors.primary}33`, stroke: colors.primary, strokeWidth: 2 },
          }}
          interpolation="monotoneX"
        />
      </VictoryChart>
    </Card>
  );
}

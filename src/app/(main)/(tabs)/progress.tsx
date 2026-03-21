import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus, TrendingDown } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryTheme } from 'victory-native';
import { Typography } from '../../../ui/components/common/Typography';
import { Card } from '../../../ui/components/common/Card';
import { useBiometricStore } from '../../../application/stores/useBiometricStore';
import { mockWeightRecords } from '../../../shared/mockData';
import { METRIC_LABELS } from '../../../shared/constants';
import { type BiometricMetric } from '../../../domain/models/BiometricRecord';
import { colors } from '../../../ui/theme/colors';
import { formatShortDate, formatWeight } from '../../../shared/formatters';

const METRICS: BiometricMetric[] = ['peso', 'ombligo', 'pecho', 'cintura', 'caderas', 'piernas'];

export default function ProgressScreen() {
  const { selectedMetric, setSelectedMetric } = useBiometricStore();
  const records = mockWeightRecords; // swap for store.records when API is ready

  const currentValue = records[0]?.value ?? 0;
  const firstValue = records[records.length - 1]?.value ?? 0;
  const delta = currentValue - firstValue;

  const chartData = [...records]
    .reverse()
    .map((r) => ({ x: formatShortDate(r.recordedAt), y: r.value }));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="p-4 pb-8">
        <Typography
          className="text-foreground text-2xl font-serif mb-4"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Tu progreso
        </Typography>

        {/* Tarjeta resumen */}
        <Card className="p-6 mb-4">
          <View className="flex-row items-end justify-between mb-4">
            <View>
              <Typography
                className="text-foreground font-serif mb-1"
                style={{ fontFamily: 'DMSerifDisplay-Regular', fontSize: 40 }}
              >
                {formatWeight(currentValue)}
              </Typography>
              <Typography className="text-muted-foreground font-sans text-sm">Hace 3 días</Typography>
            </View>

            <View
              className="flex-row items-center gap-1 px-3 py-2 rounded-full"
              style={{ backgroundColor: `${colors.darkOlive}1A` }}
            >
              <TrendingDown size={16} color={colors.darkOlive} strokeWidth={2} />
              <Typography className="font-sans-medium" style={{ color: colors.darkOlive }}>
                {delta.toFixed(1)} kg
              </Typography>
            </View>
          </View>
        </Card>

        {/* Gráfica Victory Native */}
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

        {/* Selector de métricas */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 pb-2 mb-6"
        >
          {METRICS.map((m) => (
            <Pressable
              key={m}
              onPress={() => setSelectedMetric(m)}
              className="px-4 py-2 rounded-full border"
              style={selectedMetric === m
                ? { backgroundColor: colors.primary, borderColor: colors.primary }
                : { backgroundColor: colors.card, borderColor: colors.muted }
              }
            >
              <Typography className={`font-sans-medium ${selectedMetric === m ? 'text-white' : 'text-primary'}`}>
                {METRIC_LABELS[m]}
              </Typography>
            </Pressable>
          ))}
        </ScrollView>

        {/* Historial de registros */}
        <View>
          <Typography
            className="text-foreground text-lg font-serif mb-3"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Historial
          </Typography>

          <View className="gap-3">
            {records.map((record, i) => {
              const prev = records[i + 1];
              const change = prev ? record.value - prev.value : 0;

              return (
                <Card key={record.id} className="p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}1A` }}
                    >
                      <TrendingDown size={24} color={colors.primary} strokeWidth={1.5} />
                    </View>
                    <View>
                      <Typography className="text-foreground font-sans-medium">
                        {formatWeight(record.value)}
                      </Typography>
                      <Typography className="text-muted-foreground font-sans text-sm">
                        {formatShortDate(record.recordedAt)}
                      </Typography>
                    </View>
                  </View>

                  {change !== 0 && (
                    <Typography
                      className="font-sans-medium text-sm"
                      style={{ color: change < 0 ? colors.darkOlive : colors.secondary }}
                    >
                      {change > 0 ? '+' : ''}{change.toFixed(1)} kg
                    </Typography>
                  )}
                </Card>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => router.push('/(main)/biometrics/new')}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}
      >
        <Plus size={24} color="white" strokeWidth={2} />
      </Pressable>
    </SafeAreaView>
  );
}

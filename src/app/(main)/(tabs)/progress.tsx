import { useEffect, useCallback } from 'react';
import { View, ScrollView, Pressable, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Plus, TrendingUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { EmptyState } from '../../../ui/components/common/EmptyState';
import { ErrorState } from '../../../ui/components/common/ErrorState';
import { Skeleton } from '../../../ui/components/common/Skeleton';
import { Card } from '../../../ui/components/common/Card';
import { BiometricCard } from '../../../ui/components/biometrics/BiometricCard';
import { BiometricChart } from '../../../ui/components/biometrics/BiometricChart';
import { useBiometricStore } from '../../../application/stores/useBiometricStore';
import { METRIC_LABELS, METRIC_UNITS } from '../../../shared/constants';
import { type BiometricMetric, getMetricValue } from '../../../domain/models/BiometricRecord';
import { formatShortDate } from '../../../shared/formatters';
import { colors } from '../../../ui/theme/colors';

const ALL_METRICS: BiometricMetric[] = [
  'weight_kg',
  'body_fat_percentage',
  'waist_cm',
  'chest_cm',
  'hip_cm',
  'navel_cm',
  'left_thigh_cm',
  'right_thigh_cm',
  'left_bicep_cm',
  'right_bicep_cm',
];

export default function ProgressScreen() {
  const { entries, selectedMetric, isLoading, error, fetchEntries, setSelectedMetric, clearError } = useBiometricStore();

  const loadData = useCallback(() => { fetchEntries(50); }, []);
  useEffect(() => { loadData(); }, []);

  // Only show metric pills for metrics that have at least one non-null value
  const availableMetrics = ALL_METRICS.filter((m) =>
    entries.some((e) => getMetricValue(e, m) !== null),
  );

  const unit = METRIC_UNITS[selectedMetric] ?? '';

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 pb-24"
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.primary} />}
      >
        <Typography
          className="text-foreground text-2xl font-serif mb-4"
          style={{ fontFamily: 'DMSerifDisplay-Regular' }}
        >
          Tu progreso
        </Typography>

        {isLoading && entries.length === 0 ? (
          <>
            <View className="flex-row gap-2 mb-6">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </View>
            <Skeleton className="h-28 mb-4" />
            <Skeleton className="h-52 mb-6" />
            <Skeleton className="h-16 mb-3" />
            <Skeleton className="h-16 mb-3" />
          </>
        ) : error ? (
          <ErrorState message={error} onRetry={() => { clearError(); loadData(); }} />
        ) : entries.length === 0 ? (
          <EmptyState
            icon={<TrendingUp size={40} color={`${colors.primary}66`} strokeWidth={1.5} />}
            title="Sin registros aún"
            message="Registra tu primer peso para comenzar a ver tu progreso aquí."
          />
        ) : (
          <>
            {/* Selector de métricas */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2 pb-2 mb-6"
            >
              {availableMetrics.map((m) => (
                <Pressable
                  key={m}
                  onPress={() => setSelectedMetric(m)}
                  className="px-4 py-2 rounded-full border"
                  style={
                    selectedMetric === m
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: colors.card, borderColor: colors.muted }
                  }
                >
                  <Typography
                    className={`font-sans-medium ${selectedMetric === m ? 'text-white' : 'text-primary'}`}
                  >
                    {METRIC_LABELS[m]}
                  </Typography>
                </Pressable>
              ))}
            </ScrollView>

            <BiometricCard entries={entries} metric={selectedMetric} />
            <BiometricChart entries={entries} metric={selectedMetric} />

            <Typography
              className="text-foreground text-lg font-serif mb-3"
              style={{ fontFamily: 'DMSerifDisplay-Regular' }}
            >
              Historial
            </Typography>

            <View className="gap-3">
              {entries.map((entry, i) => {
                const val = getMetricValue(entry, selectedMetric);
                if (val === null) return null;
                const prevEntry = entries[i + 1];
                const prevVal = prevEntry ? getMetricValue(prevEntry, selectedMetric) : null;
                const change = prevVal !== null ? val - prevVal : 0;

                return (
                  <Card key={entry.id} className="p-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${colors.primary}1A` }}
                      >
                        <TrendingUp size={24} color={colors.primary} strokeWidth={1.5} />
                      </View>
                      <View>
                        <Typography className="text-foreground font-sans-medium">
                          {val.toFixed(1).replace('.', ',')} {unit}
                        </Typography>
                        <Typography className="text-muted-foreground font-sans text-sm">
                          {formatShortDate(entry.created_at)}
                        </Typography>
                      </View>
                    </View>

                    {change !== 0 && (
                      <Typography
                        className="font-sans-medium text-sm"
                        style={{ color: change < 0 ? colors.darkOlive : colors.secondary }}
                      >
                        {change > 0 ? '+' : ''}{change.toFixed(1)} {unit}
                      </Typography>
                    )}
                  </Card>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      <Pressable
        onPress={() => router.push('/(main)/biometrics/new')}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center"
        style={{
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
          shadowOpacity: 0.35,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <Plus size={24} color="white" strokeWidth={2} />
      </Pressable>
    </SafeAreaView>
  );
}

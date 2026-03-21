import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../ui/components/common/Typography';
import { Input } from '../../../ui/components/common/Input';
import { Button } from '../../../ui/components/common/Button';
import { useBiometricStore } from '../../../application/stores/useBiometricStore';
import { useAuthStore } from '../../../application/stores/useAuthStore';
import { METRIC_LABELS, METRIC_UNITS } from '../../../shared/constants';
import { type BiometricMetric } from '../../../domain/models/BiometricRecord';
import { colors } from '../../../ui/theme/colors';

const METRICS: BiometricMetric[] = ['peso', 'ombligo', 'pecho', 'cintura', 'caderas', 'piernas'];

export default function NewBiometricScreen() {
  const { saveRecord, isLoading } = useBiometricStore();
  const { user } = useAuthStore();
  const [metric, setMetric] = useState<BiometricMetric>('peso');
  const [value, setValue] = useState('');

  const handleSave = async () => {
    if (!value || !user) return;
    await saveRecord(user.id, metric, Number(value));
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2">
            <ChevronLeft size={24} color={colors.foreground} strokeWidth={1.5} />
          </Pressable>
          <Typography
            className="flex-1 text-center text-foreground text-xl font-serif"
            style={{ fontFamily: 'DMSerifDisplay-Regular' }}
          >
            Nuevo registro
          </Typography>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pb-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Selector de métrica */}
          <Typography className="text-foreground font-sans-medium mb-3 mt-4">
            ¿Qué quieres registrar?
          </Typography>
          <View className="flex-row flex-wrap gap-2 mb-6">
            {METRICS.map((m) => (
              <Pressable
                key={m}
                onPress={() => setMetric(m)}
                className="px-4 py-2.5 rounded-pill border"
                style={metric === m
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : { backgroundColor: colors.card, borderColor: colors.muted }
                }
              >
                <Typography className={`font-sans-medium text-sm ${metric === m ? 'text-white' : 'text-foreground'}`}>
                  {METRIC_LABELS[m]}
                </Typography>
              </Pressable>
            ))}
          </View>

          {/* Valor */}
          <Typography className="text-foreground font-sans-medium mb-2">
            Valor ({METRIC_UNITS[metric]})
          </Typography>
          <Input
            placeholder={metric === 'peso' ? '73.2' : '85'}
            keyboardType="decimal-pad"
            value={value}
            onChangeText={setValue}
          />

          <Button
            onPress={handleSave}
            isLoading={isLoading}
            disabled={!value}
            className="mt-8"
          >
            Guardar registro
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

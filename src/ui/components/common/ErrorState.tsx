import { View } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { Typography } from './Typography';
import { Button } from './Button';
import { colors } from '../../theme/colors';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-20 px-6">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: `${colors.destructive}1A` }}
      >
        <AlertTriangle size={36} color={colors.destructive} strokeWidth={1.5} />
      </View>
      <Typography
        className="text-foreground text-xl font-serif mb-2 text-center"
        style={{ fontFamily: 'DMSerifDisplay-Regular' }}
      >
        Algo salió mal
      </Typography>
      <Typography className="text-muted-foreground font-sans text-center mb-6 max-w-xs">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outline" size="sm" onPress={onRetry}>
          Reintentar
        </Button>
      )}
    </View>
  );
}

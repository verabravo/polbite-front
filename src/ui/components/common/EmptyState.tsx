import { View } from 'react-native';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <View
        className="w-24 h-24 rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: `${colors.primary}1A` }}
      >
        {icon}
      </View>
      <Typography
        className="text-foreground text-2xl font-serif mb-3 text-center"
        style={{ fontFamily: 'DMSerifDisplay-Regular' }}
      >
        {title}
      </Typography>
      <Typography className="text-muted-foreground font-sans text-center max-w-xs">
        {message}
      </Typography>
    </View>
  );
}

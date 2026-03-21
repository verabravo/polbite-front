// Expo exposes EXPO_PUBLIC_* vars via process.env at build time.
// This declaration makes TypeScript aware of the global without pulling in all @types/node.
declare const process: {
  env: Record<string, string | undefined>;
};

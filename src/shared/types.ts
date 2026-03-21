/** Estado de una petición asíncrona */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

/** Envuelve datos con estado de carga */
export interface AsyncState<T> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
}

/** Props comunes de navegación */
export interface NavigationProp {
  onBack?: () => void;
}

/** Respuesta de error de la API */
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

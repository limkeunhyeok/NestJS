export interface Producer {
  emit: (pattern: string, data: unknown) => void;
  send: (pattern: string, data: unknown) => void;
}

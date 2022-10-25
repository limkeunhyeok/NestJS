export interface IProducer {
  emit: (pattern: string, data: unknown) => void;
  send: (pattern: string, data: unknown) => void;
}

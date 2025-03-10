import mitt, { Emitter, Handler } from "mitt";

export class EventEmitter<Events extends Record<string, unknown>> {
  private emitter: Emitter<Events>;

  constructor() {
    this.emitter = mitt<Events>();
  }

  on<K extends keyof Events>(event: K, handler: Handler<Events[K]>) {
    this.emitter.on(event, handler);
  }

  off<K extends keyof Events>(event: K, handler: Handler<Events[K]>) {
    this.emitter.off(event, handler);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.emitter.emit(event, payload);
  }
}

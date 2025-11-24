import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Export worker para inicializar en el cliente
export const worker = setupWorker(...handlers);

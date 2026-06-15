type AuthSessionHandlers = {
  onSessionExpired?: () => void;
};

let handlers: AuthSessionHandlers = {};

export const setAuthSessionHandlers = (next: AuthSessionHandlers) => {
  handlers = next;
};

export const notifySessionExpired = () => {
  handlers.onSessionExpired?.();
};

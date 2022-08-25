let instance: Api;

class Api {
}

export function getInstance(): Api {
  if (!instance) {
    instance = new Api();
  }
  return instance;
}
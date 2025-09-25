export function isLocalhost(ip: string) {
  return ['::1', '127.0.0.1', 'localhost'].includes(ip);
}

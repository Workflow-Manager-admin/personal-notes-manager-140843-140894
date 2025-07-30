export function uuidv4(): string {
  // Simple RFC4122 v4-compliant UUID (without relying on external 'uuid' package for Angular demo)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0, v = c==='x'?r:(r&0x3|0x8);
    return v.toString(16);
  });
}

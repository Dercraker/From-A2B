/**
 * Formate une taille en bytes en une chaîne lisible (KB, MB, GB)
 * @param bytes Taille en bytes
 * @param decimals Nombre de décimales à afficher
 * @returns Chaîne formatée
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Forme de comparaison d'un texte de recherche : sans accents, sans casse,
 * espaces réduits. « Interfaçages » et « interfacages » donnent la même clé.
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Renders a name in uppercase. If the name has 2 or more words,
 * each word will be capitalized (first letter uppercase).
 *
 * @param {string} name - The name to format
 * @returns {string} - The formatted name
 */
export function formatName(name) {
  if (!name) return "";

  // Split the name into words
  const words = name.trim().split(/\s+/);

  // If only one word, return it in all uppercase
  if (words.length === 1) {
    return name.toUpperCase();
  }

  // If 2+ words, capitalize each word (first letter uppercase, rest lowercase)
  return words
    .map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function getMonthNumber(monthName: string): number {
  const months: Record<string, number> = {
    Janvier: 1,
    Février: 2,
    Mars: 3,
    Avril: 4,
    Mai: 5,
    Juin: 6,
    Juillet: 7,
    Août: 8,
    Septembre: 9,
    Octobre: 10,
    Novembre: 11,
    Décembre: 12,
  };

  return months[monthName] ?? 0; // returns 0 if not found
}


class BingoController {
  calledNumbers: Set<number>;

  constructor() {
    this.calledNumbers = new Set<number>();
  }

  // Générateur de nombre aléatoire entre min et max (inclus)
  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Générateur de nombre unique
  public generateUniqueNumber(min: number, max: number): number {
    let num: number;
    do {
      num = this.generateRandomNumber(min, max);
    } while (this.calledNumbers.has(num));
    this.calledNumbers.add(num);
    return num;
  }

  // Générateur de carte de bingo
  public generateBingoCard(): Record<string, (number | string)[]> {
    const card: Record<string, (number | string)[]> = {
      B: [],
      I: [],
      N: [],
      G: [],
      O: [],
    };

    const ranges: Record<string, [number, number]> = {
      B: [1, 15],
      I: [16, 30],
      N: [31, 45],
      G: [46, 60],
      O: [61, 75],
    };

    for (const [letter, [min, max]] of Object.entries(ranges)) {
      let columnNumbers: Set<number> = new Set<number>();
      while (columnNumbers.size < 5) {
        columnNumbers.add(this.generateRandomNumber(min, max));
      }
      card[letter] = Array.from(columnNumbers);
    }

    // Ajouter un espace libre au centre
    card.N[2] = "FREE";

    return card;
  }
}

// Exemple d'utilisation
export default new BingoController();

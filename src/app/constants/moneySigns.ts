interface KnownMoneySigns {
  AUD: string;
  CAD: string;
  CHF: string;
  CNY: string;
  EUR: string;
  GBP: string;
  HKD: string;
  JPY: string;
  KRW: string;
  NZD: string;
  SEK: string;
  SGD: string;
  USD: string;
}

export const moneySigns: KnownMoneySigns & { [key: string]: any } = {
  AUD: "A$",
  CAD: "C$",
  CHF: "Fr",
  CNY: "¥",
  EUR: "€",
  GBP: "£",
  HKD: "HK$",
  JPY: "¥",
  KRW: "₩",
  NZD: "NZ$",
  SEK: "kr",
  SGD: "S$",
  USD: "$",
};

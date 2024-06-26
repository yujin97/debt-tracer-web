export interface Props {
  type: "borrowed" | "lent";
  date: string;
  amount: number;
  currency: string;
  subject: string;
  status: "paid" | "unpaid" | "pending";
}

export function Debt({ type, date, amount, currency, subject, status }: Props) {
  const typeLabel = type === "borrowed" ? "Borrowed" : "Lent";
  const statusLabel = status.toUpperCase();
  const subjectLabel = type === "borrowed" ? "Creditor" : "Debtor";

  return (
    <div className="flex flex-col rounded-md border-zinc-300 bg-gray-950 p-2 shadow-inner shadow-white">
      <div className="flex justify-between">
        <div className="rounded-md border border-sky-50 p-1">{typeLabel}</div>
        <div>{date}</div>
      </div>
      <div className="p-2">{`${amount} ${currency}`}</div>
      <div className="flex justify-between">
        <div>
          {subjectLabel}: {subject}
        </div>
        <div className="rounded-md border p-1">{statusLabel}</div>
      </div>
    </div>
  );
}

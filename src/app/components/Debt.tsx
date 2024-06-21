interface Props {
  type: "borrowed" | "lent";
  date: string;
  amount: number;
  currency: string;
  subject: string;
  status: "PAID" | "UNPAID";
}

export function Debt({ type, date, amount, currency, subject, status }: Props) {
  const typeLabel = type === "borrowed" ? "Borrowed" : "Lent";
  const statusLabel = status === "PAID" ? "PAID" : "UNPAID";
  const subjectLabel = type === "borrowed" ? "Creditor" : "Debtor";

  return (
    <div className="flex flex-col rounded-md border p-2">
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

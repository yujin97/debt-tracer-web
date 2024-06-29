import { LentIcon } from "@/app/components/LentIcon";
import { BorrowIcon } from "@/app/components/BorrowIcon";
import { moneySigns } from "@/app/constants/moneySigns";

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

  return (
    <div className="flex flex-col rounded-md border-zinc-300 bg-gray-950 p-2 shadow-inner shadow-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 p-1 pb-2">
          {type === "borrowed" ? (
            <BorrowIcon className="inline-block align-middle" />
          ) : (
            <LentIcon className="inline-block align-middle" />
          )}
          <span className="font-medium">{typeLabel}</span>
        </div>
        <div className="focus:ring-ring inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
          {statusLabel}
        </div>
      </div>
      <div className="flex items-center gap-2 pb-2">
        <span className="text-2xl font-semibold">
          {moneySigns[currency] ?? moneySigns["USD"]}
          {amount}
        </span>
        <span className="text-slate-400">{currency}</span>
      </div>
      <div className="flex justify-between pb-2">
        <span className="font-medium text-red-400">{subject}</span>
        <span className="text-slate-400">{date}</span>
      </div>
    </div>
  );
}

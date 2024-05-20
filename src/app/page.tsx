import { Debt } from "./components/Debt";

interface DebtProps {
  id: string;
  type: "borrowed" | "lent";
  date: string;
  amount: number;
  currency: string;
  subject: string;
  status: "PAID" | "UNPAID";
}

async function fetchDebts(): Promise<DebtProps[]> {
  const TEMP_USER_ID = "35652167-1d42-440c-ac77-441282535f82";

  const response = await fetch(
    `http://127.0.0.1:8000/debts?user_id=${TEMP_USER_ID}`,
    {
      cache: "no-store",
    },
  );

  const debts = await response.json();

  return debts.map((debt: any) => ({
    id: debt.debt_id,
    type: "borrowed",
    date: debt.created_at,
    amount: debt.amount,
    currency: debt.currency,
    subject: debt.creditor_name,
    status: "PAID",
  }));
}

export default async function Home() {
  const debts = await fetchDebts();

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div>
        <h1>Debt Tracer</h1>
      </div>
      <div className="flex flex-col p-4">
        {debts.map((debt) => (
          <Debt
            key={debt.id}
            type={debt.type}
            date={debt.date}
            amount={debt.amount}
            currency={debt.currency}
            subject={debt.subject}
            status={debt.status}
          />
        ))}
      </div>
    </main>
  );
}

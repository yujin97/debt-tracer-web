import { cookies } from "next/headers";
import { Debt } from "./components/Debt";
import { parseRequestCookie } from "@/app/utils/parseRequestCookie";
import { redirect } from "next/navigation";

interface DebtResponse {
  id: string;
  type: "borrowed" | "lent";
  date: string;
  amount: number;
  currency: string;
  subject: string;
  status: "PAID" | "UNPAID";
}

async function fetchDebts(): Promise<DebtResponse[] | null> {
  let response = null;
  let debts = [];

  const cookieStore = cookies();
  const requestCookieHeader = cookieStore
    .getAll()
    .map(parseRequestCookie)
    .join("; ");

  try {
    response = await fetch(`http://127.0.0.1:8000/debts`, {
      cache: "no-store",
      headers: {
        Cookie: requestCookieHeader,
      },
    });

    if (!response.ok && response.status === 401) {
      return null;
    }
  } catch (e) {
    // TODO: log the error

    throw new Error("Failed to fetch debts", { cause: e });
  }

  try {
    debts = await response.json();
  } catch (e) {
    // TODO: log the error

    throw new Error("Failed to deserialise debts", { cause: e });
  }

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

  if (debts === null) {
    redirect("/login");
  }

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

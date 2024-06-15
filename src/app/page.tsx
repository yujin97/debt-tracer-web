import { redirect } from "next/navigation";
import { Debt } from "./components/Debt";
import { getRequestCookieHeader } from "@/app/utils/getRequestCookieHeader";
import { fetchUserInfo } from "@/app/utils/fetchUserInfo";

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
  let userInfo = null;

  const requestCookieHeader = getRequestCookieHeader();

  try {
    userInfo = await fetchUserInfo();
  } catch (e) {
    // temporarily re-throw
    throw e;
  }

  if (userInfo === null) {
    redirect("/login");
  }

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

  return debts.map((debt: any) => {
    const type = debt.creditor_id === userInfo.userId ? "lent" : "borrowed";
    const subject = type === "borrowed" ? debt.creditor_name : debt.debtor_name;

    return {
      id: debt.debt_id,
      type,
      date: debt.created_at,
      amount: debt.amount,
      currency: debt.currency,
      subject,
      status: "PAID",
    };
  });
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

import { redirect } from "next/navigation";
import { NavigationLayout } from "@/app/layouts/NavigationLayout";
import { Debt, Props as DebtProps } from "./components/Debt";
import { getRequestCookieHeader } from "@/app/utils/getRequestCookieHeader";
import { fetchUserInfo } from "@/app/utils/fetchUserInfo";

interface DebtResponse {
  id: string;
  amount: number;
  currency: string;
  creditorName: string;
  debtorName: string;
  creditorId: string;
  debtorId: string;
  status: "PAID" | "UNPAID";
  date: string;
}

async function fetchDebts(): Promise<DebtResponse[] | null> {
  let response = null;
  let debts = [];

  const requestCookieHeader = getRequestCookieHeader();

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
    return {
      id: debt.debt_id,
      date: debt.created_at,
      amount: debt.amount,
      currency: debt.currency,
      creditorName: debt.creditor_name,
      debtorName: debt.debtor_name,
      creditorId: debt.creditor_id,
      debtorId: debt.debtor_id,
      status: "PAID",
    };
  });
}

function mapDebtToProps(
  debt: DebtResponse,
  userId: string,
): DebtProps & { id: string } {
  const type = debt.creditorId === userId ? "lent" : "borrowed";
  const subject = type === "borrowed" ? debt.creditorName : debt.debtorName;

  return {
    id: debt.id,
    type,
    date: debt.date.slice(0, 16),
    amount: debt.amount,
    currency: debt.currency,
    subject: subject,
    status: debt.status,
  };
}

export default async function Home() {
  const userInfoPromise = fetchUserInfo();
  const debtsPromise = fetchDebts();

  const [userInfo, debtResponse] = await Promise.all([
    userInfoPromise,
    debtsPromise,
  ]);

  if (userInfo === null || debtResponse === null) {
    redirect("/login");
  }

  const debts = debtResponse.map((debt) =>
    mapDebtToProps(debt, userInfo.userId),
  );

  return (
    <NavigationLayout userInfo={userInfo}>
      <main className="flex flex-1 flex-col p-4">
        <div>
          <h1 className="text-2xl font-semibold">Debt Overview</h1>
        </div>
        <div className="flex flex-col gap-2 py-2">
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
    </NavigationLayout>
  );
}

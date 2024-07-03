import { redirect } from "next/navigation";
import { NavigationLayout } from "@/app/layouts/NavigationLayout";
import { Debt, Props as DebtProps } from "@/app/components/Debt";
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
  status: "paid" | "unpaid" | "pending";
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
    // TODO: add zod validation
  } catch (e) {
    // TODO: log the error

    throw new Error("Failed to deserialise debts", { cause: e });
  }

  return debts.map((debt: any) => ({
    id: debt.debt_id,
    date: debt.created_at,
    amount: debt.amount,
    currency: debt.currency,
    creditorName: debt.creditor_name,
    debtorName: debt.debtor_name,
    creditorId: debt.creditor_id,
    debtorId: debt.debtor_id,
    status: debt.status,
  }));
}

function mapDebtToProps(
  debt: DebtResponse,
  userId: string,
): DebtProps & { id: string } {
  const type = debt.creditorId === userId ? "lent" : "borrowed";
  const subject = type === "borrowed" ? debt.creditorName : debt.debtorName;

  const date = new Date(debt.date).toLocaleDateString();

  return {
    id: debt.id,
    type,
    date,
    amount: debt.amount,
    currency: debt.currency,
    subject,
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
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-semibold">Debt Overview</h1>
        </div>
        <div className="my-2 flex flex-col gap-2 md:my-4 md:flex-row md:flex-wrap md:justify-center md:gap-4">
          {debts.map(
            ({ id, type, date, amount, currency, subject, status }) => (
              <Debt
                key={id}
                type={type}
                date={date}
                amount={amount}
                currency={currency}
                subject={subject}
                status={status}
              />
            ),
          )}
        </div>
      </main>
    </NavigationLayout>
  );
}

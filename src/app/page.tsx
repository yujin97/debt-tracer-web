import { Debt } from "./components/Debt";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12">
      <div>
        <h1>Debt Tracer</h1>
      </div>
      <div className="flex flex-col p-4">
        <Debt
          type="borrowed"
          date="2024-05-19"
          amount={420.69}
          currency="USD"
          subject="Oscar"
          status="PAID"
        />
        <Debt
          type="borrowed"
          date="2024-05-19"
          amount={420.69}
          currency="USD"
          subject="Oscar"
          status="PAID"
        />
      </div>
    </main>
  );
}

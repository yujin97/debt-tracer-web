"use client";

export default function Login() {
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      });
    } catch (e) {
      // TODO: display error messages
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div className="py-4">Login Page</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          className="my-2 text-black"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="my-2 text-black"
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

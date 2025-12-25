import React, { useMemo, useState } from "react";

type Me = { name: string; role: string };

export default function App() {
  const apiBase = useMemo(() => import.meta.env.VITE_API_BASE ?? "http://localhost:5000", []);
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMe(null);

    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      setError("Login failed");
      setToken(null);
      return;
    }

    const data = await res.json();
    setToken(data.token);
  }

  async function loadMe() {
    setError(null);
    const res = await fetch(`${apiBase}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      setError("Not authorised");
      setMe(null);
      return;
    }

    setMe(await res.json());
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 520 }}>
      <h1 data-testid="app-title">React AUT</h1>

      {!token ? (
        <form onSubmit={onLogin} data-testid="login-form">
          <label>
            Username
            <input
              data-testid="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ display: "block", width: "100%", margin: "6px 0 12px" }}
            />
          </label>

          <label>
            Password
            <input
              data-testid="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ display: "block", width: "100%", margin: "6px 0 12px" }}
            />
          </label>

          <button data-testid="login-submit" type="submit">
            Login
          </button>

          {error && <p data-testid="error" style={{ color: "crimson" }}>{error}</p>}
        </form>
      ) : (
        <div data-testid="dashboard">
          <p data-testid="token">Token: {token}</p>
          <button data-testid="load-me" onClick={loadMe}>Load profile</button>

          {me && (
            <div style={{ marginTop: 12 }}>
              <h2 data-testid="welcome">Welcome, {me.name}</h2>
              <p data-testid="role">Role: {me.role}</p>
            </div>
          )}

          {error && <p data-testid="error" style={{ color: "crimson" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";

interface Reading {
  voltage: number;
}

export const MeterDashboard: React.FC = () => {
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = new EventSource("/api/stream");

    source.onmessage = (event: MessageEvent) => {
      try {
        const data: Reading = JSON.parse(event.data);
        setReading(data);
        setError(null);
      } catch (e: any) {
        setError(`Invalid data format: ${e.message}`);
      }
    };

    source.addEventListener("error", (event: MessageEvent) => {
      try {
        const err = JSON.parse(event.data);
        setError(err.message);
      } catch {
        setError("Unknown error");
      }
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>DIRIS A-30 Live Voltage</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {reading ? (
        <p style={{ fontSize: "2rem" }}>{reading.voltage.toFixed(2)} V</p>
      ) : (
        <p>Connecting…</p>
      )}
    </div>
  );
};

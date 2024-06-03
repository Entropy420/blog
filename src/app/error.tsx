"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>An Error Occurred: "{error.message}"</h1>
      <button onClick={reset}>Try Again?</button>
    </div>
  );
}

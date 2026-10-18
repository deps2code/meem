export function OrchidBackground() {
  return (
    <div
      aria-hidden="true"
      className="orchid-flow pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="orchid-blob orchid-blob-1" />
      <div className="orchid-blob orchid-blob-2" />
      <div className="orchid-blob orchid-blob-3" />
      <div className="orchid-blob orchid-blob-4" />
      <div className="absolute inset-0 bg-[var(--scrim)]" />
      <div className="orchid-noise absolute inset-0" />
    </div>
  );
}

const stars = createStars(42, 70);

export function Starfield() {
  return (
    <div className="starfield pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

function createStars(seed: number, count: number) {
  let state = seed;
  const next = () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${next() * 100}%`,
    top: `${next() * 100}%`,
    size: next() > 0.9 ? 3 : 2,
    opacity: 0.15 + next() * 0.4,
  }));
}

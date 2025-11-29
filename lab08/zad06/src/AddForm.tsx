import { useState } from "react";
import type { Avatar, Character } from "./App";
import styles from "./AddForm.module.css";

interface Props {
  onAdd: (c: Character) => void;
  avatars: Avatar[];
  cancel: () => void;
}

type Stats = {
  strength: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};
type StatKey = keyof Stats;

const STAT_DEFS: { key: StatKey; label: string }[] = [
  { key: "strength", label: "Siła" },
  { key: "intelligence", label: "Inteligencja" },
  { key: "wisdom", label: "Mądrość" },
  { key: "charisma", label: "Charyzma" },
];

const MAX_POINTS_TOTAL = 10;
const MAX_POINTS_PER_STAT = 10;

export default function AddForm(props: Props) {
  const [value, setValue] = useState("");
  const [stats, setStats] = useState<Stats>({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });

  const usedPoints =
    stats.strength + stats.intelligence + stats.wisdom + stats.charisma;
  const remainingPoints = MAX_POINTS_TOTAL - usedPoints;

  const setStatValue = (stat: StatKey, target: number) => {
    // klik w to samo "oczko" zmniejsza o 1 (toggle)
    const current = stats[stat];
    let next = target === current ? current - 1 : target;

    // ogranicz per-stat
    next = Math.max(0, Math.min(next, MAX_POINTS_PER_STAT));

    const delta = next - current;

    // jeśli zwiększamy, nie przekraczaj puli
    if (delta > 0 && delta > remainingPoints) {
      next = current + remainingPoints; // dopełnij tylko tyle ile zostało
    }

    if (next !== current) {
      setStats((s) => ({ ...s, [stat]: next }));
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.reportValidity()) return;
        const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
        const ageInput = form.querySelector<HTMLInputElement>('input[name="age"]');
        const name = nameInput?.value ?? "";
        const age = Number(ageInput?.value ?? 0);

        const character: Character = {
          name,
          age,
          class: value as Character["class"], // Użyj wybranego avatar id
          stats,
        };

        props.onAdd(character);
      }}
    >
      <h2 style={{ color: "black" }}>Kreator Postaci</h2>
      <div className={styles.inputs}>
        <label>
          <input type="text" name="name" placeholder="Nazwa postaci" required autoComplete="off"/>
        </label>
        <label>
          <input type="number" name="age" placeholder="Wiek postaci" min={0} max={1000} required />
        </label>
      </div>

      <div className={styles.avatarsSelect}>
        {props.avatars.map((a) => (
          <label
            key={a.id}
            className={`${styles.avatar} ${value === a.id ? styles.selected : ""}`}
          >
            <input
              type="radio"
              name="avatar"
              value={a.id}
              onChange={() => setValue(a.id)}
            />
            <img src={a.img} alt={a.id} />
          </label>
        ))}
      </div>

      <div className={styles.selectStats}>
        <div className={styles.statsHeader}>
          Pozostało punktów: <strong>{remainingPoints}</strong> / {MAX_POINTS_TOTAL}
        </div>

        {STAT_DEFS.map(({ key, label }) => (
          <div key={key} className={styles.statRow}>
            <span className={styles.statLabel}>
              {label}: <strong>{stats[key]}</strong>
            </span>
            <div className={styles.dots} role="group" aria-label={label}>
              {Array.from({ length: MAX_POINTS_PER_STAT }, (_, i) => {
                const valueForDot = i + 1;
                const isFilled = valueForDot <= stats[key];
                const willIncrease = valueForDot > stats[key];
                const needed = valueForDot - stats[key];
                const blocked = willIncrease && needed > remainingPoints;

                return (
                  <button
                    key={valueForDot}
                    type="button"
                    className={`${styles.dot} ${isFilled ? styles.filled : ""} ${
                      blocked ? styles.blocked : ""
                    }`}
                    aria-label={`${label} = ${valueForDot}`}
                    aria-pressed={isFilled}
                    onClick={() => setStatValue(key, valueForDot)}
                    disabled={false}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button type="submit">
          Stwórz Postać
        </button>
        <button type="button" onClick={props.cancel}>Anuluj</button>
      </div>
    </form>
  );
}
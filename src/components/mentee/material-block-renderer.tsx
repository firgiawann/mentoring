"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Lightbulb, ShieldCheck } from "lucide-react";

import type { MaterialBlock } from "@/features/materials/types";

type MaterialBlockRendererProps = {
  block: MaterialBlock;
};

function ScenarioBlock({ block }: { block: Extract<MaterialBlock, { type: "scenario" }> }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = block.options.find((option) => option.id === selectedId);

  return (
    <section className="learning-block learning-block--activity">
      <span className="activity-label">Coba situasi</span>
      <h3>{block.title}</h3>
      <p>{block.prompt}</p>
      <div className="block-options">
        {block.options.map((option) => (
          <button
            aria-pressed={selectedId === option.id}
            className="block-option"
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      {selected ? (
        <p className={`block-feedback ${selected.recommended ? "block-feedback--success" : ""}`} role="status">
          {selected.feedback}
        </p>
      ) : null}
    </section>
  );
}

function TrueFalseBlock({ block }: { block: Extract<MaterialBlock, { type: "true_false" }> }) {
  const [answer, setAnswer] = useState<boolean | null>(null);

  return (
    <section className="learning-block learning-block--activity">
      <span className="activity-label">Benar atau salah?</span>
      <p className="activity-statement">{block.statement}</p>
      <div className="block-options block-options--compact">
        <button aria-pressed={answer === true} className="block-option" onClick={() => setAnswer(true)} type="button">Benar</button>
        <button aria-pressed={answer === false} className="block-option" onClick={() => setAnswer(false)} type="button">Salah</button>
      </div>
      {answer !== null ? (
        <p className={`block-feedback ${answer === block.answer ? "block-feedback--success" : ""}`} role="status">
          {answer === block.answer ? "Tepat. " : "Belum tepat. "}{block.explanation}
        </p>
      ) : null}
    </section>
  );
}

function ChecklistBlock({ block }: { block: Extract<MaterialBlock, { type: "checklist" }> }) {
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <section className="learning-block">
      <span className="activity-label">Checklist pribadi</span>
      <h3>{block.title}</h3>
      <div className="block-checklist">
        {block.items.map((item) => (
          <label key={item}>
            <input
              checked={checked.includes(item)}
              onChange={(event) => setChecked((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item))}
              type="checkbox"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <p className="block-caption">Pilihan ini menjadi pengingat pribadi, bukan penilaian.</p>
    </section>
  );
}

function ReflectionBlock({ block }: { block: Extract<MaterialBlock, { type: "reflection" }> }) {
  const [answer, setAnswer] = useState("");

  return (
    <section className="learning-block learning-block--reflection">
      <span className="activity-label"><ShieldCheck size={16} /> Ruang refleksi pribadi</span>
      <h3>{block.title}</h3>
      <label className="reflection-field">
        <span>{block.prompt}</span>
        <textarea onChange={(event) => setAnswer(event.target.value)} rows={5} value={answer} />
      </label>
      <p className="privacy-note"><ShieldCheck size={16} /> {block.privacyNote}</p>
    </section>
  );
}

function OrderingBlock({ block }: { block: Extract<MaterialBlock, { type: "ordering" }> }) {
  const [items, setItems] = useState(() => [...block.items].sort((a, b) => b.order - a.order));
  const [checked, setChecked] = useState(false);

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    setItems((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
    setChecked(false);
  }

  const isCorrect = items.every((item, index) => item.order === index + 1);

  return (
    <section className="learning-block learning-block--activity">
      <span className="activity-label">Mini game urutan</span>
      <h3>{block.title}</h3>
      <ol className="ordering-list">
        {items.map((item, index) => (
          <li key={item.id}>
            <span>{index + 1}. {item.label}</span>
            <span className="ordering-actions">
              <button aria-label={`Naikkan ${item.label}`} disabled={index === 0} onClick={() => move(index, -1)} type="button"><ArrowUp size={17} /></button>
              <button aria-label={`Turunkan ${item.label}`} disabled={index === items.length - 1} onClick={() => move(index, 1)} type="button"><ArrowDown size={17} /></button>
            </span>
          </li>
        ))}
      </ol>
      <button className="block-check-button" onClick={() => setChecked(true)} type="button">Periksa urutan</button>
      {checked ? <p className={`block-feedback ${isCorrect ? "block-feedback--success" : ""}`} role="status">{isCorrect ? "Urutan sudah tepat!" : "Belum tepat. Coba geser tahapannya lagi."}</p> : null}
    </section>
  );
}

export function MaterialBlockRenderer({ block }: MaterialBlockRendererProps) {
  switch (block.type) {
    case "intro":
      return <p className="learning-block learning-block--intro">{block.body}</p>;
    case "key_points":
      return <section className="learning-block"><h3>{block.title}</h3><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
    case "fact":
      return <aside className="learning-block learning-block--fact"><span className="activity-label"><Lightbulb size={16} /> Fakta menarik</span><h3>{block.title}</h3><p>{block.body}</p><small>{block.sourceLabel}</small></aside>;
    case "link":
      return <section className="learning-block learning-block--link"><h3>{block.title}</h3><p>{block.description}</p><a href={block.href} rel="noreferrer" target="_blank">Buka {block.domain} <ExternalLink size={16} /></a><small>Status tautan: {block.reviewedAt}</small></section>;
    case "checklist":
      return <ChecklistBlock block={block} />;
    case "reflection":
      return <ReflectionBlock block={block} />;
    case "scenario":
      return <ScenarioBlock block={block} />;
    case "true_false":
      return <TrueFalseBlock block={block} />;
    case "ordering":
      return <OrderingBlock block={block} />;
    case "resource":
      return <aside className="learning-block learning-block--resource"><span className="activity-label"><ShieldCheck size={16} /> Dukungan</span><h3>{block.title}</h3><p>{block.body}</p>{block.href && block.actionLabel ? <a href={block.href}>{block.actionLabel}</a> : null}</aside>;
  }
}

"use client";

import { useMemo, useState } from "react";

const demoCases = {
  "leaf-spots": {
    label: "Leaf spots after humidity spike",
    diagnosis:
      "Early fungal pressure is likely. Confidence is moderate because the symptoms are patchy rather than uniform.",
    confidence: 74,
    actions: [
      "Isolate the affected block and verify spread across the last 48 hours.",
      "Apply the recommended treatment window for the suspected fungus.",
      "Capture one follow-up photo after treatment and log the lot reference.",
    ],
    record: [
      "Observed irregular brown spotting on lower leaves.",
      "Weather context: high humidity and overnight moisture.",
      "Recommended action logged and ready for exporter review.",
    ],
  },
  wilting: {
    label: "Wilting near irrigation line",
    diagnosis:
      "Water stress or blockage is more likely than disease. Confidence is moderate-high because the pattern tracks the irrigation row.",
    confidence: 82,
    actions: [
      "Inspect the irrigation junction for blockage or pressure loss.",
      "Check root moisture before applying any chemical treatment.",
      "Log remediation and re-check plant recovery tomorrow morning.",
    ],
    record: [
      "Localized wilting clustered along one irrigation segment.",
      "No visible spotting or pest residue in captured notes.",
      "Mechanical irrigation inspection added to compliance draft.",
    ],
  },
  "pest-damage": {
    label: "Chewed leaf edges and residue",
    diagnosis:
      "Likely active pest pressure. Confidence is high because feeding damage and residue point to a live pest event.",
    confidence: 89,
    actions: [
      "Inspect underside of leaves and confirm pest type.",
      "Treat the affected area and record chemical / dose / operator.",
      "Prepare evidence pack for cooperative QA handoff.",
    ],
    record: [
      "Feeding damage visible on outer leaf edges.",
      "Residue and spread pattern suggest active infestation.",
      "Treatment log and evidence checklist prepared for export review.",
    ],
  },
};

type CaseKey = keyof typeof demoCases;

export default function Home() {
  const [grower, setGrower] = useState("Lerum Growers Coop");
  const [location, setLocation] = useState("North block · Row 14");
  const [crop, setCrop] = useState("Tomatoes");
  const [symptom, setSymptom] = useState<CaseKey>("leaf-spots");
  const [notes, setNotes] = useState(
    "Seen after two humid mornings. Export pickup is tomorrow.",
  );
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const result = useMemo(() => demoCases[symptom], [symptom]);

  const runDiagnosis = async () => {
    if (!grower.trim() || !location.trim() || !crop.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("done");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-300">
              Dog Walk Ventures · Agriculture · POC
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              ChainProof — Grower Evidence Inbox
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">
              Capture a field issue, run a likely diagnosis, and turn it into a
              compliance-ready record.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
            Prototype v0.1
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Operator input
                </p>
                <h2 className="mt-1 text-xl font-semibold">Field intake</h2>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                Mode: assisted diagnosis
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Grower / cooperative</span>
                <input
                  value={grower}
                  onChange={(e) => setGrower(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Location</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Crop</span>
                <input
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Observed symptom</span>
                <select
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value as CaseKey)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
                >
                  {Object.entries(demoCases).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm text-slate-200">
              <span>Field notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={runDiagnosis}
                className="rounded-2xl bg-emerald-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-300"
              >
                {status === "loading" ? "Running diagnosis…" : "Run diagnosis"}
              </button>
              <div className="text-sm text-slate-400">
                Happy-path prototype with mocked inference and structured output.
              </div>
            </div>

            {status === "error" && (
              <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                Fill in grower, location, and crop before running the diagnosis.
              </div>
            )}

            {status === "idle" && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                Start with a real field context, then run the prototype to see
                diagnosis, action, and evidence output in one pass.
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    System output
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">Diagnosis result</h2>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {status === "done" ? `Confidence ${result.confidence}%` : "Awaiting run"}
                </div>
              </div>

              {status === "loading" ? (
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-700" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
                </div>
              ) : status === "done" ? (
                <>
                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <div className="text-sm font-medium text-emerald-200">Likely issue</div>
                    <p className="mt-2 text-sm leading-6 text-slate-100">
                      {result.diagnosis}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-200">
                      Recommended next actions
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {result.actions.map((action) => (
                        <li
                          key={action}
                          className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
                        >
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  No diagnosis yet. Run the intake on the left to generate a
                  likely issue, confidence level, and immediate response.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Usable output
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Compliance-ready record
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  Export draft
                </div>
              </div>

              {status === "done" ? (
                <div className="mt-5 space-y-4 text-sm text-slate-200">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Grower
                      </div>
                      <div className="mt-2 font-medium">{grower}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Location
                      </div>
                      <div className="mt-2 font-medium">{location}</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Record summary
                    </div>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {result.record.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-dashed border-emerald-400/30 bg-emerald-400/5 p-4 text-slate-300">
                    Ready to hand off as structured evidence for cooperative QA,
                    exporter review, or audit prep.
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  The record will populate after diagnosis with operator
                  context, likely issue, and next-step evidence notes.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

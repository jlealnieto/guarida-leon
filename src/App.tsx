import { useState } from "react";
import { supabase } from "./supabaseClient";
import pumpkinImg from "./assets/pumpkin.png";
import spiderwebImg from "./assets/spiderweb.svg";

// ── SVG Assets ────────────────────────────────────────────────────────────────

function SkullEmblem({ size = 200 }: { size?: number }) {
  // Frankenstein monster bust illustration
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Frankenstein, emblema de la Guarida León"
    >
      {/* Moon glow backdrop */}
      <ellipse cx="100" cy="110" rx="75" ry="80" fill="rgba(80,250,123,0.04)" />

      {/* Lightning bolt accent (top left) */}
      <path d="M38 30 L32 48 L40 46 L34 64" stroke="#50FA7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Lightning bolt (top right) */}
      <path d="M162 30 L168 48 L160 46 L166 64" stroke="#50FA7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

      {/* Neck bolts */}
      <rect x="62" y="154" width="12" height="8" rx="6" fill="#8A9A7A" stroke="#50FA7B" strokeWidth="1" />
      <rect x="126" y="154" width="12" height="8" rx="6" fill="#8A9A7A" stroke="#50FA7B" strokeWidth="1" />
      {/* Bolt studs */}
      <circle cx="68" cy="158" r="3" fill="#50FA7B" opacity="0.8" />
      <circle cx="132" cy="158" r="3" fill="#50FA7B" opacity="0.8" />

      {/* Neck */}
      <rect x="78" y="155" width="44" height="28" rx="4" fill="#5A7A5A" />
      <line x1="78" y1="163" x2="122" y2="163" stroke="#4A6A4A" strokeWidth="1.5" />
      <line x1="78" y1="171" x2="122" y2="171" stroke="#4A6A4A" strokeWidth="1.5" />

      {/* Suit collar / jacket */}
      <path d="M55 183 L78 162 L100 172 L122 162 L145 183 L130 210 L70 210 Z" fill="#2A3A2A" />
      <path d="M78 162 L100 180 L122 162 L100 172 Z" fill="#1A2A1A" />
      {/* Lapels */}
      <path d="M78 162 L65 185 L85 178 L100 180" fill="#222D22" />
      <path d="M122 162 L135 185 L115 178 L100 180" fill="#222D22" />
      {/* Shirt/tie */}
      <path d="M96 172 L100 185 L104 172 L100 168 Z" fill="#E8935A" opacity="0.9" />

      {/* Head — green-tinted flat rectangular Frankenstein shape */}
      <rect x="62" y="60" width="76" height="98" rx="8" fill="#6AAA6A" />
      {/* Head shading */}
      <rect x="62" y="60" width="76" height="40" rx="8" fill="#5A9A5A" />
      <path d="M62 100 Q100 108 138 100 L138 158 Q100 162 62 158 Z" fill="#72B272" opacity="0.3" />

      {/* Flat-top hair — the signature Frankenstein feature */}
      <rect x="58" y="50" width="84" height="22" rx="4" fill="#1A1A1A" />
      {/* Hair texture lines */}
      <line x1="70" y1="50" x2="70" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="80" y1="50" x2="80" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="90" y1="50" x2="90" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="100" y1="50" x2="100" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="110" y1="50" x2="110" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="120" y1="50" x2="120" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />
      <line x1="130" y1="50" x2="130" y2="72" stroke="#2A2A2A" strokeWidth="1.5" />

      {/* Brow ridge — heavy flat brow */}
      <rect x="64" y="88" width="72" height="10" rx="3" fill="#3A5A3A" />
      {/* Angry brow lines */}
      <line x1="72" y1="88" x2="88" y2="96" stroke="#2A4A2A" strokeWidth="2" />
      <line x1="128" y1="88" x2="112" y2="96" stroke="#2A4A2A" strokeWidth="2" />

      {/* Eyes — yellow-green glowing */}
      <ellipse cx="85" cy="108" rx="10" ry="9" fill="#22232D" />
      <ellipse cx="115" cy="108" rx="10" ry="9" fill="#22232D" />
      <ellipse cx="85" cy="108" rx="6" ry="5.5" fill="#90EE50" opacity="0.9" />
      <ellipse cx="115" cy="108" rx="6" ry="5.5" fill="#90EE50" opacity="0.9" />
      <circle cx="85" cy="108" r="3" fill="#50FA7B" />
      <circle cx="115" cy="108" r="3" fill="#50FA7B" />
      <circle cx="87" cy="106" r="1.5" fill="white" opacity="0.6" />
      <circle cx="117" cy="106" r="1.5" fill="white" opacity="0.6" />
      {/* Eye glow aura */}
      <ellipse cx="85" cy="108" rx="10" ry="9" fill="none" stroke="#50FA7B" strokeWidth="1" opacity="0.4" />
      <ellipse cx="115" cy="108" rx="10" ry="9" fill="none" stroke="#50FA7B" strokeWidth="1" opacity="0.4" />

      {/* Nose — wide flat */}
      <path d="M94 120 Q100 116 106 120 Q108 126 100 128 Q92 126 94 120Z" fill="#4A8A4A" />
      <circle cx="95" cy="124" r="2.5" fill="#3A7A3A" />
      <circle cx="105" cy="124" r="2.5" fill="#3A7A3A" />

      {/* Mouth — stitched grimace */}
      <path d="M78 136 Q100 148 122 136" stroke="#2A4A2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Stitches on mouth */}
      <line x1="88" y1="136" x2="86" y2="142" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="139" x2="98" y2="145" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="112" y1="136" x2="110" y2="142" stroke="#2A4A2A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Forehead scar — Frankenstein stitch */}
      <path d="M80 76 L88 80 L96 76 L104 80 L112 76 L120 80" stroke="#2A4A2A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stitch marks crossing the scar */}
      <line x1="84" y1="74" x2="84" y2="82" stroke="#1A3A1A" strokeWidth="1" />
      <line x1="92" y1="74" x2="92" y2="82" stroke="#1A3A1A" strokeWidth="1" />
      <line x1="100" y1="74" x2="100" y2="82" stroke="#1A3A1A" strokeWidth="1" />
      <line x1="108" y1="74" x2="108" y2="82" stroke="#1A3A1A" strokeWidth="1" />
      <line x1="116" y1="74" x2="116" y2="82" stroke="#1A3A1A" strokeWidth="1" />

      {/* Ear / temple sides */}
      <rect x="56" y="95" width="8" height="20" rx="3" fill="#5A9A5A" />
      <rect x="136" y="95" width="8" height="20" rx="3" fill="#5A9A5A" />

      {/* Ambient glow particles */}
      <circle cx="46" cy="100" r="1.5" fill="#50FA7B" opacity="0.5" />
      <circle cx="154" cy="95" r="1.5" fill="#50FA7B" opacity="0.5" />
      <circle cx="50" cy="140" r="1" fill="#BD93F9" opacity="0.4" />
      <circle cx="155" cy="135" r="1" fill="#BD93F9" opacity="0.4" />
    </svg>
  );
}

function BatDecor({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className={className} aria-hidden="true">
      <path d="M16 10 C12 6 6 4 0 6 C4 8 8 10 10 12 C12 14 14 15 16 14 C18 15 20 14 22 12 C24 10 28 8 32 6 C26 4 20 6 16 10Z" fill="#BD93F9" opacity="0.5" />
      <circle cx="16" cy="10" r="2.5" fill="#BD93F9" opacity="0.7" />
    </svg>
  );
}

function HangingSpider({ className = "", threadLength = 60, size = 34 }: { className?: string; threadLength?: number; size?: number }) {
  const totalHeight = threadLength + size;
  return (
    <svg
      width={size}
      height={totalHeight}
      viewBox={`0 0 40 ${threadLength + 40}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Thread */}
      <line x1="20" y1="0" x2="20" y2={threadLength} stroke="#6272A4" strokeWidth="1" opacity="0.6" />
      <g transform={`translate(0, ${threadLength})`}>
        {/* Legs — 4 per side, curved */}
        <g stroke="#12131A" strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M14 16 C6 12 2 10 -2 12" />
          <path d="M14 20 C5 19 0 19 -4 21" />
          <path d="M14 24 C6 26 1 28 -3 32" />
          <path d="M14 27 C7 31 4 33 2 38" />
          <path d="M26 16 C34 12 38 10 42 12" />
          <path d="M26 20 C35 19 40 19 44 21" />
          <path d="M26 24 C34 26 39 28 43 32" />
          <path d="M26 27 C33 31 36 33 38 38" />
        </g>
        {/* Abdomen */}
        <ellipse cx="20" cy="26" rx="9" ry="10" fill="#12131A" />
        {/* Head */}
        <circle cx="20" cy="14" r="6" fill="#12131A" />
        {/* Eyes */}
        <circle cx="17.5" cy="13" r="1.3" fill="#FF5555" />
        <circle cx="22.5" cy="13" r="1.3" fill="#FF5555" />
      </g>
    </svg>
  );
}

function Pumpkin({ size = 48, className = "" }: { size?: number; className?: string; variant?: number }) {
  return (
    <img
      src={pumpkinImg}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ objectFit: "contain", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.35))" }}
    />
  );
}

function Spiderweb({ className = "", size = 80, opacity = 0.3, color = "#BD93F9" }: { className?: string; size?: number; opacity?: number; color?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        opacity,
        backgroundColor: color,
        WebkitMaskImage: `url(${spiderwebImg})`,
        maskImage: `url(${spiderwebImg})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

// ── Event Details (single source of truth — edit here, used in both views) ────

const EVENTO = {
  fechaCorta: "Dom 1 de noviembre",
  fechaLarga: "Domingo 1 de noviembre",
  hora: "7:00 PM",
  lugar: "Cr 7h bis #159-25",
  byod: "Trae tu propia bebida",
  cover: "$15.000 COP por persona",
};

// ── Theme Categories (matches the `categoria` column in Supabase) ─────────────

const categoriaInfo: Record<string, { emoji: string; label: string }> = {
  musica: { emoji: "🎸", label: "Grupo musical" },
  pelicula: { emoji: "🎬", label: "Película" },
  viejo_oeste: { emoji: "🤠", label: "Viejo oeste" },
  mixta: { emoji: "🎭", label: "Especial" },
};

function categoriaOf(cat: string) {
  return categoriaInfo[cat] ?? { emoji: "🎭", label: "Temática" };
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BD93F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8935A" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#50FA7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCoin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#50FA7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10" />
    <path d="M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2" />
  </svg>
);

const IconDrink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BD93F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2L4 8h16L16 2H8z" />
    <path d="M4 8l4 14h8l4-14" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type AppState =
  | { view: "form" }
  | { view: "confirm"; familyName: string; members: number; code: string; themeName: string; category: string };

type LookupState = { name: string; code: string };

// ── Lookup Panel ──────────────────────────────────────────────────────────────

function LookupPanel() {
  const [lookup, setLookup] = useState<LookupState>({ name: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { found: boolean; themeName?: string; category?: string }>(null);

  async function handleLookup() {
    const name = lookup.name.trim();
    const code = lookup.code.trim();
    if (!name || !code) return;

    setLoading(true);
    setResult(null);
    const { data, error } = await supabase.rpc("consultar_resultado", {
      p_nombre_familia: name,
      p_codigo: code,
    });
    setLoading(false);

    if (error) {
      setResult({ found: false });
      return;
    }
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) {
      setResult({ found: false });
      return;
    }
    setResult({ found: true, themeName: row.tema_asignado, category: row.categoria_tema });
  }

  const cat = result?.category ? categoriaOf(result.category) : null;

  return (
    <div className="card-spooky rounded-2xl p-6 space-y-4">
      <p className="text-center text-base" style={{ color: "#6272A4" }}>¿Ya te registraste? Consulta tu temática</p>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Nombre de familia"
          value={lookup.name}
          onChange={(e) => setLookup((p) => ({ ...p, name: e.target.value }))}
          className="flex-1 rounded-xl px-4 py-2.5 text-base"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Código"
          value={lookup.code}
          onChange={(e) => setLookup((p) => ({ ...p, code: e.target.value.slice(0, 4) }))}
          className="w-24 rounded-xl px-4 py-2.5 text-base text-center font-mono"
          maxLength={4}
          disabled={loading}
        />
      </div>
      <button
        onClick={handleLookup}
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-base font-semibold transition-all duration-200 disabled:opacity-60"
        style={{ background: "rgba(189,147,249,0.15)", border: "1px solid rgba(189,147,249,0.4)", color: "#BD93F9" }}
      >
        {loading ? "Buscando…" : "Consultar →"}
      </button>
      {result && (
        <div className="rounded-xl p-4 text-center" style={{ background: result.found ? "rgba(80,250,123,0.08)" : "rgba(232,147,90,0.08)", border: `1px solid ${result.found ? "rgba(80,250,123,0.3)" : "rgba(232,147,90,0.3)"}` }}>
          {result.found && result.themeName && cat ? (
            <>
              <p className="text-base mb-1" style={{ color: "#6272A4" }}>Tu temática asignada</p>
              <p className="text-2xl">{cat.emoji}</p>
              <p className="font-semibold mt-1" style={{ color: "#50FA7B" }}>{result.themeName}</p>
              <p className="text-base mt-1" style={{ color: "#6272A4" }}>{cat.label}</p>
            </>
          ) : (
            <p className="text-lg" style={{ color: "#E8935A" }}>No encontramos ese nombre y código juntos. Revisa que estén bien escritos.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Confirm View ──────────────────────────────────────────────────────────────

function ConfirmView({ familyName, members, code, themeName, category, onBack }: { familyName: string; members: number; code: string; themeName: string; category: string; onBack: () => void }) {
  const theme = categoriaOf(category);
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-radial-cave flex flex-col items-center px-5 py-12 relative overflow-hidden">
      {/* Corner webs */}
      <div className="absolute top-0 left-0" style={{ transform: "translate(-20%, -20%)" }}>
        <Spiderweb size={180} opacity={0.4} />
      </div>
      <div className="absolute top-0 right-0" style={{ transform: "translate(20%, -20%) scaleX(-1)" }}>
        <Spiderweb size={180} opacity={0.4} />
      </div>
      {/* Decorative bats */}
      <BatDecor className="bat-1 absolute top-16 left-8 opacity-60" />
      <BatDecor className="bat-2 absolute top-24 right-12 opacity-40" />

      {/* Hanging spiders */}
      <HangingSpider className="spider-1 absolute top-0 left-12 opacity-60" threadLength={60} size={26} />
      <HangingSpider className="spider-2 absolute top-0 right-20 opacity-55" threadLength={85} size={24} />

      <div className="w-full max-w-lg mx-auto space-y-8">
        {/* Success emblem */}
        <div className="text-center space-y-4">
          <div className="animate-float inline-block">
            <SkullEmblem size={120} />
          </div>
          <div>
            <p className="text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "#50FA7B" }}>✓ Registro confirmado</p>
            <h1 className="font-gothic text-4xl md:text-5xl animate-flicker" style={{ color: "#F8F8F2", lineHeight: 1.1 }}>
              Guarida Leon
            </h1>
            <p className="mt-2 text-lg" style={{ color: "#BD93F9" }}>Te esperamos, familia {familyName}</p>
          </div>
        </div>

        <hr className="divider-rune" />

        {/* Theme reveal */}
        <div className="card-spooky rounded-2xl p-8 text-center space-y-5">
          <p className="text-base tracking-[0.25em] uppercase" style={{ color: "#6272A4" }}>Tu temática asignada</p>
          <div className="text-6xl">{theme.emoji}</div>
          <div>
            <h2 className="text-3xl font-bold" style={{ color: "#50FA7B" }}>{themeName}</h2>
            <p className="mt-2 text-lg leading-relaxed" style={{ color: "#A0A8C0" }}>{theme.label}</p>
          </div>

          {/* Secret code */}
          <div className="rounded-xl p-5 space-y-2" style={{ background: "rgba(189,147,249,0.08)", border: "1px solid rgba(189,147,249,0.25)" }}>
            <p className="text-base tracking-[0.2em] uppercase" style={{ color: "#6272A4" }}>Tu código secreto</p>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-4xl font-bold tracking-widest" style={{ color: "#BD93F9" }}>
                {code}
              </span>
              <button
                onClick={copyCode}
                className="text-sm px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ background: "rgba(189,147,249,0.15)", color: "#BD93F9", border: "1px solid rgba(189,147,249,0.3)" }}
              >
                {copied ? "¡Copiado!" : "Copiar"}
              </button>
            </div>
            <p className="text-sm" style={{ color: "#6272A4" }}>Guárdalo para consultar tu temática después</p>
          </div>
        </div>

        {/* Event reminder */}
        <div className="card-spooky rounded-2xl p-6">
          <p className="text-sm tracking-[0.2em] uppercase mb-4 text-center" style={{ color: "#6272A4" }}>Recuerda agendar</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <IconCalendar />
              <div>
                <p className="text-sm" style={{ color: "#6272A4" }}>Fecha</p>
                <p className="text-base font-medium">{EVENTO.fechaCorta}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <IconClock />
              <div>
                <p className="text-sm" style={{ color: "#6272A4" }}>Hora</p>
                <p className="text-base font-medium">{EVENTO.hora}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <IconPin />
              <div>
                <p className="text-sm" style={{ color: "#6272A4" }}>Lugar</p>
                <p className="text-base font-medium">{EVENTO.lugar}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <IconDrink />
              <div>
                <p className="text-sm" style={{ color: "#6272A4" }}>BYOD</p>
                <p className="text-base font-medium">{EVENTO.byod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <button
          onClick={onBack}
          className="w-full text-base py-3 rounded-xl transition-all duration-200"
          style={{ color: "#6272A4", border: "1px solid rgba(98,114,164,0.2)" }}
        >
          ← Volver a la invitación
        </button>

        {/* Lookup section */}
        <LookupPanel />
      </div>
    </div>
  );
}

// ── Main Form View ────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState<AppState>({ view: "form" });
  const [familyName, setFamilyName] = useState("");
  const [members, setMembers] = useState("");
  const [errors, setErrors] = useState<{ name?: string; members?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!familyName.trim()) errs.name = "Escribe el nombre de tu familia";
    const m = parseInt(members, 10);
    if (!members || isNaN(m) || m < 1 || m > 30) errs.members = "Número de integrantes (1-30)";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    const { data, error } = await supabase.rpc("registrar_familia", {
      p_nombre_familia: familyName.trim(),
      p_num_integrantes: m,
    });
    setSubmitting(false);

    if (error) {
      if (error.message?.includes("FAMILIA_YA_REGISTRADA")) {
        setErrors({ name: "Esta familia ya está registrada. Usa 'Consulta tu temática' más abajo con tu código." });
      } else if (error.message?.includes("No hay temáticas disponibles")) {
        setErrors({ members: "Se agotaron las temáticas para ese número de integrantes. Escríbele a Sleal directamente." });
      } else {
        setErrors({ name: "Algo salió mal registrando tu familia. Intenta de nuevo." });
      }
      return;
    }

    const row = Array.isArray(data) ? data[0] : data;
    setState({
      view: "confirm",
      familyName: familyName.trim(),
      members: m,
      code: row.codigo,
      themeName: row.tema_asignado,
      category: row.categoria_tema,
    });
  }

  if (state.view === "confirm") {
    return (
      <ConfirmView
        familyName={state.familyName}
        members={state.members}
        code={state.code}
        themeName={state.themeName}
        category={state.category}
        onBack={() => setState({ view: "form" })}
      />
    );
  }

  return (
    <div className="min-h-screen bg-radial-cave relative overflow-hidden">
      {/* Corner spiderwebs — large, anchored at each corner */}
      <div className="absolute top-0 left-0" style={{ transform: "translate(-20%, -20%)" }}>
        <Spiderweb size={200} opacity={0.45} />
      </div>
      <div className="absolute top-0 right-0" style={{ transform: "translate(20%, -20%) scaleX(-1)" }}>
        <Spiderweb size={200} opacity={0.45} />
      </div>
      <div className="absolute bottom-0 left-0" style={{ transform: "translate(-20%, 20%) scaleY(-1)" }}>
        <Spiderweb size={160} opacity={0.3} />
      </div>
      <div className="absolute bottom-0 right-0" style={{ transform: "translate(20%, 20%) scale(-1,-1)" }}>
        <Spiderweb size={160} opacity={0.3} />
      </div>
      <BatDecor className="bat-1 absolute top-20 left-6 opacity-50" />
      <BatDecor className="bat-2 absolute top-32 right-10 opacity-40" />
      <BatDecor className="bat-3 absolute top-14 left-1/3 opacity-30" />

      {/* Hanging spiders — dangle from the top edge near the corner webs */}
      <HangingSpider className="spider-1 absolute top-0 left-10 opacity-70" threadLength={70} size={30} />
      <HangingSpider className="spider-2 absolute top-0 right-16 opacity-60" threadLength={100} size={26} />
      <HangingSpider className="spider-3 absolute top-0 left-1/2 opacity-50" threadLength={50} size={22} />

      {/* Pumpkin corners */}
      <Pumpkin size={52} variant={1} className="absolute bottom-20 left-4 opacity-40" />
      <Pumpkin size={42} variant={2} className="absolute bottom-32 right-6 opacity-30" />

      <div className="w-full max-w-lg mx-auto px-5 py-14 space-y-12 relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="text-center space-y-6">
          <div className="animate-float inline-block glow-purple rounded-full p-2">
            <SkullEmblem size={180} />
          </div>

          <div className="space-y-3">
            <p className="text-sm tracking-[0.35em] uppercase" style={{ color: "#E8935A" }}>
              Invitación exclusiva
            </p>
            <h1
              className="font-gothic animate-flicker"
              style={{
                fontSize: "clamp(2.8rem, 10vw, 5rem)",
                color: "#F8F8F2",
                lineHeight: 1.05,
                textShadow: "0 0 30px rgba(189,147,249,0.4), 0 0 60px rgba(189,147,249,0.15)",
              }}
            >
              Guarida Leon
            </h1>
            <p className="text-xl font-light tracking-wide" style={{ color: "#BD93F9" }}>
              Fiesta de disfraces familiar
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3">
            <span style={{ color: "#E8935A", fontSize: "1.5rem" }}>🎃</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(189,147,249,0.5))" }} />
            <span style={{ color: "#BD93F9", fontSize: "1.75rem" }}>✦</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(189,147,249,0.5))" }} />
            <span style={{ color: "#E8935A", fontSize: "1.5rem" }}>🎃</span>
          </div>
        </section>

        {/* ── DETALLES DEL EVENTO ───────────────────────────────────── */}
        <section className="card-spooky rounded-2xl p-7 space-y-5">
          <h2 className="text-sm tracking-[0.3em] uppercase text-center" style={{ color: "#6272A4" }}>
            Detalles del evento
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><IconCalendar /></div>
              <div>
                <p className="text-sm mb-0.5" style={{ color: "#6272A4" }}>Fecha</p>
                <p className="font-semibold">{EVENTO.fechaLarga}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><IconClock /></div>
              <div>
                <p className="text-sm mb-0.5" style={{ color: "#6272A4" }}>Hora</p>
                <p className="font-semibold">{EVENTO.hora}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><IconPin /></div>
              <div>
                <p className="text-sm mb-0.5" style={{ color: "#6272A4" }}>Lugar</p>
                <p className="font-semibold">{EVENTO.lugar}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><IconDrink /></div>
              <div>
                <p className="text-sm mb-0.5" style={{ color: "#6272A4" }}>BYOD</p>
                <p className="font-semibold">{EVENTO.byod}</p>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-center"
            style={{ background: "rgba(80,250,123,0.1)", border: "1px solid rgba(80,250,123,0.3)" }}
          >
            <IconCoin />
            <p className="font-bold" style={{ color: "#50FA7B" }}>
              Cover: {EVENTO.cover}
            </p>
          </div>
        </section>

        <hr className="divider-rune" />

        {/* ── CONCEPTO ─────────────────────────────────────────────── */}
        <section className="text-center space-y-4 px-2">
          <div className="flex justify-center items-end gap-5 mb-2">
            <Pumpkin size={80} variant={0} />
            <Pumpkin size={96} variant={2} />
            <Pumpkin size={80} variant={1} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: "#BD93F9" }}>¿Cómo funciona?</h2>
          <p className="text-lg leading-relaxed" style={{ color: "#A0A8C0" }}>
            Al registrarte, tu familia recibirá una <strong style={{ color: "#F8F8F2" }}>temática de disfraz asignada automáticamente</strong>:{" "}
            puede ser grupos musicales, películas, el viejo oeste, universos de cómics y más.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#6272A4" }}>
            La temática se asigna según tu nombre de familia y número de integrantes.
            Todos los miembros deben ir disfrazados dentro del mismo universo.
          </p>
          <div className="inline-block rounded-xl px-5 py-3" style={{ background: "rgba(232,147,90,0.1)", border: "1px solid rgba(232,147,90,0.3)" }}>
            <p className="text-base" style={{ color: "#E8935A" }}>
              🔮 Recibirás un <strong>código de 4 dígitos</strong> para consultar tu temática en cualquier momento
            </p>
          </div>
        </section>

        <hr className="divider-rune" />

        {/* ── FORMULARIO ───────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold" style={{ color: "#F8F8F2" }}>Confirma tu asistencia</h2>
            <p className="text-base" style={{ color: "#6272A4" }}>Regístrate para descubrir tu misión de disfraz</p>
          </div>

          <form onSubmit={handleSubmit} className="card-spooky rounded-2xl p-7 space-y-5">
            {/* Family name */}
            <div className="space-y-2">
              <label className="block text-base font-medium" style={{ color: "#A0A8C0" }}>
                Nombre de la familia
              </label>
              <input
                type="text"
                placeholder="Ej. Familia Rodríguez"
                value={familyName}
                onChange={(e) => { setFamilyName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                className="w-full rounded-xl px-4 py-3 text-lg"
                disabled={submitting}
              />
              {errors.name && <p className="text-sm mt-1" style={{ color: "#E8935A" }}>{errors.name}</p>}
            </div>

            {/* Members */}
            <div className="space-y-2">
              <label className="block text-base font-medium" style={{ color: "#A0A8C0" }}>
                Número de integrantes
              </label>
              <input
                type="number"
                placeholder="¿Cuántos van?"
                value={members}
                onChange={(e) => { setMembers(e.target.value); setErrors((p) => ({ ...p, members: undefined })); }}
                className="w-full rounded-xl px-4 py-3 text-lg"
                min="1"
                max="30"
                disabled={submitting}
              />
              {errors.members && <p className="text-sm mt-1" style={{ color: "#E8935A" }}>{errors.members}</p>}
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl text-xl font-bold tracking-wide transition-all duration-300 glow-green disabled:opacity-60"
              style={{
                background: "#50FA7B",
                color: "#22232D",
              }}
            >
              {submitting ? "Consultando la guarida…" : "Revelar mi temática →"}
            </button>

            <p className="text-center text-sm" style={{ color: "#6272A4" }}>
              Una vez confirmada, tu misión queda sellada bajo la guarida 🦇
            </p>
          </form>
        </section>

        {/* ── LOOKUP ───────────────────────────────────────────────── */}
        <section>
          <LookupPanel />
        </section>

        {/* Footer */}
        <footer className="text-center pb-4 space-y-1">
          <p className="text-sm" style={{ color: "#6272A4" }}>
            Halloween · 2026 · Guarida León
          </p>
          <div className="flex justify-center gap-2 text-base">
            <span>🕷️</span><span>🎃</span><span>🦇</span><span>🎃</span><span>🕷️</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

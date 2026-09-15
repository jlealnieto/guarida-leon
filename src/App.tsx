import { useState } from "react";
import { supabase } from "./supabaseClient";

// ── Event Details (single source of truth — edit here) ────────────────────────

const EVENTO = {
  fechaLarga: "Domingo 1 de noviembre",
  hora: "7:00 PM",
  lugar: "Cr 7h bis #159-25",
  cover: "$15.000 COP por persona",
};

const ITINERARIO = [
  {
    hora: "7:00 PM",
    icon: "local_bar",
    titulo: "Ingreso & Coctel Secreto",
    descripcion: "Apertura de trampillas ocultas, recepción con champagne de contrabando y susurro de contraseñas.",
    rank: "A",
    suit: "♠",
    accent: "primary" as const,
  },
  {
    hora: "8:30 PM",
    icon: "theater_comedy",
    titulo: "Desfile de Máscaras",
    descripcion: "Presentación de alter-egos góticos y personajes de época bajo la penumbra del candelabro central.",
    rank: "K",
    suit: "♥",
    accent: "secondary" as const,
  },
  {
    hora: "10:00 PM",
    icon: "magic_button",
    titulo: "Cabaret & Ilusionismo",
    descripcion: "Swing jazz orquestado en vivo con mentalismo oscuro y magia de salón que desafía la fortuna.",
    rank: "Q",
    suit: "♦",
    accent: "primary" as const,
    spotlight: true,
  },
  {
    hora: "11:30 PM",
    icon: "military_tech",
    titulo: "Premiación de la Casa",
    descripcion: "Galardón para el mejor disfraz espectral y condecoración al gran estratega de las mesas.",
    rank: "J",
    suit: "♣",
    accent: "primary" as const,
  },
  {
    hora: "12:30 AM",
    icon: "casino",
    titulo: "Casino & Alta Apuesta",
    descripcion: "Ruleta europea, Blackjack desatado y mesas de Póker subterráneo hasta que el alba disuelva la niebla.",
    rank: "★",
    suit: "JOKER",
    accent: "tertiary" as const,
  },
];

const ACCENT_CLASSES = {
  primary: { text: "text-primary", bg: "bg-primary/20" },
  secondary: { text: "text-secondary", bg: "bg-secondary/20" },
  tertiary: { text: "text-tertiary", bg: "bg-tertiary/20" },
} as const;

const COMPANION_CHIPS = [
  { label: "0 Solo", value: 0 },
  { label: "1 - 3", value: 2 },
  { label: "4 - 6", value: 5 },
  { label: "7 - 10", value: 8 },
  { label: "+10 Séquito", value: 12 },
];

function chipIsActive(chipValue: number, companions: number) {
  if (chipValue === 0) return companions === 0;
  if (chipValue === 2) return companions >= 1 && companions <= 3;
  if (chipValue === 5) return companions >= 4 && companions <= 6;
  if (chipValue === 8) return companions >= 7 && companions <= 10;
  return companions > 10;
}

// ── RSVP Form ───────────────────────────────────────────────────────────────

function RsvpForm() {
  const [leadName, setLeadName] = useState("");
  const [companions, setCompanions] = useState(0);
  const [companionNames, setCompanionNames] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  function stepCompanions(delta: number) {
    setCompanions((prev) => Math.max(0, prev + delta));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName.trim()) {
      setError("Escribe el nombre del invitado principal.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const { error: insertError } = await supabase.from("rsvps").insert({
      lead_name: leadName.trim(),
      companions,
      companion_names: companionNames.trim() || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Algo salió mal sellando tu apuesta. Intenta de nuevo.");
      return;
    }

    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="mt-12 p-8 rounded-xl bg-surface-container-highest shadow-2xl text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[32px]">done_all</span>
        </div>
        <h4 className="font-headline text-2xl text-primary uppercase">¡Apuesta Confirmada en el Registro!</h4>
        <p className="font-label text-base text-on-surface mt-2">
          Tu lugar y el de tus acompañantes quedaron sellados en la mesa de {EVENTO.fechaLarga}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Lead name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="lead_name" className="font-label text-[13px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">badge</span>
          Nombre del Invitado Principal *
        </label>
        <input
          id="lead_name"
          type="text"
          placeholder="Ej. Don Alejandro de la Vega"
          value={leadName}
          onChange={(e) => setLeadName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg font-label text-base shadow-inner"
          disabled={submitting}
          required
        />
      </div>

      {/* Companions */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container/60 border border-outline-variant/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="font-label text-[13px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">group_add</span>
            Número de Acompañantes
          </label>
          <span className="font-label text-[11px] font-bold text-outline uppercase tracking-widest">Gran Séquito Permitido</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {COMPANION_CHIPS.map((chip) => {
            const active = chipIsActive(chip.value, companions);
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => setCompanions(chip.value)}
                disabled={submitting}
                className={`py-2 px-3 rounded-lg font-label text-[13px] font-semibold uppercase tracking-wider transition-all ${
                  active ? "bg-primary text-on-primary shadow-md" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                } ${chip.value === 12 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 p-2.5 rounded-lg bg-surface-container-lowest shadow-inner mt-1">
          <div className="flex flex-col">
            <span className="font-label text-[11px] font-semibold text-primary uppercase">Total exacto de acompañantes</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Reducir acompañante"
              onClick={() => stepCompanions(-1)}
              disabled={submitting}
              className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-xl transition-colors"
            >
              −
            </button>
            <input
              type="number"
              min={0}
              value={companions}
              onChange={(e) => setCompanions(Math.max(0, parseInt(e.target.value, 10) || 0))}
              disabled={submitting}
              className="w-16 h-10 text-center font-headline text-lg font-bold rounded-lg text-primary"
            />
            <button
              type="button"
              aria-label="Aumentar acompañante"
              onClick={() => stepCompanions(1)}
              disabled={submitting}
              className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-xl transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <label htmlFor="companion_names" className="font-label text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">format_list_bulleted</span>
            Nombres de los acompañantes <span className="text-outline normal-case font-light">(opcional)</span>
          </label>
          <textarea
            id="companion_names"
            placeholder="Ej. Sofia Montenegro, Carlos Valdés, Valeria Rossi..."
            value={companionNames}
            onChange={(e) => setCompanionNames(e.target.value)}
            rows={3}
            disabled={submitting}
            className="w-full px-4 py-2.5 rounded-lg font-label text-sm shadow-inner"
          />
        </div>
      </div>

      {error && (
        <p className="font-label text-sm text-secondary-container text-center" style={{ color: "#ff9e96" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="relative w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label text-[13px] font-bold uppercase tracking-[0.2em] shadow-[0_8px_30px_rgba(242,202,80,0.3)] hover:shadow-[0_8px_40px_rgba(242,202,80,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
      >
        <span className={`material-symbols-outlined text-[24px] ${submitting ? "animate-spin" : ""}`}>
          {submitting ? "refresh" : "poker_chip"}
        </span>
        <span>{submitting ? "Sellando Asistencia..." : "Apostar Mi Asistencia"}</span>
        {!submitting && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
      </button>
    </form>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="w-full min-h-screen bg-radial-casino text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-fixed via-primary to-primary-container flex items-center justify-center shadow-[0_0_16px_rgba(242,202,80,0.3)]">
              <span className="font-headline text-lg font-bold text-on-primary">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg tracking-widest text-primary uppercase">Casino Clandestino</span>
              <span className="font-label text-[10px] font-bold uppercase tracking-widest text-outline">Halloween Party</span>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-[0_0_12px_rgba(242,202,80,0.15)]">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-label text-[11px] font-bold text-primary uppercase pl-1">Sólo con Invitación</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#itinerario" className="font-label text-[13px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors pb-1">
              Itinerario
            </a>
            <a href="#rsvp-form" className="font-label text-[13px] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors pb-1">
              Apostar Asistencia
            </a>
          </nav>
        </div>
      </header>

      <main className="w-full pt-20">
        {/* HERO */}
        <section className="relative w-full min-h-[88vh] flex flex-col justify-between items-center text-center px-6 pt-12 pb-12 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-primary-container/10 rounded-full blur-[140px]" />
          <div className="pointer-events-none absolute top-[420px] -right-40 w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[160px]" />

          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low/90 shadow-[0_0_20px_rgba(242,202,80,0.15)] mb-4">
            <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
            <span className="font-label text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Gran Gala Subterránea • Halloween</span>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-48 h-6 mb-2 text-primary/70">
              <svg className="w-full h-full" fill="none" viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0 L104 8 L120 12 L104 16 L100 24 L96 16 L80 12 L96 8 Z" fill="currentColor" />
                <path d="M20 12 H75 M125 12 H180" stroke="currentColor" strokeWidth="1" />
                <circle cx="10" cy="12" fill="currentColor" r="2" />
                <circle cx="190" cy="12" fill="currentColor" r="2" />
              </svg>
            </div>
            <h1 className="font-headline text-[42px] sm:text-[56px] lg:text-[68px] leading-tight text-transparent bg-clip-text bg-gradient-to-b from-primary-fixed via-primary to-on-primary-container uppercase tracking-wider drop-shadow-2xl">
              Casino Clandestino
            </h1>
            <p className="font-headline text-2xl text-primary-fixed/90 tracking-widest mt-2 uppercase">Halloween Party</p>
            <div className="w-24 h-[2px] bg-primary/40 my-4" />
            <p className="font-label text-base max-w-2xl text-on-surface-variant italic font-light">
              "Una noche de disfraces, misterio y grandes apuestas tras las cortinas de la Ley Seca."
            </p>

            {/* Event coordinates */}
            <div className="mt-8 w-full max-w-3xl p-4 rounded-xl bg-surface-container/80 backdrop-blur-md shadow-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/30 text-center">
                <div className="flex flex-col items-center py-2 px-2">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-1">calendar_month</span>
                  <span className="font-label text-[10px] font-bold text-outline uppercase tracking-widest">Fecha</span>
                  <span className="font-label text-base text-on-surface font-semibold mt-1">{EVENTO.fechaLarga}</span>
                </div>
                <div className="flex flex-col items-center py-2 px-2">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-1">schedule</span>
                  <span className="font-label text-[10px] font-bold text-outline uppercase tracking-widest">Hora</span>
                  <span className="font-label text-base text-on-surface font-semibold mt-1">{EVENTO.hora}</span>
                </div>
                <div className="flex flex-col items-center py-2 px-2">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-1">location_on</span>
                  <span className="font-label text-[10px] font-bold text-outline uppercase tracking-widest">Sede</span>
                  <span className="font-label text-base text-on-surface font-semibold mt-1">{EVENTO.lugar}</span>
                </div>
                <div className="flex flex-col items-center py-2 px-2">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-1">payments</span>
                  <span className="font-label text-[10px] font-bold text-outline uppercase tracking-widest">Cover</span>
                  <span className="font-label text-base text-on-surface font-semibold mt-1">{EVENTO.cover}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#rsvp-form"
                className="group relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary-container via-primary to-primary-fixed text-on-primary font-label text-[13px] font-bold uppercase tracking-[0.18em] shadow-[0_4px_24px_rgba(242,202,80,0.35)] hover:shadow-[0_4px_32px_rgba(242,202,80,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-45">poker_chip</span>
                <span>Apostar mi Asistencia</span>
              </a>
              <a
                href="#itinerario"
                className="px-6 py-2.5 rounded-lg bg-surface-container-high/60 backdrop-blur-md text-primary font-label text-[13px] font-bold uppercase tracking-[0.18em] hover:bg-surface-container-highest hover:text-primary-fixed transition-all duration-300 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">style</span>
                <span>Conocer el Itinerario</span>
              </a>
            </div>
          </div>

          <a href="#itinerario" aria-label="Deslizar a la sección de itinerario" className="relative z-10 mt-6 animate-bounce opacity-70 text-primary flex flex-col items-center">
            <span className="font-label text-[10px] font-bold uppercase tracking-widest mb-1">La Mano de la Noche</span>
            <span className="material-symbols-outlined">expand_more</span>
          </a>
        </section>

        {/* ITINERARIO */}
        <section id="itinerario" className="relative w-full max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-secondary text-lg">♠</span>
              <span className="text-primary text-lg">♦</span>
              <span className="text-secondary text-lg">♥</span>
              <span className="text-primary text-lg">♣</span>
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed via-primary to-primary-container uppercase tracking-wider">
              La Mano de la Noche
            </h2>
            <p className="font-label text-[11px] font-bold text-outline uppercase tracking-[0.2em] mt-2">
              5 Naipes de Destino • Itinerario Clandestino
            </p>
            <div className="w-16 h-[2px] bg-primary/40 mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {ITINERARIO.map((item) => {
              const accent = ACCENT_CLASSES[item.accent];
              return (
                <div
                  key={item.titulo}
                  className={`group relative flex flex-col justify-between h-[400px] p-4 rounded-xl shadow-xl hover:-translate-y-2 hover:shadow-[0_12px_36px_rgba(242,202,80,0.25)] transition-all duration-300 ${
                    item.spotlight ? "bg-surface-container-high/90 lg:-translate-y-2 shadow-2xl" : "bg-surface-container/70"
                  } backdrop-blur-lg`}
                >
                  {item.spotlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label text-[9px] tracking-widest uppercase font-bold shadow-md whitespace-nowrap">
                      Acto Principal
                    </div>
                  )}
                  <div className={`flex flex-col items-start leading-none ${accent.text}`}>
                    <span className="font-headline text-2xl font-bold">{item.rank}</span>
                    <span className="text-xl -mt-1">{item.suit}</span>
                  </div>
                  <div className="relative my-auto flex flex-col items-center text-center z-10">
                    <div className={`w-12 h-12 rounded-full ${accent.bg} flex items-center justify-center ${accent.text} shadow-inner mb-3`}>
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>
                    <span className={`font-label text-[11px] font-bold ${accent.text} uppercase tracking-widest`}>{item.hora}</span>
                    <h3 className="font-headline text-xl text-on-surface mt-1 leading-snug">{item.titulo}</h3>
                    <div className="w-8 h-[1px] bg-outline-variant/60 my-2" />
                    <p className="font-label text-[13px] text-on-surface-variant/80 leading-relaxed">{item.descripcion}</p>
                  </div>
                  <div className={`flex flex-col items-end leading-none ${accent.text} rotate-180`}>
                    <span className="font-headline text-2xl font-bold">{item.rank}</span>
                    <span className="text-xl -mt-1">{item.suit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CASA / REGLAS */}
        <section className="relative w-full py-6 px-6">
          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest">
            <div className="min-h-64 sm:min-h-80 w-full relative flex items-center py-10">
              <div className="absolute inset-0 opacity-30" aria-hidden="true">
                <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="#f2ca50" strokeWidth="0.5" fill="none">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <path key={i} d={`M${i * 40} 0 L${i * 40 + 20} 200`} />
                    ))}
                  </g>
                </svg>
              </div>
              <div className="relative z-10 flex flex-col justify-center px-8 max-w-xl">
                <span className="font-label text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Reglas de la Casa</span>
                <h4 className="font-headline text-2xl text-on-surface">Código de Máscara & Discreción</h4>
                <p className="font-label text-sm text-on-surface-variant mt-2">
                  Disfraz obligatorio de rigor. Lista de invitados cerrada — cada asistente representa a la casa con etiqueta speakeasy de 1920.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP FORM */}
        <section id="rsvp-form" className="relative w-full max-w-4xl mx-auto px-6 py-12">
          <div className="relative rounded-2xl p-6 sm:p-10 bg-surface-container-low shadow-[0_24px_64px_rgba(0,0,0,0.9),0_0_40px_rgba(242,202,80,0.08)]">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary-container to-surface-container-highest p-0.5 shadow-[0_0_24px_rgba(242,202,80,0.3)] mb-3 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[28px]">poker_chip</span>
                </div>
              </div>
              <span className="font-label text-[11px] font-bold text-primary uppercase tracking-[0.25em]">Mesa de Registro Oficial</span>
              <h2 className="font-headline text-3xl text-on-surface uppercase tracking-wider mt-1">Apostar Mi Asistencia</h2>
              <p className="font-label text-sm text-outline mt-2">
                Ayúdanos a calcular la mesa. Confirma tu lugar y el de tus acompañantes.
              </p>
            </div>

            <RsvpForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest mt-8">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(242,202,80,0.2)]">
            <span className="font-headline text-2xl text-primary font-bold">C</span>
          </div>
          <h3 className="font-headline text-xl uppercase tracking-widest text-primary mb-2">Casino Clandestino • Halloween</h3>
          <p className="font-label text-[11px] font-bold text-outline uppercase tracking-widest mb-6">Sociedad Secreta • Club Privado</p>
          <div className="max-w-2xl px-4 py-3 rounded-lg bg-surface-container-low mb-8">
            <p className="font-label text-sm text-on-surface-variant italic">
              Se exige estricta discreción y etiqueta speakeasy de 1920. Disfraz obligatorio para cruzar la trampilla.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="font-label text-[11px] font-bold uppercase text-outline">© Casino Clandestino</span>
            <span className="font-label text-[11px] font-bold uppercase text-outline">Estricto Derecho de Admisión</span>
            <span className="font-label text-[11px] font-bold uppercase text-outline">Pacto de Silencio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

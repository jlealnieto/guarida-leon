import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const EVENT = {
  nombre: 'Guarida Leon',
  fecha: '1 de noviembre',
  hora: '7:00 PM',
  lugar: 'Cr 7h bis #159-25',
  detalle: 'BYOD — trae tu propia bebida',
}

function App() {
  const [nombreFamilia, setNombreFamilia] = useState('')
  const [numIntegrantes, setNumIntegrantes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(null)
  const [registro, setRegistro] = useState([])
  const [cargandoRegistro, setCargandoRegistro] = useState(true)

  async function cargarRegistro() {
    setCargandoRegistro(true)
    const { data, error: err } = await supabase
      .from('familias')
      .select('nombre_familia, num_integrantes, created_at')
      .order('created_at', { ascending: true })
    if (!err && data) setRegistro(data)
    setCargandoRegistro(false)
  }

  useEffect(() => {
    cargarRegistro()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const nombre = nombreFamilia.trim()
    const integrantes = parseInt(numIntegrantes, 10)

    if (!nombre) {
      setError('Escribe el nombre de tu familia.')
      return
    }
    if (!integrantes || integrantes < 1) {
      setError('Indica cuántos integrantes van a participar.')
      return
    }

    setLoading(true)
    const { data, error: err } = await supabase.rpc('registrar_familia', {
      p_nombre_familia: nombre,
      p_num_integrantes: integrantes,
    })
    setLoading(false)

    if (err) {
      if (err.message?.includes('No hay temáticas disponibles')) {
        setError('Se agotaron las temáticas disponibles para ese número de integrantes. Escríbele a Sleal directamente.')
      } else {
        setError('Algo salió mal registrando tu familia. Intenta de nuevo.')
      }
      return
    }

    const fila = Array.isArray(data) ? data[0] : data
    setResultado(fila)
    cargarRegistro()
  }

  const categoriaLabel = {
    musica: 'Grupo musical',
    pelicula: 'Película',
    viejo_oeste: 'Viejo oeste',
    mixta: 'Especial',
  }

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />

      <header className="hero">
        <p className="hero-eyebrow">Fiesta de Halloween</p>
        <h1 className="hero-title">{EVENT.nombre}</h1>
        <p className="hero-tagline">Cada familia entra… y sale con un disfraz que no eligió.</p>
      </header>

      <section className="details" aria-label="Detalles del evento">
        <div className="detail-item">
          <span className="detail-label">Fecha</span>
          <span className="detail-value">{EVENT.fecha}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Hora</span>
          <span className="detail-value">{EVENT.hora}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Lugar</span>
          <span className="detail-value">{EVENT.lugar}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Detalle</span>
          <span className="detail-value">{EVENT.detalle}</span>
        </div>
      </section>

      {!resultado ? (
        <section className="form-section">
          <h2 className="section-title">Entra a la guarida</h2>
          <p className="section-sub">
            Dinos tu familia y cuántos van a disfrazarse. La guarida decide el resto.
          </p>

          <form onSubmit={handleSubmit} className="form">
            <label className="field">
              <span>Nombre de la familia</span>
              <input
                type="text"
                value={nombreFamilia}
                onChange={(e) => setNombreFamilia(e.target.value)}
                placeholder="Familia Leon"
                disabled={loading}
              />
            </label>

            <label className="field">
              <span>Integrantes que participan</span>
              <input
                type="number"
                min="1"
                value={numIntegrantes}
                onChange={(e) => setNumIntegrantes(e.target.value)}
                placeholder="4"
                disabled={loading}
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Consultando la guarida…' : 'Revelar mi destino'}
            </button>
          </form>
        </section>
      ) : (
        <section className="resultado" aria-live="polite">
          <p className="resultado-eyebrow">La guarida ha hablado</p>
          <p className="resultado-categoria">{categoriaLabel[resultado.categoria_tema] || 'Temática'}</p>
          <h2 className="resultado-tema">{resultado.tema_asignado}</h2>
          <p className="resultado-nota">
            Esta es la temática de disfraz para tu familia. Nos vemos el {EVENT.fecha} a las {EVENT.hora}.
          </p>
        </section>
      )}

      <section className="roster" aria-label="Familias registradas">
        <h3 className="roster-title">Quiénes ya se atrevieron</h3>
        {cargandoRegistro ? (
          <p className="roster-empty">Cargando…</p>
        ) : registro.length === 0 ? (
          <p className="roster-empty">Todavía nadie se ha registrado. Sé el primero.</p>
        ) : (
          <ul className="roster-list">
            {registro.map((f, i) => (
              <li key={i}>
                <span>{f.nombre_familia}</span>
                <span className="roster-count">{f.num_integrantes} personas</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="footer">
        <p>Guarida Leon · 1 de noviembre</p>
      </footer>
    </div>
  )
}

export default App

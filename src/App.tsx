import { useMemo, useState } from 'react'
import './App.css'

const prompts = [
  'Sleep quality',
  'Focus level',
  'Social battery',
  'Stress load',
  'Motivation',
]

function App() {
  const [mood, setMood] = useState('Steady')
  const [energy, setEnergy] = useState(6)
  const [note, setNote] = useState('')
  const [checked, setChecked] = useState<string[]>(['Focus level'])
  const [savedAt, setSavedAt] = useState('')

  const noteRemaining = 180 - note.length
  const energyPercent = energy * 10

  const status = useMemo(() => {
    if (energy >= 8) return 'Green'
    if (energy >= 5) return 'Amber'
    return 'Red'
  }, [energy])

  const togglePrompt = (value: string) => {
    setChecked((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const saveCheckIn = () => {
    const now = new Date()
    setSavedAt(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Tiny mood weather report</p>
        <h1>Mind Check</h1>
        <p className="lead">A quick sparkle scan before the day starts cartwheeling.</p>

        <div className="field-grid">
          <label className="field" htmlFor="mood">
            <span>How's your vibe?</span>
            <select id="mood" value={mood} onChange={(event) => setMood(event.target.value)}>
              <option>Steady</option>
              <option>Sunny</option>
              <option>Stormy</option>
              <option>Fizzing</option>
            </select>
          </label>

          <label className="field" htmlFor="energy">
            <span>Spark Battery: {energy}/10</span>
            <div className="battery-wrap" aria-hidden="true">
              <div className="battery-shell">
                <div className="battery-fill" style={{ width: `${energyPercent}%` }} />
                <div className="battery-segments">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span
                      key={index}
                      className={index < energy ? 'battery-cell battery-cell-on' : 'battery-cell'}
                    />
                  ))}
                </div>
              </div>
              <span className="battery-tip" />
            </div>
            <input
              id="energy"
              type="range"
              min={1}
              max={10}
              value={energy}
              aria-label="Energy level"
              onChange={(event) => setEnergy(Number(event.target.value))}
            />
          </label>
        </div>

        <fieldset className="prompt-group">
          <legend>Which gremlins are loud today?</legend>
          <div className="chips">
            {prompts.map((prompt) => {
              const active = checked.includes(prompt)
              return (
                <button
                  key={prompt}
                  type="button"
                  className={active ? 'chip chip-active' : 'chip'}
                  onClick={() => togglePrompt(prompt)}
                >
                  {prompt}
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className="field" htmlFor="note">
          <span>Brain confetti notes</span>
          <textarea
            id="note"
            maxLength={180}
            rows={4}
            value={note}
            placeholder="Tell future-you one tiny win to chase today..."
            onChange={(event) => setNote(event.target.value)}
          />
          <small>{noteRemaining} sparkles left</small>
        </label>

        <button type="button" className="save" onClick={saveCheckIn}>
          Pocket This Check-In
        </button>
        {savedAt ? <p className="saved">Stashed at {savedAt}</p> : null}
      </section>

      <aside className="summary">
        <p className="summary-title">Today's Sprinkle</p>
        <div className="meter">
          <span>Battery mood</span>
          <strong>{status}</strong>
        </div>
        <p>
          Vibe: <strong>{mood}</strong>
        </p>
        <p>
          Gremlins spotted: <strong>{checked.length}</strong>
        </p>
        <ul>
          {checked.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </main>
  )
}

export default App

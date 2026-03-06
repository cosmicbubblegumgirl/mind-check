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
        <p className="eyebrow">Daily check-in</p>
        <h1>Mind Check</h1>
        <p className="lead">Reset your headspace in under 60 seconds.</p>

        <div className="field-grid">
          <label className="field" htmlFor="mood">
            <span>Mood</span>
            <select id="mood" value={mood} onChange={(event) => setMood(event.target.value)}>
              <option>Steady</option>
              <option>Excited</option>
              <option>Anxious</option>
              <option>Overloaded</option>
            </select>
          </label>

          <label className="field" htmlFor="energy">
            <span>Energy: {energy}/10</span>
            <input
              id="energy"
              type="range"
              min={1}
              max={10}
              value={energy}
              onChange={(event) => setEnergy(Number(event.target.value))}
            />
          </label>
        </div>

        <fieldset className="prompt-group">
          <legend>What needs attention?</legend>
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
          <span>Notes</span>
          <textarea
            id="note"
            maxLength={180}
            rows={4}
            value={note}
            placeholder="One thing that would help today is..."
            onChange={(event) => setNote(event.target.value)}
          />
          <small>{noteRemaining} chars left</small>
        </label>

        <button type="button" className="save" onClick={saveCheckIn}>
          Save Check-In
        </button>
        {savedAt ? <p className="saved">Saved at {savedAt}</p> : null}
      </section>

      <aside className="summary">
        <p className="summary-title">Current Snapshot</p>
        <div className="meter">
          <span>Status</span>
          <strong>{status}</strong>
        </div>
        <p>
          Mood: <strong>{mood}</strong>
        </p>
        <p>
          Focus points: <strong>{checked.length}</strong>
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

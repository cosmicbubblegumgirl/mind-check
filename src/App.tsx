import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [mood, setMood] = useState('Calm')
  const [note, setNote] = useState('')

  const remaining = useMemo(() => 140 - note.length, [note.length])

  return (
    <main>
      <h1>Mind Check</h1>
      <p>Quick check-in before you start your day.</p>

      <div className="card">
        <label htmlFor="mood">Mood</label>
        <select id="mood" value={mood} onChange={(event) => setMood(event.target.value)}>
          <option>Calm</option>
          <option>Focused</option>
          <option>Stressed</option>
          <option>Tired</option>
        </select>

        <label htmlFor="note">One-line note</label>
        <textarea
          id="note"
          rows={4}
          maxLength={140}
          placeholder="What is on your mind right now?"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

        <p>
          Mood: <strong>{mood}</strong>
        </p>
        <p>
          Characters left: <strong>{remaining}</strong>
        </p>
      </div>

      <p className="read-the-docs">Save this file and HMR should update instantly.</p>
    </main>
  )
}

export default App

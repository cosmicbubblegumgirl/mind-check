import { useMemo, useState } from 'react'
import './App.css'

const prompts = [
  'Sleep quality',
  'Focus level',
  'Social battery',
  'Stress load',
  'Motivation',
]

const inspirations = [
  {
    name: 'Temple Grandin',
    area: 'Science & Engineering',
    accomplishment:
      'Redesigned humane livestock systems used across the cattle industry and became a leading autism advocate in science.',
    connection:
      'Temple Grandin has openly discussed lifelong anxiety and how neurodivergent thinking shaped her work.',
    quote: 'The world needs all kinds of minds.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Temple_Grandin_2011_Shankbone.JPG/512px-Temple_Grandin_2011_Shankbone.JPG',
  },
  {
    name: 'Richard Branson',
    area: 'Technology & Entrepreneurship',
    accomplishment:
      'Built the Virgin group, scaling businesses across airlines, telecom, and space technology ventures.',
    connection:
      'Richard Branson has publicly spoken about living with ADHD and using high-energy thinking to innovate.',
    quote: "Business opportunities are like buses, there's always another one coming.",
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Richard_Branson_cropped.jpg/512px-Richard_Branson_cropped.jpg',
  },
  {
    name: 'Nikola Tesla',
    area: 'Physics & Invention',
    accomplishment:
      'Pioneered alternating current power systems and key inventions that shaped modern electrical engineering.',
    connection:
      'Biographical accounts describe intense anxiety, sensory sensitivity, and obsessive routines in his daily life.',
    quote: 'The present is theirs; the future, for which I really worked, is mine.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/N.Tesla.JPG/512px-N.Tesla.JPG',
  },
  {
    name: 'Leonardo da Vinci',
    area: 'Math, Engineering & Invention',
    accomplishment:
      'Produced foundational work in anatomy, engineering sketches, and mathematical perspective centuries ahead of his time.',
    connection:
      'Some modern researchers argue his lifelong distractibility and unfinished projects align with ADHD-like patterns.',
    quote: 'Learning never exhausts the mind.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg/512px-Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg',
  },
  {
    name: 'Charles Darwin',
    area: 'Biology',
    accomplishment:
      'Developed the theory of evolution by natural selection, reshaping modern biology forever.',
    connection:
      'Historians and physicians have documented severe anxiety symptoms and panic-like episodes throughout his life.',
    quote:
      'A man who dares to waste one hour of time has not discovered the value of life.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Charles_Darwin_by_Julia_Margaret_Cameron_2.jpg/512px-Charles_Darwin_by_Julia_Margaret_Cameron_2.jpg',
  },
  {
    name: 'Dr. Edward Hallowell',
    area: 'Psychiatry & ADHD Research',
    accomplishment:
      'Helped popularize modern ADHD understanding through clinical work and bestselling mental health books.',
    connection:
      'As a psychiatrist, he has publicly shared his own ADHD diagnosis and how it affects focus, creativity, and anxiety.',
    quote: 'Never worry alone.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Edward_Hallowell_2015.jpg/512px-Edward_Hallowell_2015.jpg',
  },
]

function App() {
  const [mood, setMood] = useState('Steady')
  const [energy, setEnergy] = useState(6)
  const [note, setNote] = useState('')
  const [checked, setChecked] = useState<string[]>(['Focus level'])
  const [savedAt, setSavedAt] = useState('')

  const quizUrl = `${import.meta.env.BASE_URL}quiz-app/`
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
      <nav className="top-nav">
        <a href="#about">About Me</a>
        <a href="#checkin">Daily Spark Check</a>
        <a href="#inspiration">Proof We Can Shine</a>
        <a href={quizUrl}>Test App</a>
      </nav>

      <section id="about" className="panel hero-panel">
        <p className="eyebrow">Built by one beautifully busy brain, for another</p>
        <h1>Mind Check</h1>
        <p className="lead">
          Hi, I made this space as an about-me love note for brains like ours: creative, nonlinear,
          anxious sometimes, brilliant always. If you have ADHD, anxiety, or both, you are not
          broken. You are a whole galaxy trying to fit inside a calendar.
        </p>
        <p className="lead">
          This home page is our reminder that people like us are wildly capable of great things.
          We can build, discover, invent, and still need rest breaks and soft landings.
        </p>

        <div className="hero-actions">
          <a className="save launch" href="#checkin">
            Start My Spark Check
          </a>
          <a className="save launch alt" href={quizUrl}>
            Open My Test App
          </a>
        </div>
      </section>

      <section id="checkin" className="panel">
        <p className="eyebrow">Tiny mood weather report</p>
        <h2>Daily Spark Check</h2>
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

      <aside className="summary panel">
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

      <section id="inspiration" className="panel inspiration">
        <p className="eyebrow">Whimsical proof we belong here</p>
        <h2>Influential Minds in Science, Math, and Technology</h2>
        <p className="lead">
          These people are often discussed in relation to ADHD and/or anxiety. Their stories are a
          reminder that different wiring can still create world-shifting impact.
        </p>
        <p className="muted">
          Note: connections below are based on self-disclosure or historical biographical evidence,
          not retroactive diagnosis.
        </p>

        <div className="inspo-grid">
          {inspirations.map((person) => (
            <article key={person.name} className="inspo-card">
              <img src={person.image} alt={person.name} loading="lazy" />
              <div>
                <h3>{person.name}</h3>
                <p className="tagline">{person.area}</p>
                <p className="inspo-label">Accomplishment</p>
                <p className="muted">{person.accomplishment}</p>
                <p className="inspo-label">ADHD/Anxiety Connection</p>
                <p className="muted">{person.connection}</p>
                <blockquote>"{person.quote}"</blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App

import { type FormEvent, useEffect, useMemo, useState } from 'react'
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
    name: 'Nikola Tesla',
    area: 'Physics & Electrical Engineering',
    accomplishment:
      'Pioneered alternating current power systems and inventions that shaped modern electrical infrastructure.',
    connection:
      'Biographical accounts describe severe anxiety, sensory sensitivity, and obsessive routines throughout his life.',
    quote: 'The present is theirs; the future, for which I really worked, is mine.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/N.Tesla.JPG',
  },
  {
    name: 'Charles Darwin',
    area: 'Biology',
    accomplishment:
      'Developed the theory of evolution by natural selection, permanently reshaping biological science.',
    connection:
      'Historians and physicians have documented panic-like episodes and long-term anxiety symptoms in his journals and letters.',
    quote: 'A man who dares to waste one hour of time has not discovered the value of life.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/8a/Charles_Darwin_by_Julia_Margaret_Cameron_2.jpg',
  },
  {
    name: 'Alan Turing',
    area: 'Mathematics & Computer Science',
    accomplishment:
      'Founded theoretical computer science and helped crack Enigma code, changing WWII and modern computing.',
    connection:
      'Biographical records describe intense social anxiety and emotional strain alongside extraordinary analytical focus.',
    quote: 'Sometimes it is the people no one can imagine anything of who do the things no one can imagine.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
  },
  {
    name: 'Marie Curie',
    area: 'Physics & Chemistry',
    accomplishment:
      'Became the first person to win two Nobel Prizes in two different sciences and advanced research in radioactivity.',
    connection:
      'Historical sources note profound stress, exhaustion, and anxiety during years of high-stakes research and public scrutiny.',
    quote: 'Nothing in life is to be feared, it is only to be understood.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Marie_Curie_in_her_laboratory.jpg',
  },
  {
    name: 'Leonardo da Vinci',
    area: 'Math, Engineering & Invention',
    accomplishment:
      'Produced foundational work in anatomy, engineering design, and mathematical perspective centuries ahead of his era.',
    connection:
      'Some modern researchers suggest his distractibility and unfinished projects align with ADHD-like cognitive patterns.',
    quote: 'Learning never exhausts the mind.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/ec/Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg',
  },
  {
    name: 'Albert Einstein',
    area: 'Theoretical Physics',
    accomplishment:
      'Developed the theory of relativity and transformed how we understand space, time, and energy.',
    connection:
      'Many biographers note his lifelong anxiety, overwhelm, and intense rumination alongside periods of deep creativity.',
    quote: 'Imagination is more important than knowledge.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
  },
]

const aboutStory = [
  'I built this page as a home base for brains that do not move in straight lines.',
  'If you live with ADHD, anxiety, or that chaotic duet together, this is your reminder: your mind is not broken, dramatic, lazy, or too much.',
  'Your mind is adaptive, creative, sensitive, fast, and often carrying more than people can see.',
  'I know what it feels like to care deeply, think quickly, and still freeze when there are too many tabs open in your head. I know the guilt of starting ten things, the grief of finishing none, and the quiet fear that maybe everyone else got an instruction manual we never received.',
  'So I made one for us.',
  'This space is part check-in, part encouragement board, part proof that people with minds like ours have always changed the world. Not in spite of how we think, but often because of it.',
  'On days when your focus flickers, your chest feels heavy, or your confidence drops below 10 percent, come back here.',
  'Let this page say what your nervous system forgets:',
]

const reminders = [
  'You are still intelligent when you are overwhelmed.',
  'You are still capable when your energy is inconsistent.',
  'You are still worthy when your process looks different from everyone else.',
  'You are still becoming who you are meant to be.',
]

type CommunityPost = {
  id: number
  name: string
  text: string
  artLink: string
  createdAt: string
}

const boardStorageKey = 'mind-check-community-board-v1'

function App() {
  const [mood, setMood] = useState('Steady')
  const [energy, setEnergy] = useState(6)
  const [note, setNote] = useState('')
  const [checked, setChecked] = useState<string[]>(['Focus level'])
  const [savedAt, setSavedAt] = useState('')
  const [postName, setPostName] = useState('')
  const [postText, setPostText] = useState('')
  const [postArtLink, setPostArtLink] = useState('')
  const [posts, setPosts] = useState<CommunityPost[]>([])

  const quizUrl = `${import.meta.env.BASE_URL}quiz-app/`
  const noteRemaining = 180 - note.length
  const energyPercent = energy * 10

  const status = useMemo(() => {
    if (energy >= 8) return 'Green'
    if (energy >= 5) return 'Amber'
    return 'Red'
  }, [energy])

  useEffect(() => {
    const stored = localStorage.getItem(boardStorageKey)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as CommunityPost[]
      if (Array.isArray(parsed)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPosts(parsed)
      }
    } catch {
      localStorage.removeItem(boardStorageKey)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(boardStorageKey, JSON.stringify(posts))
  }, [posts])

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

  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanedText = postText.trim()
    if (!cleanedText) return

    const nextPost: CommunityPost = {
      id: Date.now(),
      name: postName.trim() || 'Anonymous Stargazer',
      text: cleanedText,
      artLink: postArtLink.trim(),
      createdAt: new Date().toLocaleString(),
    }

    setPosts((current) => [nextPost, ...current])
    setPostText('')
    setPostArtLink('')
  }

  return (
    <main className="page">
      <nav className="top-nav">
        <a href="#about">About Me</a>
        <a href="#checkin">Daily Spark Check</a>
        <a href="#inspiration">Proof We Can Shine</a>
        <a href="#community">Made by Minds Like Ours</a>
        <a href={quizUrl}>Test App</a>
      </nav>

      <section id="about" className="panel hero-panel">
        <p className="eyebrow">Built by one beautifully busy brain, for another</p>
        <h1>Mind Check</h1>
        <p className="creation-mark">
          QuantumCupcake Creation <span className="sparkle-star" aria-hidden="true">*</span>
        </p>

        {aboutStory.map((line) => (
          <p key={line} className="lead story-line">
            {line}
          </p>
        ))}
        <div className="reminder-list" aria-label="Mind reminders">
          {reminders.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

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

      <section id="community" className="panel community">
        <p className="eyebrow">A little board for our big brains</p>
        <h2>Made by Minds Like Ours</h2>
        <p className="lead">
          Post your weird thought, tiny win, art link, or soft reminder for someone else scrolling
          at 2am.
        </p>

        <form className="community-form" onSubmit={submitPost}>
          <label className="field" htmlFor="postName">
            <span>Name (optional)</span>
            <input
              id="postName"
              type="text"
              value={postName}
              maxLength={42}
              placeholder="Anonymous Stargazer"
              onChange={(event) => setPostName(event.target.value)}
            />
          </label>

          <label className="field" htmlFor="postText">
            <span>Share a thought</span>
            <textarea
              id="postText"
              rows={3}
              value={postText}
              maxLength={260}
              placeholder="Today I made tea before doom-scrolling and I am counting that as growth."
              onChange={(event) => setPostText(event.target.value)}
              required
            />
          </label>

          <label className="field" htmlFor="postArtLink">
            <span>Art or project link (optional)</span>
            <input
              id="postArtLink"
              type="url"
              value={postArtLink}
              placeholder="https://"
              onChange={(event) => setPostArtLink(event.target.value)}
            />
          </label>

          <button type="submit" className="save">
            Post to Community Board
          </button>
        </form>

        <article className="poem-card">
          <h3>For the Ones Written in Stardust and Static</h3>
          <p>
            You are not behind. You are not too much. You are not failing because your path has
            switchbacks.
          </p>
          <p>
            You are a constellation in motion, learning your own gravity while the world asks for
            straight lines.
          </p>
          <p>
            Keep going. Build gently. Rest without guilt. Return when you are ready. Your light was
            never meant to be ordinary.
          </p>
          <p className="poem-signature">-QuantumCupcake</p>
        </article>

        <div className="posts-grid" aria-live="polite">
          {posts.length === 0 ? (
            <p className="muted">No posts yet. Be the first kind spark on the board.</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="post-card">
                <p className="post-meta">
                  <strong>{post.name}</strong> <span>{post.createdAt}</span>
                </p>
                <p>{post.text}</p>
                {post.artLink ? (
                  <a href={post.artLink} target="_blank" rel="noreferrer">
                    View linked art/project
                  </a>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default App

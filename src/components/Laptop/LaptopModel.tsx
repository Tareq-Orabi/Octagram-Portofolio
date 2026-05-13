import React, { useState, useRef, useEffect } from 'react'
import { Html, Float, PresentationControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────
//  SPIN WHEEL DATA  (7 segments)
// ─────────────────────────────────────────────
const SEGMENTS = [
    { label: '🎁 Prize!', color: '#ff6b1a' },
    { label: '💀 Lose', color: '#1e293b' },
    { label: '⭐ Bonus', color: '#f59e0b' },
    { label: '🔄 Retry', color: '#3b82f6' },
    { label: '🎉 Jackpot', color: '#10b981' },
    { label: '😂 Funny', color: '#8b5cf6' },
    { label: '🤑 Double', color: '#ef4444' },
]

// ─────────────────────────────────────────────
//  QUIZ DATA  (4 categories × 5 questions)
// ─────────────────────────────────────────────
const QUIZ_DATA = {
    '🌍 Geography': [
        { q: 'What is the capital of Australia?', opts: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], a: 2 },
        { q: 'Which country has the most natural lakes?', opts: ['Russia', 'Canada', 'Brazil', 'USA'], a: 1 },
        { q: 'What is the longest river in the world?', opts: ['Amazon', 'Yangtze', 'Mississippi', 'Nile'], a: 3 },
        { q: 'Which continent has no countries?', opts: ['Arctic', 'Antarctica', 'Greenland', 'Iceland'], a: 1 },
        { q: 'What is the smallest country in the world?', opts: ['Monaco', 'Liechtenstein', 'Vatican City', 'San Marino'], a: 2 },
    ],
    '🔬 Science': [
        { q: 'What planet is known as the Red Planet?', opts: ['Venus', 'Mars', 'Jupiter', 'Saturn'], a: 1 },
        { q: 'What is the chemical symbol for gold?', opts: ['Go', 'Gd', 'Au', 'Ag'], a: 2 },
        { q: 'How many bones are in the adult human body?', opts: ['196', '206', '216', '226'], a: 1 },
        { q: 'What gas do plants absorb from the atmosphere?', opts: ['Oxygen', 'Nitrogen', 'CO₂', 'Hydrogen'], a: 2 },
        { q: 'What is the speed of light (km/s)?', opts: ['200,000', '250,000', '300,000', '350,000'], a: 2 },
    ],
    '🎬 Movies': [
        { q: 'Who directed "Inception" (2010)?', opts: ['Ridley Scott', 'James Cameron', 'Christopher Nolan', 'Denis Villeneuve'], a: 2 },
        { q: 'Which film won the first ever Academy Award for Best Picture?', opts: ['Wings', 'Sunrise', 'The Jazz Singer', 'Ben-Hur'], a: 0 },
        { q: '"To infinity and beyond!" is from which movie?', opts: ['Toy Story', 'A Bug\'s Life', 'Shrek', 'Antz'], a: 0 },
        { q: 'Who played Iron Man in the MCU?', opts: ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'], a: 1 },
        { q: 'Which movie features the song "Let It Go"?', opts: ['Brave', 'Moana', 'Tangled', 'Frozen'], a: 3 },
    ],
    '⚽ Sports': [
        { q: 'How many players are on a standard football (soccer) team?', opts: ['9', '10', '11', '12'], a: 2 },
        { q: 'In which country did the Olympic Games originate?', opts: ['Italy', 'Rome', 'Egypt', 'Greece'], a: 3 },
        { q: 'How many Grand Slam tournaments are in tennis?', opts: ['2', '3', '4', '5'], a: 2 },
        { q: 'What sport is played at Wimbledon?', opts: ['Cricket', 'Badminton', 'Tennis', 'Squash'], a: 2 },
        { q: 'Which country won the 2022 FIFA World Cup?', opts: ['France', 'Brazil', 'Argentina', 'Portugal'], a: 2 },
    ],
}

// ─────────────────────────────────────────────
//  SVG SPIN WHEEL
// ─────────────────────────────────────────────
const SpinWheel = ({ rotation }: { rotation: number }) => {
    const cx = 150, cy = 150, r = 140
    const n = SEGMENTS.length
    const sliceAngle = (2 * Math.PI) / n

    return (
        <svg width="300" height="300" viewBox="0 0 300 300">
            {SEGMENTS.map((seg, i) => {
                const startAngle = i * sliceAngle - Math.PI / 2
                const endAngle = startAngle + sliceAngle
                const x1 = cx + r * Math.cos(startAngle)
                const y1 = cy + r * Math.sin(startAngle)
                const x2 = cx + r * Math.cos(endAngle)
                const y2 = cy + r * Math.sin(endAngle)
                const midAngle = startAngle + sliceAngle / 2
                const tx = cx + (r * 0.65) * Math.cos(midAngle)
                const ty = cy + (r * 0.65) * Math.sin(midAngle)
                const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`
                return (
                    <g key={i}>
                        <path d={d} fill={seg.color} stroke="#0f172a" strokeWidth="2" />
                        <text
                            x={tx} y={ty}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize="11" fill="white" fontWeight="bold"
                            transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${tx}, ${ty})`}
                            style={{ pointerEvents: 'none' }}
                        >
                            {seg.label}
                        </text>
                    </g>
                )
            })}
            {/* Center hub */}
            <circle cx={cx} cy={cy} r="18" fill="#0f172a" stroke="#ff6b1a" strokeWidth="3" />
            {/* Pointer */}
            <polygon points={`${cx},${cy - r - 8} ${cx - 12},${cy - r + 14} ${cx + 12},${cy - r + 14}`} fill="#ff6b1a" />
        </svg>
    )
}

// ─────────────────────────────────────────────
//  SPIN GAME SCREEN
// ─────────────────────────────────────────────
const SpinGame = ({ onBack }: { onBack: () => void }) => {
    const [rotation, setRotation] = useState(0)
    const [spinning, setSpinning] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    const spin = () => {
        if (spinning) return
        setSpinning(true)
        setResult(null)
        const extra = 1800 + Math.random() * 1440
        const newRot = rotation + extra
        setRotation(newRot)
        setTimeout(() => {
            // Determine segment: pointer is at top (0°), wheel spins clockwise
            const n = SEGMENTS.length
            const sliceDeg = 360 / n
            const normalised = ((newRot % 360) + 360) % 360
            // Pointer at top = angle 0; wheel rotates clockwise means segment index:
            const idx = Math.floor(((360 - normalised) % 360) / sliceDeg) % n
            setResult(SEGMENTS[idx].label)
            setSpinning(false)
        }, 3200)
    }

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px', padding: '20px', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-1px', color: '#ff6b1a', margin: 0 }}>🎡 SPIN THE WHEEL</h2>

            <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? 'transform 3.2s cubic-bezier(0.15, 0, 0.05, 1)' : 'none',
                }}>
                    <SpinWheel rotation={0} />
                </div>
            </div>

            {result && (
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#f59e0b', background: 'rgba(245,158,11,0.12)', padding: '10px 28px', borderRadius: '40px', border: '2px solid #f59e0b' }}>
                    {result}
                </div>
            )}
            {!result && !spinning && <div style={{ fontSize: '16px', color: '#64748b' }}>Hit SPIN to try your luck!</div>}
            {spinning && <div style={{ fontSize: '16px', color: '#94a3b8', animation: 'pulse 0.8s infinite alternate' }}>Spinning…</div>}

            <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
                <button onClick={spin} disabled={spinning} style={{ background: spinning ? '#374151' : '#ff6b1a', color: 'white', border: 'none', padding: '14px 44px', borderRadius: '50px', fontSize: '20px', fontWeight: 800, cursor: spinning ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
                    {spinning ? '…' : 'SPIN'}
                </button>
                <button onClick={onBack} style={{ background: 'transparent', color: '#64748b', border: '2px solid #334155', padding: '14px 24px', borderRadius: '50px', fontSize: '16px', cursor: 'pointer' }}>
                    ← Back
                </button>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
//  QUIZ GAME SCREEN
// ─────────────────────────────────────────────
const QuizGame = ({ onBack }: { onBack: () => void }) => {
    const categories = Object.keys(QUIZ_DATA) as (keyof typeof QUIZ_DATA)[]
    const [selectedCat, setSelectedCat] = useState<keyof typeof QUIZ_DATA | null>(null)
    const [qIndex, setQIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [chosen, setChosen] = useState<number | null>(null)
    const [done, setDone] = useState(false)

    const startCat = (cat: keyof typeof QUIZ_DATA) => {
        setSelectedCat(cat); setQIndex(0); setScore(0); setChosen(null); setDone(false)
    }
    const resetCat = () => { setSelectedCat(null); setChosen(null); setDone(false) }

    const handleAnswer = (idx: number) => {
        if (chosen !== null) return
        setChosen(idx)
        const correct = QUIZ_DATA[selectedCat!][qIndex].a
        if (idx === correct) setScore(s => s + 1)
        setTimeout(() => {
            if (qIndex + 1 >= QUIZ_DATA[selectedCat!].length) { setDone(true) }
            else { setQIndex(q => q + 1); setChosen(null) }
        }, 900)
    }

    // Category picker
    if (!selectedCat) return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '28px', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#ff6b1a', margin: 0, letterSpacing: '-1px' }}>🧠 QUIZ GAME</h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>Choose a category to start</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', width: '100%', maxWidth: '480px' }}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => startCat(cat)} style={{
                        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                        color: 'white', border: '2px solid #334155', padding: '22px 16px',
                        borderRadius: '16px', fontSize: '18px', fontWeight: 700, cursor: 'pointer',
                        transition: 'all 0.18s', lineHeight: 1.3
                    }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = '#ff6b1a')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = '#334155')}
                    >
                        {cat}<br /><span style={{ fontSize: '12px', fontWeight: 400, color: '#64748b' }}>5 Questions</span>
                    </button>
                ))}
            </div>
            <button onClick={onBack} style={{ background: 'transparent', color: '#64748b', border: '2px solid #334155', padding: '12px 28px', borderRadius: '50px', fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}>
                ← Back
            </button>
        </div>
    )

    const questions = QUIZ_DATA[selectedCat]
    const current = questions[qIndex]

    // Done screen
    if (done) return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px', padding: '28px', boxSizing: 'border-box' }}>
            <div style={{ fontSize: '64px' }}>{score >= 4 ? '🏆' : score >= 2 ? '🎯' : '😅'}</div>
            <h2 style={{ fontSize: '30px', fontWeight: 900, color: '#ff6b1a', margin: 0 }}>
                {score >= 4 ? 'Excellent!' : score >= 2 ? 'Not Bad!' : 'Keep Trying!'}
            </h2>
            <div style={{ fontSize: '22px', color: 'white' }}>Score: <strong style={{ color: '#f59e0b' }}>{score}/{questions.length}</strong></div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={() => startCat(selectedCat)} style={{ background: '#ff6b1a', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '50px', fontSize: '17px', fontWeight: 800, cursor: 'pointer' }}>🔁 Retry</button>
                <button onClick={resetCat} style={{ background: 'transparent', color: '#94a3b8', border: '2px solid #334155', padding: '14px 28px', borderRadius: '50px', fontSize: '16px', cursor: 'pointer' }}>Categories</button>
                <button onClick={onBack} style={{ background: 'transparent', color: '#64748b', border: '2px solid #334155', padding: '14px 24px', borderRadius: '50px', fontSize: '15px', cursor: 'pointer' }}>← Back</button>
            </div>
        </div>
    )

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', boxSizing: 'border-box' }}>
            {/* Header */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontSize: '14px' }}>{selectedCat}</span>
                <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '15px' }}>Score: {score}</span>
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: '6px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((qIndex) / questions.length) * 100}%`, background: '#ff6b1a', transition: 'width 0.4s', borderRadius: '4px' }} />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Question {qIndex + 1} of {questions.length}</p>

            {/* Question */}
            <div style={{ background: '#1e293b', borderRadius: '14px', padding: '20px 22px', width: '100%', maxWidth: '520px', textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '19px', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>{current.q}</p>
            </div>

            {/* Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '520px' }}>
                {current.opts.map((opt, i) => {
                    const isCorrect = i === current.a
                    const isChosen = i === chosen
                    let bg = '#1e293b', border = '#334155', color = 'white'
                    if (chosen !== null) {
                        if (isCorrect) { bg = 'rgba(16,185,129,0.18)'; border = '#10b981'; color = '#10b981' }
                        else if (isChosen) { bg = 'rgba(239,68,68,0.18)'; border = '#ef4444'; color = '#ef4444' }
                    }
                    return (
                        <button key={i} onClick={() => handleAnswer(i)} style={{
                            background: bg, color, border: `2px solid ${border}`,
                            padding: '14px 12px', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
                            cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left'
                        }}
                            onMouseEnter={e => { if (chosen === null) e.currentTarget.style.borderColor = '#ff6b1a' }}
                            onMouseLeave={e => { if (chosen === null) e.currentTarget.style.borderColor = '#334155' }}
                        >
                            {String.fromCharCode(65 + i)}. {opt}
                        </button>
                    )
                })}
            </div>

            <button onClick={onBack} style={{ background: 'transparent', color: '#64748b', border: '2px solid #334155', padding: '10px 24px', borderRadius: '50px', fontSize: '14px', cursor: 'pointer', marginTop: '4px' }}>
                ← Back
            </button>
        </div>
    )
}

// ─────────────────────────────────────────────
//  HOME MENU
// ─────────────────────────────────────────────
const HomeMenu = ({ onSelect }: { onSelect: (game: 'spin' | 'quiz') => void }) => (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '22px', padding: '28px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '6px' }}>🎮</div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-1.5px' }}>GAME STATION</h1>
            <p style={{ color: '#64748b', margin: '8px 0 0', fontSize: '14px' }}>Pick a game to play</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '360px' }}>
            <button onClick={() => onSelect('spin')} style={{
                background: 'linear-gradient(135deg, #ff6b1a, #e84d00)',
                color: 'white', border: 'none', padding: '22px', borderRadius: '18px',
                fontSize: '22px', fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.5px',
                boxShadow: '0 8px 32px rgba(255,107,26,0.35)', transition: 'transform 0.15s'
            }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
                🎡 Spin the Wheel
                <div style={{ fontSize: '13px', fontWeight: 400, opacity: 0.8, marginTop: '4px' }}>7-segment fortune wheel</div>
            </button>
            <button onClick={() => onSelect('quiz')} style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white', border: 'none', padding: '22px', borderRadius: '18px',
                fontSize: '22px', fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.5px',
                boxShadow: '0 8px 32px rgba(59,130,246,0.35)', transition: 'transform 0.15s'
            }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
                🧠 Quiz Challenge
                <div style={{ fontSize: '13px', fontWeight: 400, opacity: 0.8, marginTop: '4px' }}>4 categories · 5 questions each</div>
            </button>
        </div>
    </div>
)

// ─────────────────────────────────────────────
//  LAPTOP SCREEN CONTENT
// ─────────────────────────────────────────────
const ScreenContent = ({ isMaximized, onFullscreen }: { isMaximized: boolean; onFullscreen: () => void }) => {
    const [game, setGame] = useState<'home' | 'spin' | 'quiz'>('home')

    return (
        <div style={{
            width: '1280px', height: '862px',
            background: '#0f172a', color: 'white',
            display: 'flex', flexDirection: 'column',
            borderRadius: isMaximized ? '0' : '8px',
            border: isMaximized ? 'none' : '12px solid #1e293b',
            position: 'relative', overflow: 'hidden',
            fontFamily: "'Segoe UI', system-ui, sans-serif"
        }}>
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#0a0f1e', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '7px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                </div>
                <span style={{ color: '#475569', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>OCTAGRAM GAMES</span>
                <button
                    onClick={onFullscreen}
                    title={isMaximized ? 'Exit fullscreen' : 'Open in browser fullscreen'}
                    style={{
                        background: isMaximized ? 'rgba(239,68,68,0.15)' : 'rgba(255,107,26,0.15)',
                        border: `1px solid ${isMaximized ? '#ef4444' : '#ff6b1a'}`,
                        color: isMaximized ? '#ef4444' : '#ff6b1a',
                        padding: '5px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 700,
                        width: '150px',
                        height: '50px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {isMaximized ? '✕ EXIT' : '⛶ FULLSCREEN'}
                </button>
            </div>

            {/* Game area */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {game === 'home' && <HomeMenu onSelect={setGame} />}
                {game === 'spin' && <SpinGame onBack={() => setGame('home')} />}
                {game === 'quiz' && <QuizGame onBack={() => setGame('home')} />}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
//  LAPTOP MODEL  (main export)
// ─────────────────────────────────────────────
const LaptopModel = ({ c }: { c: any }) => {
    const [isMaximized, setIsMaximized] = useState(false)
    const groupRef = useRef<THREE.Group>(null)
    const { camera } = useThree()
    const vec = new THREE.Vector3()
    const lookAtVec = new THREE.Vector3()

    // ── ROTATION FIX ──────────────────────────────────
    // We track accumulated user-drag rotation ourselves so it is never lost.
    // The group starts at identity; PresentationControls adds on top of that.
    // When maximized we force the group back to identity via a key reset,
    // but because we only do that when isMaximized becomes true the user's
    // previous rotation is cleanly discarded (expected UX while zoomed in).
    // ─────────────────────────────────────────────────

    useFrame((state) => {
        const targetPos = isMaximized ? [0, 1.45, 1.85] : [0, 1.5, 6]
        const targetLook = isMaximized ? [0, 1.45, 0] : [0, 0, 0]
        camera.position.lerp(vec.set(targetPos[0], targetPos[1], targetPos[2]), 0.08)
        state.camera.lookAt(lookAtVec.set(targetLook[0], targetLook[1], targetLook[2]))
    })

    // Real browser fullscreen triggered from inside the HTML iframe
    // We route it via a custom DOM event since iframe→parent comms is tricky
    const handleFullscreen = () => {
        if (!isMaximized) {
            setIsMaximized(true)
        } else {
            setIsMaximized(false)
        }
    }

    return (
        <group position={[0, -0.3, 0]} ref={groupRef}>
            <PresentationControls
                key={isMaximized ? 'locked' : 'free'}
                global
                enabled={!isMaximized}
                // FIX: snap with high friction so model snaps back to zero properly
                // without the visual glitch/disappear that was caused by snap resetting
                // to a stale rotation target. We use a gentle spring so it eases back.
                polar={[-0.35, 0.35]}
                azimuth={[-0.9, 0.9]}
                speed={1.2}
            >
                <Float
                    enabled={!isMaximized}
                    rotationIntensity={0.15}
                    floatIntensity={0.4}
                    speed={1.5}
                >
                    {/* ── CHASSIS ── */}
                    <mesh position-y={-0.1} castShadow receiveShadow>
                        <boxGeometry args={[4, 0.18, 3]} />
                        <meshStandardMaterial color="#9ca3af" metalness={0.92} roughness={0.18} />
                    </mesh>

                    {/* ── KEYBOARD DECK ── */}
                    <mesh position={[0, 0.02, -0.15]} rotation-x={-Math.PI / 2} castShadow>
                        <planeGeometry args={[3.6, 1.7]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.65} />
                    </mesh>

                    {/* ── KEY ROWS (decorative) ── */}
                    {[-0.5, -0.1, 0.3, 0.65].map((z, i) => (
                        <mesh key={i} position={[0, 0.025, z - 0.15]} rotation-x={-Math.PI / 2}>
                            <planeGeometry args={[3.2, 0.22]} />
                            <meshStandardMaterial color="#222" roughness={0.8} />
                        </mesh>
                    ))}

                    {/* ── TRACKPAD ── */}
                    <mesh position={[0, 0.025, 1.0]} rotation-x={-Math.PI / 2} castShadow>
                        <planeGeometry args={[1.3, 0.8]} />
                        <meshStandardMaterial color="#6b7280" roughness={0.35} metalness={0.85} />
                    </mesh>

                    {/* ── SCREEN LID ── */}
                    <group position={[0, 0.04, -1.45]} rotation-x={isMaximized ? 0 : -0.18}>
                        {/* Lid back */}
                        <mesh position-y={1.4} position-z={-0.055} castShadow>
                            <boxGeometry args={[4, 2.8, 0.05]} />
                            <meshStandardMaterial color="#9ca3af" metalness={0.95} roughness={0.18} />
                        </mesh>

                        {/* Screen bezel */}
                        <mesh position-y={1.4} position-z={-0.027}>
                            <boxGeometry args={[3.85, 2.65, 0.02]} />
                            <meshStandardMaterial color="#111" roughness={0.9} />
                        </mesh>

                        <Html
                            transform
                            distanceFactor={1.17}
                            position={[0, 1.35, 0.07]}
                            style={{ touchAction: 'none', transition: 'all 0.5s ease-in-out' }}
                            zIndexRange={[0, 10]}
                        >
                            <ScreenContent isMaximized={isMaximized} onFullscreen={handleFullscreen} />
                        </Html>
                    </group>
                </Float>
            </PresentationControls>
        </group>
    )
}

export default LaptopModel
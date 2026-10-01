"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ========== VERSION ==========
const APP_VERSION = "1.3.0";
const APP_UPDATES =
  "Dragon Ball + MHA S1-4 • Smarter Imposter anti-repeat • New Phone Imposter mode (Easy/Med/Hard + Speed) • TV-friendly";

// ========== WORD BANKS ==========
const WORD_BANKS: Record<string, string[]> = {
  Naruto: [
    "Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno", "Kakashi Hatake", "Sai", "Yamato",
    "Hinata Hyuga", "Kiba Inuzuka", "Shino Aburame", "Shikamaru Nara", "Ino Yamanaka", "Choji Akimichi",
    "Rock Lee", "Neji Hyuga", "Tenten", "Might Guy", "Jiraiya", "Tsunade", "Orochimaru",
    "Hiruzen Sarutobi", "Minato Namikaze", "Kushina Uzumaki", "Hashirama Senju", "Tobirama Senju",
    "Itachi Uchiha", "Obito Uchiha", "Madara Uchiha", "Shisui Uchiha", "Gaara", "Temari", "Kankuro",
    "Pain", "Nagato", "Konan", "Kisame Hoshigaki", "Deidara", "Sasori", "Hidan", "Kakuzu",
    "Karin", "Suigetsu Hozuki", "Jugo", "Kimimaro", "Killer Bee", "A (Raikage)", "Mei Terumi",
    "Zabuza Momochi", "Haku", "Onoki", "Kabuto Yakushi", "Iruka Umino", "Konohamaru Sarutobi",
    "Anko Mitarashi", "Shizune", "Kaguya Otsutsuki", "Rin Nohara", "Danzo Shimura", "Yahiko",
  ],
  "Hunter x Hunter": [
    "Gon Freecss", "Killua Zoldyck", "Kurapika", "Leorio Paradinight", "Hisoka Morow",
    "Illumi Zoldyck", "Alluka Zoldyck", "Silva Zoldyck", "Zeno Zoldyck", "Chrollo Lucilfer",
    "Feitan Portor", "Phinks Magcub", "Machi Komacine", "Shalnark", "Pakunoda", "Uvogin",
    "Nobunaga Hazama", "Isaac Netero", "Ging Freecss", "Biscuit Krueger", "Kite",
    "Knuckle Bine", "Morel Mackernasey", "Meruem", "Neferpitou", "Shaiapouf", "Menthuthuyoupi",
    "Palm Siberia", "Meleoron", "Pariston Hill", "Wing", "Hanzo", "Genthru", "Melody",
  ],
  "Attack on Titan": [
    "Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi Ackerman", "Erwin Smith",
    "Hange Zoe", "Jean Kirstein", "Connie Springer", "Sasha Blouse", "Historia Reiss",
    "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart", "Zeke Yeager", "Pieck Finger",
    "Falco Grice", "Gabi Braun", "Kenny Ackerman", "Grisha Yeager", "Dot Pixis",
    "Ymir", "Marco Bott", "Floch Forster", "Onyankopon", "Yelena", "Keith Shadis",
    "Petra Ral", "Moblit Berner", "Hannes",
  ],
  SpongeBob: [
    "SpongeBob SquarePants", "Patrick Star", "Squidward Tentacles", "Mr. Krabs",
    "Plankton", "Sandy Cheeks", "Gary the Snail", "Mrs. Puff", "Pearl Krabs",
    "Larry the Lobster", "Mermaid Man", "Barnacle Boy", "Karen Plankton",
    "Bubble Bass", "Man Ray", "Flying Dutchman", "King Neptune", "Squilliam Fancyson",
    "Dirty Bubble", "Patchy the Pirate",
  ],
  Mario: [
    "Mario", "Luigi", "Princess Peach", "Bowser", "Yoshi", "Toad",
    "Princess Daisy", "Wario", "Waluigi", "Rosalina", "Donkey Kong",
    "Diddy Kong", "Birdo", "Toadette", "Bowser Jr.", "Kamek",
    "King Boo", "Pauline", "Captain Toad", "Nabbit", "Toadsworth",
    "Peach", "Daisy", "DK", "Boo",
  ],
  "Dragon Ball": [
    "Goku", "Vegeta", "Gohan", "Piccolo", "Krillin", "Bulma", "Trunks", "Goten",
    "Frieza", "Cell", "Majin Buu", "Beerus", "Whis", "Broly", "Hit",
    "Android 17", "Android 18", "Android 16", "Tien", "Yamcha", "Master Roshi",
    "Chi-Chi", "Videl", "Mr. Satan", "Dende", "King Kai", "Supreme Kai",
    "Zamasu", "Goku Black", "Jiren", "Toppo", "Dyspo", "Kefla", "Caulifla",
    "Kale", "Cabba", "Frost", "Champa", "Vados", "Grand Zeno", "Future Trunks",
    "Bardock", "Raditz", "Nappa", "Dodoria", "Zarbon", "Captain Ginyu",
    "Jeice", "Burter", "Recoome", "Guldo", "King Cold", "Cooler",
    "Super Buu", "Kid Buu", "Fat Buu", "Gotenks", "Vegito", "Gogeta",
    "Shenron", "Porunga", "Launch", "Oolong", "Puar", "Yajirobe",
  ],
  "My Hero Academia": [
    "Izuku Midoriya", "Katsuki Bakugo", "Ochaco Uraraka", "Shoto Todoroki",
    "Tenya Ida", "Momo Yaoyorozu", "Tsuyu Asui", "Eijiro Kirishima",
    "Denki Kaminari", "Kyoka Jiro", "Mina Ashido", "Fumikage Tokoyami",
    "Mezo Shoji", "Hanta Sero", "Minoru Mineta", "Yuga Aoyama",
    "Mashirao Ojiro", "Rikido Sato", "Koji Koda", "Toru Hagakure",
    "All Might", "Shota Aizawa", "Present Mic", "Midnight", "Cementoss",
    "Ectoplasm", "Thirteen", "Nezu", "Recovery Girl", "Gran Torino",
    "Endeavor", "Best Jeanist", "Edgeshot", "Kamui Woods", "Mt. Lady",
    "Gang Orca", "Fat Gum", "Mirko", "Hawks",
    "Tomura Shigaraki", "Kurogiri", "Himiko Toga", "Dabi", "Twice",
    "Spinner", "Mr. Compress", "Magne", "Muscular", "Moonfish",
    "Nomu", "Stain", "Overhaul", "Chronostasis", "Mimic",
    "Mirio Togata", "Tamaki Amajiki", "Nejire Hado", "Sir Nighteye",
    "Eri", "Shin Nemoto", "Rappa",
  ],
};

const AVATARS = ["🦊", "⚡", "🗡️", "🧽", "🍄", "🔥", "👻", "🐉", "⭐", "🎯", "🎮", "💫", "💥", "🦸"];

const CLUE_TEMPLATES = {
  easy: [
    (c: string) => `This character is from the ${c} universe.`,
    (c: string) => `Most fans of ${c} know this character very well.`,
    () => `They are one of the more popular / main characters.`,
    () => `You would probably recognize them from the poster or opening.`,
    () => `Think of a character almost everyone knows.`,
  ],
  medium: [
    (c: string) => `Category: ${c}`,
    () => `They play an important role in the story.`,
    () => `They have a distinctive look or ability.`,
    () => `They appear in multiple major arcs.`,
    () => `Not the absolute main protagonist, but close.`,
  ],
  hard: [
    (c: string) => `From: ${c}`,
    () => `Supporting or secondary character.`,
    () => `Has a unique power, quirk, or technique.`,
    () => `Appears in a specific arc or season range.`,
    () => `You might need to think a bit for this one.`,
  ],
};

type Player = { id: number; name: string; avatar: string };
type Screen = "lobby" | "mode" | "role" | "play" | "reveal" | "phone" | "phone-result";
type GameMode = "classic" | "phone";
type Difficulty = "easy" | "medium" | "hard";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("lobby");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Naruto"]);
  const [imposterCount, setImposterCount] = useState(1);
  const [playerInput, setPlayerInput] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [mode, setMode] = useState<GameMode>("classic");
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = 5;
  const [secretWord, setSecretWord] = useState("");
  const [category, setCategory] = useState("");
  const [imposters, setImposters] = useState<number[]>([]);
  const [recentImposters, setRecentImposters] = useState<number[]>([]);
  const [revealIndex, setRevealIndex] = useState(0);
  const [rolesRevealed, setRolesRevealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [speedRound, setSpeedRound] = useState(false);
  const [phoneClues, setPhoneClues] = useState<string[]>([]);
  const [clueIndex, setClueIndex] = useState(0);
  const [phoneTimer, setPhoneTimer] = useState(0);
  const phoneTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  }, []);

  const addPlayer = () => {
    const name = playerInput.trim();
    if (!name) return;
    if (players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      toast("Name already taken");
      return;
    }
    if (players.length >= 12) {
      toast("Max 12 players");
      return;
    }
    setPlayers((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), name, avatar: AVATARS[prev.length % AVATARS.length] },
    ]);
    setPlayerInput("");
  };

  const removePlayer = (id: number) => setPlayers((prev) => prev.filter((p) => p.id !== id));

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        if (prev.length <= 1) { toast("Pick at least one category"); return prev; }
        return prev.filter((c) => c !== cat);
      }
      return [...prev, cat];
    });
  };

  const canStart = players.length >= 3 && selectedCategories.length > 0;

  const pickImposters = (count: number, playerList: Player[]) => {
    const weights = playerList.map((p) => {
      const recentCount = recentImposters.filter((id) => id === p.id).length;
      return Math.max(1, 10 - recentCount * 4);
    });
    const selected: number[] = [];
    const available = [...playerList];
    const availWeights = [...weights];
    for (let i = 0; i < count && available.length > 0; i++) {
      const total = availWeights.reduce((a, b) => a + b, 0);
      let r = Math.random() * total;
      let idx = 0;
      for (; idx < availWeights.length; idx++) {
        r -= availWeights[idx];
        if (r <= 0) break;
      }
      selected.push(available[idx].id);
      available.splice(idx, 1);
      availWeights.splice(idx, 1);
    }
    return selected;
  };

  const goToModeSelect = () => { if (canStart) setScreen("mode"); };

  const startClassic = () => {
    setMode("classic");
    const count = Math.min(Math.max(1, imposterCount), Math.floor(players.length / 2));
    setImposterCount(count);
    const cat = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const words = WORD_BANKS[cat];
    setCategory(cat);
    setSecretWord(words[Math.floor(Math.random() * words.length)]);
    const newImposters = pickImposters(count, players);
    setImposters(newImposters);
    setRecentImposters((prev) => [...newImposters, ...prev].slice(0, players.length * 2));
    setCurrentRound(1);
    setRevealIndex(0);
    setRolesRevealed(false);
    setScreen("role");
  };

  const startPhoneMode = () => {
    setMode("phone");
    const cat = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const words = WORD_BANKS[cat];
    const word = words[Math.floor(Math.random() * words.length)];
    setCategory(cat);
    setSecretWord(word);
    const templates = CLUE_TEMPLATES[difficulty];
    setPhoneClues(templates.map((fn) => fn(cat)));
    setClueIndex(0);
    if (speedRound) {
      setPhoneTimer(45);
      if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
      phoneTimerRef.current = setInterval(() => {
        setPhoneTimer((t) => {
          if (t <= 1) { if (phoneTimerRef.current) clearInterval(phoneTimerRef.current); return 0; }
          return t - 1;
        });
      }, 1000);
    } else setPhoneTimer(0);
    setScreen("phone");
  };

  const startHold = (e?: React.TouchEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (rolesRevealed) return;
    setHolding(true);
    holdTimerRef.current = setTimeout(() => setRolesRevealed(true), 600);
  };
  const endHold = () => {
    setHolding(false);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };
  const nextPlayerReveal = () => {
    if (revealIndex + 1 >= players.length) { setScreen("play"); return; }
    setRevealIndex((i) => i + 1);
    setRolesRevealed(false);
  };
  const nextRound = () => {
    if (currentRound < maxRounds) { setCurrentRound((r) => r + 1); toast(`Round ${currentRound + 1} started`); }
  };
  const doReveal = () => setScreen("reveal");
  const nextClue = () => { if (clueIndex < phoneClues.length - 1) setClueIndex((i) => i + 1); };
  const phoneReveal = () => {
    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    setScreen("phone-result");
  };
  const playAgain = () => { mode === "phone" ? startPhoneMode() : startClassic(); };
  const backToLobby = () => {
    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    setScreen("lobby");
  };

  useEffect(() => () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
  }, []);

  const currentPlayer = players[revealIndex];
  const isImposter = currentPlayer ? imposters.includes(currentPlayer.id) : false;
  const catLabel = (cat: string) => {
    if (cat === "Hunter x Hunter") return "HxH";
    if (cat === "Attack on Titan") return "AOT";
    if (cat === "My Hero Academia") return "MHA";
    if (cat === "Dragon Ball") return "DB";
    return cat;
  };

  return (
    <div className="app">
      {screen === "lobby" && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text">
                <h1>AI Imposter</h1>
                <p>Anime & Cartoons · v{APP_VERSION}</p>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: "10px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              <strong style={{ color: "var(--purple)" }}>v{APP_VERSION}</strong> — {APP_UPDATES}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Players (min 3)</div>
            <div className="add-player">
              <input type="text" value={playerInput} onChange={(e) => setPlayerInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()} placeholder="Enter player name..." maxLength={16} />
              <button className="btn btn-primary btn-sm" onClick={addPlayer}>Add</button>
            </div>
            <div className="player-list">
              {players.length === 0 ? (
                <div className="empty-state">Add at least 3 players to start</div>
              ) : players.map((p) => (
                <div className="player-row" key={p.id}>
                  <div className="player-avatar">{p.avatar}</div>
                  <div className="player-name">{p.name}</div>
                  <button className="player-remove" onClick={() => removePlayer(p.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Categories</div>
            <div className="categories">
              {Object.keys(WORD_BANKS).map((cat) => (
                <div key={cat} className={`chip ${selectedCategories.includes(cat) ? "active" : ""}`}
                  onClick={() => toggleCategory(cat)}>{catLabel(cat)}</div>
              ))}
            </div>
          </div>
          <div className="settings-row">
            <div className="setting-box"><label>Players</label><div className="value">{players.length}</div></div>
            <div className="setting-box">
              <label>Imposters</label>
              <div className="value">
                <input type="number" value={imposterCount}
                  onChange={(e) => setImposterCount(Math.max(1, Math.min(3, parseInt(e.target.value) || 1)))}
                  min={1} max={3}
                  style={{ width: 50, textAlign: "center", padding: 4, fontSize: 18, fontWeight: 700, background: "transparent", border: "none", color: "var(--purple)" }} />
              </div>
            </div>
            <div className="setting-box"><label>Max Rounds</label><div className="value">5</div></div>
          </div>
          <div className="footer-btns">
            <button className="btn btn-primary" onClick={goToModeSelect} disabled={!canStart}>Continue →</button>
          </div>
        </div>
      )}

      {screen === "mode" && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text"><h1>Choose Mode</h1><p>v{APP_VERSION}</p></div>
            </div>
          </div>
          <div className="card" style={{ cursor: "pointer", borderColor: "var(--purple)" }} onClick={startClassic}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>👥</div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Classic Imposter</h2>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>
              Pass the phone. Crew sees the secret word. Imposter only sees the category.
              Talk in person and reveal when ready. Smarter anti-repeat Imposter picks.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>📱</div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Phone is the Imposter</h2>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4, marginBottom: 12 }}>
              The phone gives 5 clues about a secret character. Everyone guesses who it is.
              Great for TV / party. Choose difficulty:
            </p>
            <div className="categories" style={{ marginBottom: 12 }}>
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <div key={d} className={`chip ${difficulty === d ? "active" : ""}`}
                  onClick={() => setDifficulty(d)}>{d.charAt(0).toUpperCase() + d.slice(1)}</div>
              ))}
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)", marginBottom: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={speedRound} onChange={(e) => setSpeedRound(e.target.checked)} />
              Speed Round (45s timer)
            </label>
            <button className="btn btn-primary" onClick={startPhoneMode}>Start Phone Mode ▶</button>
          </div>
          <div className="footer-btns">
            <button className="btn btn-secondary" onClick={() => setScreen("lobby")}>← Back</button>
          </div>
        </div>
      )}

      {screen === "role" && currentPlayer && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text"><h1>AI Imposter</h1><p>Pass phone to {currentPlayer.name}</p></div>
            </div>
          </div>
          <div className="role-card">
            {!rolesRevealed ? (
              <>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{currentPlayer.avatar}</div>
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{currentPlayer.name}</div>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>Hold the button below to see your role.<br />Make sure no one else is looking!</p>
              </>
            ) : isImposter ? (
              <>
                <div className="role-badge">You are the</div>
                <div className="role-title imposter">IMPOSTER</div>
                <div className="secret-box">
                  <div className="secret-label">You only know the category</div>
                  <div className="secret-value" style={{ color: "var(--red)" }}>{category}</div>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, maxWidth: 260 }}>Blend in! Talk like you know the secret word.</p>
              </>
            ) : (
              <>
                <div className="role-badge">You are</div>
                <div className="role-title crew">CREW</div>
                <div className="secret-box">
                  <div className="secret-label">Secret Word</div>
                  <div className="secret-value" style={{ color: "var(--purple)" }}>{secretWord}</div>
                  <div className="category-tag">{category}</div>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, maxWidth: 260 }}>Talk about the word — but don&apos;t make it too obvious!</p>
              </>
            )}
          </div>
          <div className="hold-area">
            <button className={`hold-btn ${holding ? "holding" : ""}`}
              onMouseDown={startHold} onMouseUp={endHold} onMouseLeave={endHold}
              onTouchStart={startHold} onTouchEnd={endHold} disabled={rolesRevealed}>
              {rolesRevealed ? "✓ Role revealed — hide it now" : "👆 Hold to reveal role"}
            </button>
            <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={nextPlayerReveal} disabled={!rolesRevealed}>
              {revealIndex + 1 >= players.length ? "Start Playing →" : "Next Player →"}
            </button>
          </div>
        </div>
      )}

      {screen === "play" && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text"><h1>AI Imposter</h1><p>Talk in person</p></div>
            </div>
          </div>
          <div className="round-header" style={{ marginBottom: 20 }}>
            <span className="round-badge">Round {currentRound} / {maxRounds}</span>
            <span className="category-tag">{category}</span>
          </div>
          <div className="progress" style={{ marginBottom: 24 }}>
            {Array.from({ length: maxRounds }, (_, i) => (
              <div key={i} className={`progress-dot ${i + 1 < currentRound ? "done" : i + 1 === currentRound ? "active" : ""}`} />
            ))}
          </div>
          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗣️</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Discuss freely</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.5, maxWidth: 280 }}>
              Talk about the category and try to find the Imposter.<br /><br />
              Hit <strong>Reveal</strong> anytime — no need to finish all 5 rounds.
            </p>
          </div>
          <div className="footer-btns">
            <button className="btn btn-primary" onClick={doReveal} style={{ padding: "18px 20px", fontSize: 17 }}>🔍 Reveal Imposter</button>
            {currentRound < maxRounds && (
              <button className="btn btn-secondary" onClick={nextRound}>Next Round ({currentRound + 1}/{maxRounds})</button>
            )}
          </div>
        </div>
      )}

      {screen === "phone" && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">📱</div>
              <div className="logo-text">
                <h1>Phone is the Imposter</h1>
                <p>{difficulty.toUpperCase()}{speedRound ? " · SPEED" : ""} · Clue {clueIndex + 1}/5</p>
              </div>
            </div>
          </div>
          {speedRound && (
            <div className="timer" style={{ margin: "0 auto 16px", borderColor: phoneTimer <= 10 ? "var(--red)" : "var(--purple)", color: phoneTimer <= 10 ? "var(--red)" : "var(--purple)" }}>
              {phoneTimer}
            </div>
          )}
          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32, minHeight: 220 }}>
            <div className="category-tag" style={{ marginBottom: 16 }}>{category}</div>
            <p style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.4, maxWidth: 320 }}>{phoneClues[clueIndex]}</p>
            <div style={{ marginTop: 20, fontSize: 13, color: "var(--muted)" }}>Clue {clueIndex + 1} of 5</div>
          </div>
          <div className="footer-btns">
            {clueIndex < phoneClues.length - 1 ? (
              <button className="btn btn-primary" onClick={nextClue}>Next Clue →</button>
            ) : (
              <button className="btn btn-primary" onClick={phoneReveal}>Reveal Answer 🔍</button>
            )}
            <button className="btn btn-secondary" onClick={phoneReveal}>Skip to Reveal</button>
          </div>
        </div>
      )}

      {screen === "phone-result" && (
        <div className="screen active">
          <div className="reveal-result"><div className="big-text">The character was...</div></div>
          <div className="imposter-reveal">
            <div className="label">Secret Character</div>
            <div className="name" style={{ color: "var(--purple)", fontSize: 28 }}>{secretWord}</div>
            <div className="category-tag" style={{ marginTop: 12 }}>{category}</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "var(--muted)" }}>Did your group guess it correctly?</p>
          </div>
          <div className="footer-btns">
            <button className="btn btn-primary" onClick={playAgain}>Play Again</button>
            <button className="btn btn-secondary" onClick={backToLobby}>Back to Lobby</button>
          </div>
        </div>
      )}

      {screen === "reveal" && (
        <div className="screen active">
          <div className="reveal-result">
            <div className="big-text">Reveal Time 🎭</div>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Round {currentRound} of {maxRounds}</p>
          </div>
          <div className="imposter-reveal">
            <div className="label">Imposter was</div>
            <div className="name">
              {players.filter((p) => imposters.includes(p.id)).map((p) => `${p.avatar} ${p.name}`).join(", ")}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="label">Secret Word</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "var(--purple)" }}>{secretWord}</div>
              <div className="category-tag" style={{ marginTop: 8 }}>{category}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Players</div>
            <div className="score-list">
              {players.map((p) => (
                <div className="score-row" key={p.id}>
                  <span>{p.avatar} {p.name}</span>
                  <span style={{ fontWeight: 600, color: imposters.includes(p.id) ? "var(--red)" : "var(--green)" }}>
                    {imposters.includes(p.id) ? "IMPOSTER" : "Crew"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="footer-btns">
            <button className="btn btn-primary" onClick={playAgain}>Play Again</button>
            <button className="btn btn-secondary" onClick={backToLobby}>Back to Lobby</button>
          </div>
        </div>
      )}

      <div className={`toast ${showToast ? "show" : ""}`}>{toastMsg}</div>
    </div>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";

// ========== WORD BANKS ==========
const WORD_BANKS: Record<string, string[]> = {
  Naruto: [
    // Team 7 & Konoha
    "Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno", "Kakashi Hatake", "Sai", "Yamato",
    "Sakura", "Naruto", "Sasuke", "Kakashi",
    // Team 8, 10, Guy
    "Hinata Hyuga", "Kiba Inuzuka", "Shino Aburame", "Akamaru", "Kurenai Yuhi",
    "Shikamaru Nara", "Ino Yamanaka", "Choji Akimichi", "Asuma Sarutobi",
    "Rock Lee", "Neji Hyuga", "Tenten", "Might Guy",
    // Sannin & Hokage
    "Jiraiya", "Tsunade", "Orochimaru", "Hiruzen Sarutobi", "Minato Namikaze",
    "Kushina Uzumaki", "Hashirama Senju", "Tobirama Senju", "Danzo Shimura",
    // Uchiha & others
    "Itachi Uchiha", "Obito Uchiha", "Madara Uchiha", "Shisui Uchiha", "Fugaku Uchiha",
    "Mikoto Uchiha", "Izuna Uchiha", "Kagami Uchiha",
    // Sand
    "Gaara", "Temari", "Kankuro", "Baki", "Chiyo", "Rasa", "Yashamaru",
    // Akatsuki
    "Pain", "Nagato", "Konan", "Itachi", "Kisame Hoshigaki", "Deidara", "Sasori",
    "Hidan", "Kakuzu", "Zetsu", "Tobi", "Black Zetsu", "White Zetsu",
    // Taka / Hebi
    "Karin", "Suigetsu Hozuki", "Jugo", "Kimimaro",
    // Cloud / Mist / Stone
    "Killer Bee", "A (Raikage)", "Darui", "Omoi", "Karui", "Samui", "Yugito Nii",
    "Mei Terumi", "Chojuro", "Ao", "Zabuza Momochi", "Haku", "Yagura",
    "Onoki", "Kurotsuchi", "Akatsuchi", "Kitsuchi",
    // Sound / Otogakure
    "Kabuto Yakushi", "Tayuya", "Kidomaru", "Sakon", "Ukon", "Jirobo", "Dosu Kinuta",
    // Other notable
    "Iruka Umino", "Konohamaru Sarutobi", "Ebisu", "Anko Mitarashi", "Shizune",
    "Inoichi Yamanaka", "Shikaku Nara", "Choza Akimichi", "Hiashi Hyuga", "Hanabi Hyuga",
    "Hizashi Hyuga", "Mito Uzumaki", "Ashura Otsutsuki", "Indra Otsutsuki",
    "Kaguya Otsutsuki", "Hagoromo Otsutsuki", "Hamura Otsutsuki",
    "Rin Nohara", "Gai", "Lee", "Neji", "Hinata", "Shikamaru", "Ino", "Choji",
    "Kiba", "Shino", "Temari", "Kankuro", "Bee", "Ay", "Mei", "Onoki",
    "Jiraiya", "Tsunade", "Orochimaru", "Kabuto", "Sasori", "Deidara", "Kisame",
    "Hidan", "Kakuzu", "Konan", "Nagato", "Yahiko", "Zetsu", "Madara", "Obito",
    "Hashirama", "Tobirama", "Hiruzen", "Minato", "Kushina", "Danzo", "Yamato", "Sai",
  ],
  "Hunter x Hunter": [
    // Main
    "Gon Freecss", "Killua Zoldyck", "Kurapika", "Leorio Paradinight", "Hisoka Morow",
    "Gon", "Killua", "Kurapika", "Leorio", "Hisoka",
    // Zoldyck
    "Illumi Zoldyck", "Milluki Zoldyck", "Alluka Zoldyck", "Kalluto Zoldyck",
    "Silva Zoldyck", "Kikyo Zoldyck", "Zeno Zoldyck", "Maha Zoldyck", "Gotoh", "Canary",
    // Phantom Troupe
    "Chrollo Lucilfer", "Feitan Portor", "Phinks Magcub", "Shalnark", "Pakunoda",
    "Uvogin", "Nobunaga Hazama", "Machi Komacine", "Franklin", "Bonolenov",
    "Shizuku", "Kortopi", "Omokage", "Chrollo", "Feitan", "Phinks", "Machi",
    // Hunters & Association
    "Isaac Netero", "Ging Freecss", "Biscuit Krueger", "Kite", "Knuckle Bine",
    "Morel Mackernasey", "Knov", "Shoot McMahon", "Palm Siberia", "Meleoron",
    "Netero", "Ging", "Bisky", "Knuckle", "Morel", "Knov", "Shoot", "Palm",
    // Chimera Ants
    "Meruem", "Neferpitou", "Shaiapouf", "Menthuthuyoupi", "Colt", "Reina",
    "Ikalgo", "Welfin", "Bloster", "Pell", "Rammot", "Hina", "Zazan",
    "Meruem", "Pitou", "Pouf", "Youpi",
    // Others
    "Pariston Hill", "Cheadle Yorkshire", "Mizaistom Nana", "Saiyu", "Botobai",
    "Beans", "Wing", "Zushi", "Hanzo", "Pokkle", "Ponzu", "Genthru", "Assam",
    "Tsezguerra", "Goreinu", "Razore", "Eta", "Senritsu", "Melody", "Basho",
    "Izunavi", "Light Nostrade", "Neon Nostrade", "Dalzollene", "Squala",
    "Baise", "Eliza", "Linssen", "Tocino", "Shachmono Tocino",
  ],
  "Attack on Titan": [
    // Main
    "Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi Ackerman", "Erwin Smith",
    "Hange Zoe", "Jean Kirstein", "Connie Springer", "Sasha Blouse", "Historia Reiss",
    "Eren", "Mikasa", "Armin", "Levi", "Erwin", "Hange", "Jean", "Connie", "Sasha", "Historia",
    // Warriors
    "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart", "Zeke Yeager", "Pieck Finger",
    "Porco Galliard", "Marcel Galliard", "Falco Grice", "Gabi Braun", "Colt Grice",
    "Reiner", "Bertholdt", "Annie", "Zeke", "Pieck", "Falco", "Gabi",
    // Military & others
    "Kenny Ackerman", "Uri Reiss", "Frieda Reiss", "Rod Reiss", "Grisha Yeager",
    "Carla Yeager", "Hannes", "Darius Zackly", "Nile Dok", "Dot Pixis",
    "Rico Brzenska", "Ian Dietrich", "Mitabi Jarnach", "Marlo Freudenberg", "Hitch Dreyse",
    "Ymir", "Krista Lenz", "Marco Bott", "Thomas Wagner", "Mina Carolina",
    "Samuel Linke-Jackson", "Daz", "Floch Forster", "Onyankopon", "Yelena",
    "Keith Shadis", "Kitz Weilman", "Anka Rheinberger", "Gustav", "Moblit Berner",
    "Eld Jinn", "Gunther Schultz", "Oruo Bozad", "Petra Ral", "Nifa",
    "Goggles", "Lauda", "Ramon", "Varis", "Lobov",
    "Kenny", "Grisha", "Pixis", "Zackly", "Shadis", "Floch", "Yelena", "Onyankopon",
  ],
  SpongeBob: [
    "SpongeBob SquarePants", "Patrick Star", "Squidward Tentacles", "Mr. Krabs",
    "Plankton", "Sandy Cheeks", "Gary the Snail", "Mrs. Puff", "Pearl Krabs",
    "Larry the Lobster", "Mermaid Man", "Barnacle Boy", "Karen Plankton",
    "Bubble Bass", "Man Ray", "Flying Dutchman", "Dirty Bubble", "Potty the Parrot",
    "Patchy the Pirate", "Potty", "King Neptune", "Princess Mindy", "Triton",
    "Squilliam Fancyson", "Old Man Jenkins", "Mrs. Tentacles", "Mama Krabs",
    "Betsy Krabs", "Grandma SquarePants", "Harold SquarePants", "Margaret SquarePants",
    "BlackJack SquarePants", "Stanley S. SquarePants", "Cousin Stanley",
    "Bubble Buddy", "Nocturnal Diner Guy", "Fred", "Tom", "Nancy Suzy Fish",
    "Scooter", "Nat Peterson", "Harold", "Tina", "Evelyn", "Frank",
    "SpongeBob", "Patrick", "Squidward", "Mr. Krabs", "Plankton", "Sandy",
    "Gary", "Mrs. Puff", "Pearl", "Larry", "Mermaid Man", "Barnacle Boy",
    "Karen", "Bubble Bass", "Man Ray", "Flying Dutchman", "King Neptune",
  ],
  Mario: [
    "Mario", "Luigi", "Princess Peach", "Bowser", "Yoshi", "Toad",
    "Princess Daisy", "Wario", "Waluigi", "Rosalina", "Donkey Kong",
    "Diddy Kong", "Birdo", "Toadette", "Bowser Jr.", "Kamek",
    "King Boo", "Pauline", "Captain Toad", "Nabbit", "Toadsworth",
    "Peach", "Daisy", "DK", "Boo",
  ],
};

const AVATARS = ["🦊", "⚡", "🗡️", "🧽", "🍄", "🔥", "👻", "🐉", "⭐", "🎯", "🎮", "💫"];

type Player = { id: number; name: string; avatar: string };
type Screen = "lobby" | "role" | "play" | "reveal";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("lobby");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Naruto"]);
  const [imposterCount, setImposterCount] = useState(1);
  const [playerInput, setPlayerInput] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Game state
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = 5;
  const [secretWord, setSecretWord] = useState("");
  const [category, setCategory] = useState("");
  const [imposters, setImposters] = useState<number[]>([]);
  const [revealIndex, setRevealIndex] = useState(0);
  const [rolesRevealed, setRolesRevealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  }, []);

  // ========== LOBBY ==========
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
      {
        id: Date.now() + Math.random(),
        name,
        avatar: AVATARS[prev.length % AVATARS.length],
      },
    ]);
    setPlayerInput("");
  };

  const removePlayer = (id: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        if (prev.length <= 1) {
          toast("Pick at least one category");
          return prev;
        }
        return prev.filter((c) => c !== cat);
      }
      return [...prev, cat];
    });
  };

  const canStart = players.length >= 3 && selectedCategories.length > 0;

  // ========== START GAME ==========
  const startGame = () => {
    const count = Math.min(Math.max(1, imposterCount), Math.floor(players.length / 2));
    setImposterCount(count);

    const cat = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const words = WORD_BANKS[cat];
    setCategory(cat);
    setSecretWord(words[Math.floor(Math.random() * words.length)]);

    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setImposters(shuffled.slice(0, count).map((p) => p.id));

    setCurrentRound(1);
    setRevealIndex(0);
    setRolesRevealed(false);

    setScreen("role");
  };

  // ========== ROLE REVEAL ==========
  const startHold = (e?: React.TouchEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (rolesRevealed) return;
    setHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setRolesRevealed(true);
    }, 600);
  };

  const endHold = () => {
    setHolding(false);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  const nextPlayerReveal = () => {
    if (revealIndex + 1 >= players.length) {
      setScreen("play");
      return;
    }
    setRevealIndex((i) => i + 1);
    setRolesRevealed(false);
  };

  // ========== PLAY (free discussion) ==========
  const nextRound = () => {
    if (currentRound < maxRounds) {
      setCurrentRound((r) => r + 1);
      toast(`Round ${currentRound + 1} started`);
    }
  };

  const doReveal = () => {
    setScreen("reveal");
  };

  const playAgain = () => startGame();
  const backToLobby = () => setScreen("lobby");

  const currentPlayer = players[revealIndex];
  const isImposter = currentPlayer ? imposters.includes(currentPlayer.id) : false;

  return (
    <div className="app">
      {/* ========== LOBBY ========== */}
      {screen === "lobby" && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text">
                <h1>AI Imposter</h1>
                <p>Anime & Cartoons</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Players</div>
            <div className="add-player">
              <input
                type="text"
                value={playerInput}
                onChange={(e) => setPlayerInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                placeholder="Enter player name..."
                maxLength={16}
              />
              <button className="btn btn-primary btn-sm" onClick={addPlayer}>
                Add
              </button>
            </div>
            <div className="player-list">
              {players.length === 0 ? (
                <div className="empty-state">Add at least 3 players to start</div>
              ) : (
                players.map((p) => (
                  <div className="player-row" key={p.id}>
                    <div className="player-avatar">{p.avatar}</div>
                    <div className="player-name">{p.name}</div>
                    <button className="player-remove" onClick={() => removePlayer(p.id)}>
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Categories (pick at least 1)</div>
            <div className="categories">
              {Object.keys(WORD_BANKS).map((cat) => (
                <div
                  key={cat}
                  className={`chip ${selectedCategories.includes(cat) ? "active" : ""}`}
                  onClick={() => toggleCategory(cat)}
                >
                  {cat === "Hunter x Hunter" ? "HxH" : cat === "Attack on Titan" ? "AOT" : cat}
                </div>
              ))}
            </div>
          </div>

          <div className="settings-row">
            <div className="setting-box">
              <label>Players</label>
              <div className="value">{players.length}</div>
            </div>
            <div className="setting-box">
              <label>Imposters</label>
              <div className="value">
                <input
                  type="number"
                  value={imposterCount}
                  onChange={(e) => setImposterCount(Math.max(1, Math.min(3, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={3}
                  style={{
                    width: 50,
                    textAlign: "center",
                    padding: 4,
                    fontSize: 18,
                    fontWeight: 700,
                    background: "transparent",
                    border: "none",
                    color: "var(--purple)",
                  }}
                />
              </div>
            </div>
            <div className="setting-box">
              <label>Max Rounds</label>
              <div className="value">5</div>
            </div>
          </div>

          <div className="footer-btns">
            <button className="btn btn-primary" onClick={startGame} disabled={!canStart}>
              Start Game ▶
            </button>
          </div>
        </div>
      )}

      {/* ========== ROLE REVEAL ========== */}
      {screen === "role" && currentPlayer && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text">
                <h1>AI Imposter</h1>
                <p>Pass phone to {currentPlayer.name}</p>
              </div>
            </div>
          </div>

          <div className="role-card">
            {!rolesRevealed ? (
              <>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{currentPlayer.avatar}</div>
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{currentPlayer.name}</div>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>
                  Hold the button below to see your role.
                  <br />
                  Make sure no one else is looking!
                </p>
              </>
            ) : isImposter ? (
              <>
                <div className="role-badge">You are the</div>
                <div className="role-title imposter">IMPOSTER</div>
                <div className="secret-box">
                  <div className="secret-label">You only know the category</div>
                  <div className="secret-value" style={{ color: "var(--red)" }}>
                    {category}
                  </div>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, maxWidth: 260 }}>
                  Blend in! Talk like you know the secret word.
                </p>
              </>
            ) : (
              <>
                <div className="role-badge">You are</div>
                <div className="role-title crew">CREW</div>
                <div className="secret-box">
                  <div className="secret-label">Secret Word</div>
                  <div className="secret-value" style={{ color: "var(--purple)" }}>
                    {secretWord}
                  </div>
                  <div className="category-tag">{category}</div>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, maxWidth: 260 }}>
                  Talk about the word — but don&apos;t make it too obvious!
                </p>
              </>
            )}
          </div>

          <div className="hold-area">
            <button
              className={`hold-btn ${holding ? "holding" : ""}`}
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              disabled={rolesRevealed}
            >
              {rolesRevealed ? "✓ Role revealed — hide it now" : "👆 Hold to reveal role"}
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginTop: 10 }}
              onClick={nextPlayerReveal}
              disabled={!rolesRevealed}
            >
              {revealIndex + 1 >= players.length ? "Start Playing →" : "Next Player →"}
            </button>
          </div>
        </div>
      )}

      {/* ========== PLAY (free talk) ========== */}
      {screen === "play" && (
        <div className="screen active">
          <div className="header">
            <div className="logo">
              <div className="logo-icon">🎭</div>
              <div className="logo-text">
                <h1>AI Imposter</h1>
                <p>Talk in person</p>
              </div>
            </div>
          </div>

          <div className="round-header" style={{ marginBottom: 20 }}>
            <span className="round-badge">Round {currentRound} / {maxRounds}</span>
            <span className="category-tag">{category}</span>
          </div>

          <div className="progress" style={{ marginBottom: 24 }}>
            {Array.from({ length: maxRounds }, (_, i) => (
              <div
                key={i}
                className={`progress-dot ${i + 1 < currentRound ? "done" : i + 1 === currentRound ? "active" : ""}`}
              />
            ))}
          </div>

          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗣️</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Discuss freely</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.5, maxWidth: 280 }}>
              Talk about the category and try to find the Imposter.
              <br /><br />
              Hit <strong>Reveal</strong> anytime — no need to finish all 5 rounds.
            </p>
          </div>

          <div className="footer-btns">
            <button className="btn btn-primary" onClick={doReveal} style={{ padding: "18px 20px", fontSize: 17 }}>
              🔍 Reveal Imposter
            </button>
            {currentRound < maxRounds && (
              <button className="btn btn-secondary" onClick={nextRound}>
                Next Round ({currentRound + 1}/{maxRounds})
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========== REVEAL ========== */}
      {screen === "reveal" && (
        <div className="screen active">
          <div className="reveal-result">
            <div className="big-text">Reveal Time 🎭</div>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Round {currentRound} of {maxRounds}
            </p>
          </div>

          <div className="imposter-reveal">
            <div className="label">Imposter was</div>
            <div className="name">
              {players
                .filter((p) => imposters.includes(p.id))
                .map((p) => `${p.avatar} ${p.name}`)
                .join(", ")}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="label">Secret Word</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "var(--purple)" }}>{secretWord}</div>
              <div className="category-tag" style={{ marginTop: 8 }}>
                {category}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Players</div>
            <div className="score-list">
              {players.map((p) => (
                <div className="score-row" key={p.id}>
                  <span>
                    {p.avatar} {p.name}
                  </span>
                  <span style={{ fontWeight: 600, color: imposters.includes(p.id) ? "var(--red)" : "var(--green)" }}>
                    {imposters.includes(p.id) ? "IMPOSTER" : "Crew"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-btns">
            <button className="btn btn-primary" onClick={playAgain}>
              Play Again
            </button>
            <button className="btn btn-secondary" onClick={backToLobby}>
              Back to Lobby
            </button>
          </div>
        </div>
      )}

      <div className={`toast ${showToast ? "show" : ""}`}>{toastMsg}</div>
    </div>
  );
}

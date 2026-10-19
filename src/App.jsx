import { useState } from "react";
import "./App.css";

const bars = [
  {
    name: "The Student Lounge",
    location: "North Park",
    vibe: "College Bar",
    music: "Hip-hop",
    bestNights: "Thursday and Friday",
  },
  {
    name: "Downtown Social",
    location: "Downtown",
    vibe: "Upscale Bar",
    music: "Pop",
    bestNights: "Friday and Saturday",
  },
  {
    name: "The Speakeasy",
    location: "Mission Beach",
    vibe: "Relaxed Bar",
    music: "Jazz",
    bestNights: "Wednesday and Saturday",
  },
  {
    name: "Harbor House",
    location: "Pacific Beach",
    vibe: "Dance Club",
    music: "House",
    bestNights: "Friday and Saturday",
  },
];

const locations = [
  "All locations",
  "North Park",
  "Downtown",
  "Mission Beach",
  "Pacific Beach",
];

const vibes = [
  "All vibes",
  "College Bar",
  "Upscale Bar",
  "Relaxed Bar",
  "Dance Club",
];

const musicTypes = [
  "All music",
  "Hip-hop",
  "Pop",
  "Jazz",
  "House",
];

function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedVibe, setSelectedVibe] = useState("All vibes");
  const [selectedMusic, setSelectedMusic] = useState("All music");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBars = bars.filter((bar) => {
    const locationMatches =
      selectedLocation === "All locations" ||
      bar.location === selectedLocation;

    const vibeMatches =
      selectedVibe === "All vibes" ||
      bar.vibe === selectedVibe;

    const musicMatches =
      selectedMusic === "All music" ||
      bar.music === selectedMusic;

    const searchMatches = `${bar.name} ${bar.location} ${bar.vibe} ${bar.music}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return locationMatches && vibeMatches && musicMatches && searchMatches;
  });

  const chooseOption = (option, type) => {
    if (type === "location") {
      setSelectedLocation(option);
    }

    if (type === "vibe") {
      setSelectedVibe(option);
    }

    if (type === "music") {
      setSelectedMusic(option);
    }

    setActiveMenu(null);
  };

  return (
    <div className="app">
      <header className="brand">
        <h1>searchBAR</h1>
        <p>"for students, by students"</p>
      </header>

      <div className="workspace">
        <aside className="filters">
          <h2>Explore</h2>

          <button
            className="filter-button"
            onClick={() =>
              setActiveMenu(activeMenu === "location" ? null : "location")
            }
          >
            <span>Location</span>
            <span>{activeMenu === "location" ? "⌄" : "›"}</span>
          </button>

          {activeMenu === "location" && (
            <div className="option-list">
              {locations.map((location) => (
                <button
                  className="filter-option"
                  key={location}
                  onClick={() => chooseOption(location, "location")}
                >
                  {location}
                </button>
              ))}
            </div>
          )}

          <button
            className="filter-button"
            onClick={() =>
              setActiveMenu(activeMenu === "vibe" ? null : "vibe")
            }
          >
            <span>Vibe</span>
            <span>{activeMenu === "vibe" ? "⌄" : "›"}</span>
          </button>

          {activeMenu === "vibe" && (
            <div className="option-list">
              {vibes.map((vibe) => (
                <button
                  className="filter-option"
                  key={vibe}
                  onClick={() => chooseOption(vibe, "vibe")}
                >
                  {vibe}
                </button>
              ))}
            </div>
          )}

          <button
            className="filter-button"
            onClick={() =>
              setActiveMenu(activeMenu === "music" ? null : "music")
            }
          >
            <span>Music</span>
            <span>{activeMenu === "music" ? "⌄" : "›"}</span>
          </button>

          {activeMenu === "music" && (
            <div className="option-list">
              {musicTypes.map((music) => (
                <button
                  className="filter-option"
                  key={music}
                  onClick={() => chooseOption(music, "music")}
                >
                  {music}
                </button>
              ))}
            </div>
          )}

          <button className="add-button">＋ Add a Bar</button>
        </aside>

        <main className="results">
          <form
            className="search-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by bar, location, vibe, or music..."
            />

            <button type="submit">Search</button>
          </form>

          <p className="active-filters">
            {selectedLocation} · {selectedVibe} · {selectedMusic}
          </p>

          <section className="bar-grid">
            {filteredBars.length > 0 ? (
              filteredBars.map((bar) => (
                <article className="bar-card" key={bar.name}>
                  <div className="bar-image">Bar Image</div>

                  <h2>{bar.name}</h2>

                  <p>
                    Location: <strong>{bar.location}</strong>
                  </p>

                  <p>
                    Vibe: <strong>{bar.vibe}</strong>
                  </p>

                  <p>
                    Music: <strong>{bar.music}</strong>
                  </p>

                  <p>
                    Best nights: <strong>{bar.bestNights}</strong>
                  </p>

                  <button className="details-button">View Details</button>
                </article>
              ))
            ) : (
              <p className="no-results">No bars match your search.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
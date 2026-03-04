# Future Message Capsule

A private digital time capsule experience that lets users write a message to their future self, seal it behind a chosen date, and unlock it when the time arrives. Built with vanilla web technologies, it recreates the quiet ritual of letter-writing through interaction design and animation.

---

## Experience Concept

Future Message Capsule treats self-directed communication as a deliberate, meaningful act rather than a casual note. The user composes a private message, sets a future unlock date, and watches their words disappear behind a sealed envelope. A live countdown tracks the remaining time until the capsule becomes available. When the moment arrives, the user initiates the opening themselves — the envelope flap folds back, sparks fire, and the message is revealed one character at a time, as though being read for the first time.

The aesthetic draws from aged editorial print, ink-dark interfaces, and warm gold typography — quiet, serious, and unhurried.

---

## Features

- **Message Input** — Write freely to your future self with a clean, distraction-free textarea
- **Unlock Date Picker** — Choose exactly when your capsule should open (date and time)
- **Animated Envelope** — After sealing, your message becomes a floating animated envelope that gently pulses while it waits
- **Live Countdown Timer** — Days, hours, minutes, and seconds update every second in real time
- **Opening Interaction** — When the countdown reaches zero, an *"Open Your Capsule"* button appears; clicking it triggers a 3D envelope-flap animation with gold spark particles
- **Typewriter Reveal** — Your message is typed out character by character as if being read for the first time
- **Fully Private** — Everything is stored in `localStorage` — no data ever leaves your device
- **Page Refresh Safe** — Refresh anytime; your countdown resumes exactly where it left off
- **Discard Option** — Changed your mind? You can permanently delete your capsule at any point
=======
### Sealed Capsule Input
A textarea accepts up to 2,000 characters of free-form message text. A datetime picker allows the user to specify any future unlock time. Both fields are validated before saving: the message must not be empty, the date must not be in the past. Error messages appear inline without disrupting the layout.

### Persistent Storage
The capsule is saved to `localStorage` as a JSON object containing the message text, the unlock datetime, and the sealed datetime. On every page load the application reads this value and restores the correct state — input form, countdown, or reveal — without requiring any server.

### Animated Envelope
After sealing, an SVG envelope is displayed in the countdown section. It includes a body, fold wings, a wax seal disc with a star glyph, and a hinged top flap. In its waiting state the envelope floats gently on a looping vertical oscillation. When the user clicks the open button, a CSS `rotateX` transform folds the flap back 180 degrees along its top hinge, the wax seal fades out, and a drop-shadow glow transitions in.

### Live Countdown
Four digit blocks display the remaining days, hours, minutes, and seconds, updating every second via `setInterval`. When the target time is reached the interval clears, the timer fades out smoothly, and the open button appears.

### Spark Particle Burst
Six absolutely-positioned circular elements radiate outward from the envelope centre at the moment of opening. Each travels to a unique directional offset via CSS custom properties and fades to transparent over 700 milliseconds.

### Typewriter Reveal
The revealed message is typed into the display container one character at a time at 28 milliseconds per character. A blinking cursor element precedes each new character as it is inserted and is removed after a short pause once the final character is placed. The heading, metadata line, message container, and action button all fade in with staggered 220-millisecond delays.

### Discard and Reset
A ghost-styled discard button on the countdown section prompts the user for confirmation before permanently deleting the capsule and returning to the input form. A matching button on the reveal section clears the capsule and opens a fresh compose view.

---

## Technical Structure

```
future-message-capsule/
|-- index.html      Main HTML document with all semantic structure and meta tags
|-- style.css       All visual styling including animations, envelope system, and layout
|-- script.js       Application logic: state, storage, countdown, envelope sequence, reveal
|-- README.md       This document
|-- LICENSE         MIT License
```

### Module Responsibilities

**index.html**
Declares the full three-section DOM structure: the compose form, the countdown card with the SVG envelope and spark container, and the reveal card. Includes Open Graph meta tags, a favicon reference, and Google Fonts imports for Playfair Display and DM Mono.

**style.css**
Implements the visual system using CSS custom properties for the dark ink palette and gold accent tones. Contains the animated gradient background, card fade-up entrance, SVG envelope shape fills and stroke rules, flap hinge transform, float keyframe, spark particle keyframes, countdown grid layout, open-button ring pulse, staggered reveal-child transitions, and the typewriter cursor blink.

**script.js**
Manages all application state and interaction. Reads and writes the capsule JSON object to `localStorage`. Controls which of the three sections is visible at any time. Runs the live countdown interval. Orchestrates the three-phase envelope opening sequence: timer fade-out and button reveal, flap animation and spark trigger, staggered reveal and typewriter effect. Handles validation, error display, and all reset paths.

---

## Setup Instructions

Future Message Capsule requires no build tools, package manager, or server-side runtime. It runs entirely in the browser.

**Option 1: Direct file access**
1. Download or clone the repository.
2. Open `index.html` in any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).

**Option 2: Local development server (recommended)**
Using Python:
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

Using Node.js (`npx serve`):
```bash
npx serve .
```

**Option 3: Static hosting deployment**
The project is deployment-ready for any static hosting platform:
- Netlify: Drag the project folder into the Netlify dashboard
- Vercel: Run `vercel deploy` from the project directory
- GitHub Pages: Push to a repository and enable Pages from the repository settings

No environment variables, configuration files, or build steps are required.

---

## Browser Compatibility

| Feature | Requirement |
|---|---|
| CSS Custom Properties | Chrome 49+, Firefox 31+, Safari 9.1+ |
| CSS `transform-box: fill-box` | Chrome 64+, Firefox 55+, Safari 11.1+ |
| `localStorage` | All modern browsers |
| `datetime-local` input | Chrome 20+, Firefox 93+, Edge 12+ |

---

## Future Improvements

The following enhancements would extend the experience without compromising its current simplicity:

- **Multiple capsules** — Allow users to store and manage several capsules simultaneously, each with its own unlock date and message.
- **Passphrase lock** — Optionally encrypt the stored message behind a user-defined passphrase so the text cannot be read directly from `localStorage`.
- **Scheduled email delivery** — Integrate a backend notification service to deliver the message to a provided email address at the unlock time, independent of the browser.
- **Image attachment** — Allow the user to attach a photograph to the capsule, displayed alongside the message text on reveal.
- **Sound design** — Add an optional ambient audio layer: a soft seal sound on submission and a paper-rustle on opening, toggled by user preference.
- **Export as PDF** — Render the revealed message as a styled, downloadable PDF document formatted to resemble a printed letter.
- **Accessibility improvements** — Full keyboard navigation for all interactive elements and ARIA live regions for countdown and animation state announcements.

---

## Author

Anshika Mittal

---

## License

MIT License. See `LICENSE` for full terms.

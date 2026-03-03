// ============================================================
// FUTURE MESSAGE CAPSULE — script.js  (v2 — animated upgrade)
//
// What's new in v2:
//   • Envelope open animation triggered by "Open Capsule" btn
//   • Typing / typewriter effect for revealed message
//   • Staggered fade-in for reveal section children
//   • Timer fades out instead of jumping away
//
// All original logic (save/load/countdown/reset) is preserved.
// New code is clearly marked with [v2] in comments.
// ============================================================


// ---- 1. GRAB DOM ELEMENTS --------------------------------
// We collect every element we need upfront so we're not
// querying the DOM repeatedly inside loops or timers.

const inputSection      = document.getElementById('input-section');
const countdownSection  = document.getElementById('countdown-section');
const revealSection     = document.getElementById('reveal-section');

const messageInput      = document.getElementById('message-input');
const unlockDateInput   = document.getElementById('unlock-date');
const sealBtn           = document.getElementById('seal-btn');
const errorMsg          = document.getElementById('error-msg');

const cdDays            = document.getElementById('cd-days');
const cdHours           = document.getElementById('cd-hours');
const cdMinutes         = document.getElementById('cd-minutes');
const cdSeconds         = document.getElementById('cd-seconds');
const sealedDateDisplay = document.getElementById('sealed-date-display');

const revealedMessage   = document.getElementById('revealed-message');
const writtenDateDisplay = document.getElementById('written-date-display');

const resetBtn          = document.getElementById('reset-btn');
const newCapsuleBtn     = document.getElementById('new-capsule-btn');

// [v2] New elements for envelope + opening interaction
const envelopeWrap  = document.getElementById('envelope-wrap');   // floating wrapper
const sparks        = document.getElementById('sparks');          // particle burst
const timerArea     = document.getElementById('timer-area');      // countdown + label
const openBtn       = document.getElementById('open-btn');        // "Open Capsule" button


// ---- 2. STORAGE HELPERS ----------------------------------
// We store one JSON object in localStorage under this key.
const STORAGE_KEY = 'futureCapsule';

// Save capsule data (message + dates) to localStorage
function saveCapsule(message, unlockDate) {
  const capsule = {
    message:    message,
    unlockDate: unlockDate,             // ISO string of chosen unlock time
    sealedDate: new Date().toISOString() // ISO string of right now
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(capsule));
}

// Load and return capsule data, or null if nothing saved
function loadCapsule() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

// Remove capsule from localStorage
function deleteCapsule() {
  localStorage.removeItem(STORAGE_KEY);
}


// ---- 3. SECTION VISIBILITY HELPERS -----------------------
// Show/hide the three main sections by toggling .hidden

function showInputSection() {
  inputSection.classList.remove('hidden');
  countdownSection.classList.add('hidden');
  revealSection.classList.add('hidden');
}

function showCountdownSection() {
  inputSection.classList.add('hidden');
  countdownSection.classList.remove('hidden');
  revealSection.classList.add('hidden');
}

function showRevealSection() {
  inputSection.classList.add('hidden');
  countdownSection.classList.add('hidden');
  revealSection.classList.remove('hidden');
}


// ---- 4. DATE FORMATTING ----------------------------------
// Converts an ISO date string into a human-readable format
// e.g. "March 15, 2025 at 9:00 AM"

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   'numeric',
    minute: '2-digit'
  });
}


// ---- 5. COUNTDOWN LOGIC ----------------------------------
// We use setInterval to update the display every second.
let countdownInterval = null;

// Pad a number to always show two digits, e.g. 5 → "05"
function pad(n) {
  return String(n).padStart(2, '0');
}

// Calculate remaining time and update the four countdown spans.
// [v2] When time's up, instead of calling revealCapsule() directly
//      we call showOpenButton() to surface the interaction step first.
function updateCountdown(unlockDate) {
  const now    = new Date();
  const target = new Date(unlockDate);
  const diffMs = target - now;

  // Time is up — stop interval and prompt the user to open
  if (diffMs <= 0) {
    clearInterval(countdownInterval);
    showOpenButton(); // [v2] new step: show "Open Capsule" button
    return;
  }

  // Break ms difference into individual time units
  const totalSeconds = Math.floor(diffMs / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Update the DOM digits
  cdDays.textContent    = pad(days);
  cdHours.textContent   = pad(hours);
  cdMinutes.textContent = pad(minutes);
  cdSeconds.textContent = pad(seconds);
}

// Start the live countdown for a given capsule
function startCountdown(capsule) {
  sealedDateDisplay.textContent = formatDate(capsule.sealedDate);
  showCountdownSection();

  // Run immediately once, then repeat every 1 second
  updateCountdown(capsule.unlockDate);
  countdownInterval = setInterval(() => {
    updateCountdown(capsule.unlockDate);
  }, 1000);
}


// ============================================================
// [v2] ENVELOPE OPEN SEQUENCE
// ============================================================
//
// The opening flow has three phases:
//
//   Phase 1 — showOpenButton()
//     Timer fades out → "Open Capsule" button appears.
//     User is in control; nothing happens until they click.
//
//   Phase 2 — handleOpenClick() (triggered by button click)
//     Adds .is-open to envelope wrapper → CSS animates the
//     flap folding back and the seal fading out.
//     Fires spark particles.
//     After animation delay, transitions to reveal section.
//
//   Phase 3 — revealCapsule() + staggered children + typeMessage()
//     Reveal section shown. Each .reveal-child fades in with
//     a staggered delay. Message text is typed out character
//     by character for an emotional, letter-opening feel.
// ============================================================

// PHASE 1 — fade the timer out, surface the open button
function showOpenButton() {
  // Fade out the timer area smoothly (CSS transition on opacity)
  timerArea.classList.add('fading');

  // After the fade-out completes (500ms), hide timer and show button
  setTimeout(() => {
    timerArea.classList.add('hidden');
    openBtn.classList.remove('hidden');
  }, 500);
}

// PHASE 2 — user clicked "Open Capsule"
function handleOpenClick() {
  // Disable button immediately to prevent double-click
  openBtn.disabled = true;
  openBtn.textContent = 'Opening…';

  // Add .is-open class to envelope wrapper.
  // This single class change drives all CSS animations:
  //   • .env-flap → rotateX(-180deg) via transition
  //   • .env-seal, .env-seal-glyph → opacity:0 via transition
  //   • .envelope-svg → glow via transition
  //   • float animation stopped
  envelopeWrap.classList.add('is-open');

  // Trigger spark particle burst immediately
  fireSparks();

  // Wait for flap animation to nearly complete (750ms transition)
  // then switch to the reveal section
  setTimeout(() => {
    revealCapsule();
  }, 850); // slightly longer than 750ms CSS transition
}

// Fire the spark particles: add .active → CSS keyframes run
function fireSparks() {
  sparks.classList.add('active');

  // Remove .active after animation ends so it can be re-triggered
  // if the user ever resets and re-seals (edge case robustness)
  setTimeout(() => {
    sparks.classList.remove('active');
  }, 1000);
}

// PHASE 3a — populate and show reveal section
function revealCapsule() {
  const capsule = loadCapsule();
  if (!capsule) return;

  // Populate metadata
  writtenDateDisplay.textContent = formatDate(capsule.sealedDate);

  // Show the reveal section (it starts with invisible .reveal-child elements)
  showRevealSection();

  // Stagger each .reveal-child into visibility
  staggerRevealChildren();

  // Start typing the message text after the heading has appeared
  // Delay long enough for the first two children (heading + meta) to be visible
  setTimeout(() => {
    typeMessage(capsule.message);
  }, 600);
}

// PHASE 3b — stagger .reveal-child elements into view
// Each child gets .visible added with an increasing delay
// creating a cascade: heading → meta → message box → button
function staggerRevealChildren() {
  const children = revealSection.querySelectorAll('.reveal-child');
  children.forEach((child, index) => {
    setTimeout(() => {
      child.classList.add('visible');
    }, index * 220); // 220ms gap between each child
  });
}

// PHASE 3c — typewriter effect for the message text
// Types one character every `speed` ms, with a blinking cursor.
// When done, cursor is removed.
function typeMessage(text) {
  const container = revealedMessage;
  container.textContent = ''; // clear any previous content

  // Create the blinking cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';

  // Append cursor so it shows immediately even before typing starts
  container.appendChild(cursor);

  let charIndex = 0;
  const speed   = 28; // milliseconds per character (adjust to taste)

  // Each tick appends one character before the cursor
  const typingInterval = setInterval(() => {
    if (charIndex >= text.length) {
      // All characters typed — remove cursor after a short pause
      clearInterval(typingInterval);
      setTimeout(() => cursor.remove(), 1200);
      return;
    }

    // Insert the next character as a text node before the cursor
    const char = document.createTextNode(text[charIndex]);
    container.insertBefore(char, cursor);
    charIndex++;
  }, speed);
}


// ---- 7. SEAL BUTTON HANDLER ------------------------------
// Validate inputs, save to localStorage, and start countdown.
// [v2] Also resets envelope state in case of reuse.

function handleSeal() {
  const message    = messageInput.value.trim();
  const unlockDate = unlockDateInput.value;

  // Validation: both fields required
  if (!message) {
    showError('Please write a message before sealing.');
    return;
  }
  if (!unlockDate) {
    showError('Please choose an unlock date.');
    return;
  }

  // Validation: must be in the future
  const now    = new Date();
  const target = new Date(unlockDate);
  if (target <= now) {
    showError('Unlock date must be in the future.');
    return;
  }

  hideError();

  // [v2] Reset envelope visual state before showing it again
  resetEnvelopeState();

  saveCapsule(message, target.toISOString());
  startCountdown(loadCapsule());
}


// ---- 8. RESET / DISCARD ----------------------------------

function handleReset() {
  const confirmed = window.confirm(
    'Are you sure? Your message will be permanently deleted.'
  );
  if (!confirmed) return;

  clearInterval(countdownInterval);
  deleteCapsule();
  messageInput.value    = '';
  unlockDateInput.value = '';
  showInputSection();
}


// ---- 9. NEW CAPSULE BUTTON -------------------------------

function handleNewCapsule() {
  clearInterval(countdownInterval);
  deleteCapsule();
  messageInput.value    = '';
  unlockDateInput.value = '';
  showInputSection();
}


// ---- 10. ERROR HELPERS -----------------------------------
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}

function hideError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}


// ============================================================
// [v2] ENVELOPE STATE RESET
// Clears all animation classes so the envelope looks sealed
// again if the user creates a brand-new capsule.
// ============================================================
function resetEnvelopeState() {
  envelopeWrap.classList.remove('is-open');
  sparks.classList.remove('active');
  timerArea.classList.remove('fading', 'hidden');
  openBtn.classList.add('hidden');
  openBtn.disabled    = false;
  openBtn.textContent = 'Open Your Capsule ↓';
}


// ---- 11. INITIALISE ON PAGE LOAD -------------------------
// Entry point: read localStorage and decide what to show.

function init() {
  const capsule = loadCapsule();

  if (!capsule) {
    // No saved capsule → show the input form
    showInputSection();
    return;
  }

  // Capsule exists — check if unlock time has passed
  const now    = new Date();
  const target = new Date(capsule.unlockDate);

  if (target <= now) {
    // [v2] Time already up on load → go straight to reveal
    //      (skip envelope open animation for page-refresh case)
    writtenDateDisplay.textContent = formatDate(capsule.sealedDate);
    showRevealSection();
    staggerRevealChildren();
    setTimeout(() => typeMessage(capsule.message), 600);
  } else {
    // Time remaining — resume the countdown with envelope visible
    startCountdown(capsule);
  }
}


// ---- 12. EVENT LISTENERS ---------------------------------
sealBtn.addEventListener('click', handleSeal);
resetBtn.addEventListener('click', handleReset);
newCapsuleBtn.addEventListener('click', handleNewCapsule);

// [v2] Open button triggers the envelope opening sequence
openBtn.addEventListener('click', handleOpenClick);

// Set minimum date to 1 minute from now so browsers can hint
(function setDateInputMin() {
  const soon = new Date(Date.now() + 60 * 1000);
  const p    = n => String(n).padStart(2, '0');
  unlockDateInput.min =
    `${soon.getFullYear()}-${p(soon.getMonth()+1)}-${p(soon.getDate())}` +
    `T${p(soon.getHours())}:${p(soon.getMinutes())}`;
})();

// ---- RUN -------------------------------------------------
init();

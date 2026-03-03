# Future Message Capsule 📬

> *Write to the person you're becoming.*

A calm, emotional web experience where you write a private message to your future self — seal it, set an unlock date, and wait. When the time comes, open your capsule and read what you once felt, hoped, or wanted to remember.

---

## Project Overview

**Future Message Capsule** is an interactive frontend web project built with HTML, CSS, and Vanilla JavaScript. It turns the simple act of writing a letter into a meaningful ritual — one that lives entirely in your own browser, private and personal, until the day you're ready to open it.

No accounts. No servers. No one else can read it. Just you, your words, and time.

---

## Features

- **✍️ Message Input** — Write freely to your future self with a clean, distraction-free textarea
- **📅 Unlock Date Picker** — Choose exactly when your capsule should open (date and time)
- **📬 Animated Envelope** — After sealing, your message becomes a floating animated envelope that gently pulses while it waits
- **⏳ Live Countdown Timer** — Days, hours, minutes, and seconds update every second in real time
- **💥 Opening Interaction** — When the countdown reaches zero, an *"Open Your Capsule"* button appears; clicking it triggers a 3D envelope-flap animation with gold spark particles
- **📖 Typewriter Reveal** — Your message is typed out character by character as if being read for the first time
- **🔒 Fully Private** — Everything is stored in `localStorage` — no data ever leaves your device
- **♻️ Page Refresh Safe** — Refresh anytime; your countdown resumes exactly where it left off
- **🗑️ Discard Option** — Changed your mind? You can permanently delete your capsule at any point

---

## How It Works

The experience flows through three stages:

**1. Write & Seal**
You write your message and pick a future unlock date. When you click *Seal Capsule*, your message and both timestamps are saved to `localStorage`. The input form fades away and an envelope appears in its place.

**2. Wait & Watch**
The envelope floats gently on screen while a live countdown ticks down beneath it — days, hours, minutes, seconds. If you close the tab and come back later, the countdown picks up from the correct remaining time automatically.

**3. Open & Read**
Once the countdown hits zero, the timer fades out and an *Open Your Capsule* button appears. Clicking it:
- Triggers a 3D CSS flap animation on the envelope
- Fires a burst of gold spark particles
- Transitions to the reveal section
- Types your original message out character by character, with a blinking cursor

After reading, you can write a new capsule and start the cycle again.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure and SVG envelope markup |
| **CSS3** | Animations, transitions, keyframes, CSS custom properties |
| **Vanilla JavaScript (ES6)** | All logic — storage, countdown, DOM manipulation, typewriter effect |
| **localStorage** | Persisting the capsule message and dates across sessions |
| **Google Fonts** | Playfair Display (headings) + DM Mono (body) |

No frameworks. No libraries. No build tools. Just the fundamentals.

---

## Why This Project Exists

Most apps are built for speed — instant gratification, immediate feedback. This project goes in the opposite direction on purpose.

The idea started with a simple question: *what if a web experience could make you slow down?*

Writing to your future self is something people have done in journals, letters, and time capsules for centuries. It's a way of checking in with the person you're becoming — leaving a note for them to find later. But the act itself feels more meaningful when it has weight, ritual, and a little bit of ceremony around it.

The animated envelope, the countdown, the typewriter reveal — none of that is decorative. Each piece is designed to make the moment feel real: the sealing, the waiting, the opening. The goal was to create emotional UX — an interface that doesn't just display information, but makes you *feel* something when you use it.

It's also a reminder that not everything on the internet needs to be public, social, or shared. Some things can just be yours.

---

## Future Improvements

A few ideas for where this could go next:

- **Multiple capsules** — Allow users to store and manage more than one message at a time
- **Email delivery** — Optional: send the message to your own email address on the unlock date (would require a backend)
- **Photo or mood attachment** — Let users attach an emoji, color, or small image that represents how they feel when writing
- **Sound design** — Subtle audio cues for sealing and opening moments
- **Export to PDF** — Download your opened message as a formatted keepsake
- **Encryption** — Optionally password-protect the message in localStorage for extra privacy
- **Mobile app** — Package as a PWA (Progressive Web App) for an offline-first mobile experience

---

## Author

**Anshika Mittal**

Built as a personal frontend project exploring emotional UX design, CSS animation, and the expressive possibilities of plain HTML, CSS, and JavaScript — without reaching for a framework.

---

*Time only moves forward. So do you.*

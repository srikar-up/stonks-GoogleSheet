

---

# 🎮 GameUp Sheets — STONKS Life OS

**A Gamified Personal Productivity Dashboard**

> Turn your life into an RPG — earn XP, level up, and unlock rewards for real-world progress.

---

## 📌 Overview

**GameUp Sheets** is a fully gamified **Life OS** built entirely using **Google Sheets** and **Google Apps Script**.

It transforms everyday productivity — tasks, habits, counters, notes, and events — into an **RPG-style experience** where every action earns XP and contributes to your long-term growth.

* **Backend:** Google Sheets + Apps Script (`code.gs`)
* **Frontend:** Dark-mode Web App (`index.html`)
* **Hosting:** Google (No server required)
* **Privacy:** 100% self-hosted in your Google Account

---

## ✨ Features

---

### ⚔️ Quest System (Task Tracker)

Turn your to-do list into **Quests** with ranks, XP, and rewards.

#### Quest Ranks & XP

| Rank      | Priority | XP      |
| --------- | -------- | ------- |
| 🥇 Gold   | High     | +150 XP |
| 🥈 Silver | Medium   | +100 XP |
| 🥉 Bronze | Low      | +50 XP  |
| 🛡️ Steel | Trivial  | +20 XP  |

#### Quest Types

* **Repeating** → Resets daily (perfect for routines)
* **Daily / Monthly** → Fixed deadlines
* **Reminder** → Simple alert tasks

#### Quest Enhancements

* 🎁 **Rewards** – Attach real-life rewards (e.g., *Ice Cream*)
* 📊 **Progress Bars** – Multi-step targets

  ```
  Read 10 pages → 0 / 10
  ```

---

### 📈 “Work” Counters

A dedicated system for **grinding without deadlines**.

Perfect for:

* Pushups
* DSA problems
* Pages read
* Study hours

**Mechanics**

* +10 XP per increment
* One-tap counting
* Optimistic UI + 🎉 confetti effects

---

### 📝 Notes & Memory System

A lightweight digital memory layer.

* **Permanent Notes**
  Persist until manually deleted

* **Temporary Notes**

  * Auto-expire after *N* days
  * Hidden automatically when expired

Great for:

* Reminders
* Ideas
* Short-term goals

---

### 📊 Dashboard & Stats

Track your progress visually with real metrics.

#### Included Analytics

* **Leveling System**

  * XP bar
  * Current Level display

* **Charts (Chart.js)**

  * XP Trend (Yearly)
  * Quest Priority Breakdown
  * Completion Status Rates

* **Highlights**

  * Best Month
  * Total XP Earned
  * Success Rate

---

### ⏰ Utilities

Built-in productivity tools:

* ⏱️ **Focus Timer** – Track deep work sessions
* 🕰️ **IST Clock** – Live Indian Standard Time clock
* 🎂 **Event Alerts**

  * Birthdays & events
  * Countdown appears when 0–10 days away

---

## 🛠️ Installation & Setup

No server required — just a **Google Account**.

---

### Step 1: Create the Sheet

1. Open **Google Sheets**
2. Create a new blank spreadsheet
3. Name it:

   ```
   GameUp Database
   ```

> ✅ **Optional:**
> You do **not** need to manually create tabs or columns.
> The system includes a **self-healing engine** that automatically creates:
>
> * Tracker
> * Events
> * Notes
> * Counters
> * History

---

### Step 2: Open Apps Script

From your sheet:

```
Extensions → Apps Script
```

A new tab with the script editor will open.

---

### Step 3: Add the Code

#### Backend Setup

1. Rename the default file:

   ```
   Code.gs → code.gs
   ```
2. Paste the full contents of the provided `code.gs`
3. Click **Save** 💾

---

#### Frontend Setup

1. Click **➕** next to *Files*
2. Select **HTML**
3. Name the file:

   ```
   index
   ```

   (Creates `index.html`)
4. Paste the provided frontend code
5. Click **Save**

---

### Step 4: Deploy Web App

1. Click **Deploy → New deployment**
2. Select **Web App** ⚙️

#### Configuration

| Setting     | Value               |
| ----------- | ------------------- |
| Description | GameUp v1           |
| Execute as  | Me                  |
| Access      | Anyone (or Only Me) |

3. Click **Deploy**
4. Authorize permissions:

   * Review permissions
   * Advanced → Go to Project (unsafe)
   * Allow

📌 **Copy the Web App URL** — this is your dashboard link.

---

### Step 5: Setup Automation (Required for Repeating Quests)

To auto-reset repeating quests daily:

1. Open **Triggers** ⏰ (left sidebar)
2. Click **➕ Add Trigger**

#### Trigger Configuration

| Option       | Value                  |
| ------------ | ---------------------- |
| Function     | `resetRepeatingQuests` |
| Event Source | Time-driven            |
| Trigger Type | Day timer              |
| Time         | Midnight – 1 AM        |

3. Click **Save**

✅ Repeating quests will now reset every day.

---

## 🚀 Usage Guide

---

### 🧭 Interface Navigation

* **Top Pills:**
  `Quests | Work | Notes | Stats`
* **Floating Action Button (+):**
  Add:

  * Quest
  * Counter
  * Note
  * Event

---

### ⚔️ Managing Quests

#### Adding Quests

```
+ → Quest → Set Target (default = 1)
```

#### Completing Quests

* Click **+** on the quest card
* Progress fills visually
* At 100%:

  * Card turns green
  * 🎉 Confetti
  * XP logged to History

#### Repeating Quests

* Auto-reset to `0%` every night
* Requires trigger setup (Step 5)

---

### 🗃️ Data Management

All data lives in **Google Sheets**.

* Manual edits are allowed
* Useful for fixing mistakes (e.g., wrong counter increments)

#### ⚠️ History Tab

* Acts as XP ledger
* **Do not delete rows**
* Required for:

  * Total XP
  * Charts
  * Stats accuracy

---

## 💻 Technologies Used

* **Google Apps Script** – Backend logic
* **Google Sheets** – Database
* **HTML5 / CSS3** – Dark-mode UI
* **Chart.js** – Data visualization
* **Canvas Confetti** – Victory effects
* **Google Fonts**

  * Inter
  * JetBrains Mono

---

## 📄 License

Licensed under the **MIT License**
© 2025 **srikar-up**

---

## ❤️ Credits

Built with passion by **srikar-up**
**Game your life. Level up daily.**

---



Here’s a **clean, GitHub-ready Markdown rewrite** of your file.
I’ve preserved **all content**, fixed structure, added headings, tables, callouts, and improved readability so it looks professional in a GitHub README or `/docs` page.

You can paste this directly into `README.md`.

---

# 📈 Stonks — Wealth Tracker Pro

**Comprehensive User Manual & Deployment Guide**

> **Version:** 1.0
> **Platform:** Google Sheets + Google Apps Script (Web App)
> **License:** Open Source / Personal Use

---

## 1. Executive Summary

**Stonks** is a professional-grade, self-hosted financial dashboard designed for individuals who prioritize **data privacy**, **accuracy**, and **full control** over their wealth tracking.

Unlike commercial budgeting apps, Stonks runs entirely inside your **personal Google ecosystem** — no third-party servers, no data leaks.

### 🔑 Key Highlights

* **Real-Time Debt Engine** – Calculates accrued interest daily
* **Smart Repayment System** – Prevents over/under-payment errors
* **Logic-Based Financial Advisor** – Instantly audits financial health
* **Dark Mode Dashboard** – Responsive UI for desktop & mobile

---

## 2. Core Capabilities

* **Liquid Asset Tracking**
  Tracks real-time cash flow (Income vs Expenses)

* **Advanced Debt Management**
  Supports:

  * IPA → Simple Interest
  * CIPA → Compound Interest

* **Smart Repayment Engine**
  Auto-calculates:

  ```
  Outstanding = Principal + Interest – Paid
  ```

* **Financial Health Audit**

  * Savings Rate
  * Debt-to-Income Ratio
  * Investment Allocation

* **Modern UI**

  * Dark mode
  * Mobile friendly
  * Fast load times

---

## 3. Installation & Configuration

Follow these steps to deploy your **private instance of Stonks**.

---

### Step 1: Google Sheet Preparation

The Google Sheet acts as your **database**.
⚠️ **Structure must be exact.**

1. Create a new Google Sheet:
   👉 [https://sheets.google.com](https://sheets.google.com)

2. Rename the default tab to:

   ```
   Sheet1
   ```

3. Initialize **Row 1** with the following **case-sensitive headers** in this exact order:

| Column | Header        |
| -----: | ------------- |
|     A1 | Year          |
|     B1 | Month         |
|     C1 | Amount        |
|     D1 | Type          |
|     E1 | Category      |
|     F1 | Interest %    |
|     G1 | Interest Type |
|     H1 | Net Amount    |

---

### Step 2: Code Installation

#### Backend Setup (`Code.gs`)

1. Open:

   ```
   Extensions → Apps Script
   ```

2. Delete any existing code

3. Paste the full `Code.gs` file from the distribution

4. Click **Save** 💾

---

#### Frontend Setup (`index.html`)

1. Click **➕** next to **Files**
2. Select **HTML**
3. Name it:

   ```
   index
   ```

   (Apps Script auto-adds `.html`)
4. Paste the full `index.html` code
5. Click **Save**

---

### Step 3: System Initialization

This step configures dropdowns & validation logic.

1. Return to the Google Sheet

2. **Refresh the page**

3. Wait ~5–10 seconds

4. A new menu appears:

   ```
   📈 Stonks
   ```

5. Run:

   ```
   📈 Stonks → 🛠️ Fix All Dropdowns
   ```

#### Authorization Flow

* Click **Continue**
* Choose your Google Account
* If prompted:

  ```
  Advanced → Go to (Untitled Project) → Allow
  ```

✅ Success message:

```
All Dropdowns Created!
```

---

### Step 4: Web App Deployment

1. Open Apps Script
2. Click **Deploy → New deployment**
3. Select **Web App**

#### Configuration

| Setting     | Value                      |
| ----------- | -------------------------- |
| Description | v1.0 Initial Release       |
| Execute as  | Me                         |
| Access      | Anyone with Google Account |

4. Click **Deploy**
5. Copy the **Web App URL**
6. Bookmark it — this is your dashboard link 🔖

---

## 4. Dashboard Operations Guide

The dashboard is your **primary interface**.

---

### A. Adding Transactions

Click **➕ Add** (top-right).

---

#### 1️⃣ Standard Transactions

(Income / Expense / Investment)

* **Type:** Expense / Savings / Investment
* **Category:** Food, Salary, Stocks, etc.
* **Amount:** INR

> Interest fields are hidden for these types.

---

#### 2️⃣ Taking a Loan (Debt Taken)

* **Type:** Debt Taken
* **Category:** Personal Loan, Home Loan, etc.
* **Amount:** Principal borrowed
* **Interest Rate:** Annual % (e.g., `10.5`)
* **Interest Type:**

  * `IPA` → Simple Interest
  * `CIPA` → Compound Interest

---

#### 3️⃣ Paying Off Debt (Debt Repayment)

Powered by the **Smart Repayment Engine**.

* **Type:** Debt Repayment

* **Category Dropdown:**

  * Shows only **active loans**
  * Displays **current outstanding balance**

* **Amount:**

  * Auto-filled with **exact payoff value**
  * Editable for partial payments (EMI)

---

### B. Date & Filter Logic (Critical)

Understanding this ensures **accurate insights**.

| Metric                        | Behavior                                   |
| ----------------------------- | ------------------------------------------ |
| Income / Expense / Investment | Filtered by selected Year & Month          |
| Outstanding Debt              | **Global (As of Today)** — ignores filters |
| Debt Repayment Modal          | Uses selected transaction date             |
| Charts                        | Context-aware (Year-based trends)          |

📌 **Debt is always calculated up to the real-world current date.**

---

### C. Financial Advisor Logic

The banner at the top audits your finances using **hierarchical rules**.
Hover the `(?)` icon to see calculations.

| Status         | Condition                         | Advice                       |
| -------------- | --------------------------------- | ---------------------------- |
| 🚨 Critical    | Debt > 3× Annual Income           | Focus only on debt reduction |
| ⚠️ Warning     | EMI > 30% Income                  | Reduce repayment burden      |
| ⚠️ Warning     | Expenses > 80% Income             | Cut discretionary spending   |
| 💡 Opportunity | Savings > 30% & Investments < 10% | Invest surplus cash          |
| 🌟 Excellent   | Investments > 20% Income          | Strong financial trajectory  |
| ✅ Balanced     | None                              | Follow the 50/30/20 rule     |

---

## 5. Backend Maintenance (Google Sheets)

You can manage data directly in Sheets if needed.

---

### Automatic Data Cleaning

Triggered via `onEdit`:

* **Dropdown Sync**
  Adjusts fields when transaction type changes

* **N/A Enforcement**
  Clears interest fields for non-debt entries

* **Net Amount Calculation**
  Column **H** is auto-calculated
  ❌ Do not edit manually

---

### Troubleshooting Menu

Use when validation errors appear:

```
📈 Stonks → 🛠️ Fix All Dropdowns
📈 Stonks → 🔄 Force Recalculate
```

---

## 6. Technical Specifications

### Financial Formulas

#### Net Cash (Liquidity)

```
Net Cash = (Income + Debt Taken)
         – (Expenses + Debt Repaid + Investments)
```

---

#### Outstanding Debt (Per Loan)

```
Outstanding = (Principal + Accrued Interest) – Total Repaid
```

---

#### Simple Interest (IPA)

```
I = P × r × t
```

`t` = time in years since loan date

---

#### Compound Interest (CIPA)

```
A = P × (1 + r)^t – P
```

---

### Browser Compatibility

* **Desktop:** Chrome, Firefox, Edge, Safari (Latest)
* **Mobile:** Fully responsive (iOS & Android)

---

## 🚀 Stonks Finance System

**Empowering Financial Independence — One Sheet at a Time.**

---

If you want, I can also:

* Split this into `/docs` pages
* Add badges & screenshots
* Convert it into a **GitHub Wiki**
* Create a **Quick Start** version

Just tell me 👍

Stonks 📈 - Wealth Tracker Pro

Comprehensive User Manual & Deployment Guide

Version: 1.0

Platform: Google Sheets + Google Apps Script Web App

License: Open Source / Personal Use

1. Executive Summary

Stonks is a professional-grade, self-hosted financial dashboard designed for individuals who prioritize data privacy and granular control over their wealth tracking. Unlike commercial budgeting apps, Stonks operates entirely within your personal Google Ecosystem.

It features a Real-Time Debt Engine that calculates accrued interest daily, a Smart Repayment System that prevents calculation errors during debt payoff, and a Logic-Based Financial Advisor that audits your financial health instantly.

Core Capabilities

Liquid Asset Tracking: Monitors real-time cash flow (Income vs. Expenses).

Advanced Debt Management: Automatically calculates Simple (IPA) and Compound (CIPA) interest based on loan tenure.

Smart Repayment: Auto-fills the exact outstanding balance (Principal + Interest - Paid) when selecting a loan to repay.

Financial Health Audit: Provides instant feedback on Savings Rate, Debt-to-Income Ratio, and Investment allocation.

Dark Mode Dashboard: A modern, responsive web interface that works on desktop and mobile.

2. Installation & Configuration

Follow this guide to deploy your private instance of Stonks.

Step 1: Google Sheet Preparation

The Google Sheet acts as your database. The structure must be exact for the automation to function.

Create a new Google Sheet at sheets.google.com.

Rename the main tab to Sheet1 (default).

CRITICAL: Initialize Row 1 with the following case-sensitive headers in this specific order:

A1 Year

B1 Month

C1 Amount

D1 Type

E1 Category

F1 Interest %

G1 Interest Type

H1 Net Amount

Step 2: Code Installation

In your Google Sheet, navigate to the top menu: Extensions > Apps Script.

Backend Setup (Code.gs):

Clear any existing code in the editor.

Paste the full Code.gs script provided in the distribution.

Click Save (Floppy Disk Icon).

Frontend Setup (index.html):

Click the + (Plus) icon next to "Files" in the sidebar.

Select HTML.

Name the file index (The editor will automatically append .html).

Paste the full index.html code provided in the distribution.

Click Save.

Step 3: System Initialization

Before using the app, the script must configure the sheet's validation rules.

Return to your Google Sheet browser tab and Refresh the page.

Wait 5-10 seconds. A new custom menu titled "📈 Stonks" will appear in the toolbar (to the right of "Help").

Click 📈 Stonks > 🛠️ Fix All Dropdowns.

Authorization:

Google will ask for permission to run the script.

Click Continue -> Select your Google Account.

Note: You may see a "Google hasn't verified this app" warning (because it's a private script). Click Advanced -> Go to (Untitled Project) (unsafe) -> Allow.

Wait for the confirmation message: "✅ All Dropdowns Created!".

Step 4: Web App Deployment

Return to the Apps Script window.

Click the blue Deploy button (top right).

Select New deployment.

Click the Gear Icon next to "Select type" and choose Web App.

Configuration Settings:

Description: v1.0 Initial Release

Execute as: Me (Your email address).

Who has access: Anyone with Google Account (This is recommended to prevent permission errors on mobile devices).

Click Deploy.

Copy the Web App URL. This is your permanent link to access the Stonks Dashboard. Bookmark it.

3. Dashboard Operations Guide

The Dashboard is your primary interface for interacting with your finances.

A. Adding Transactions

Click the "Add" button in the top right header to open the transaction modal.

1. Standard Transactions (Income / Expense / Investment)

Type: Select Expense, Savings, or Investment.

Category: Choose from the dropdown (e.g., Food, Salary, Stocks).

Amount: Enter the value in INR.

Note: Interest fields are hidden and irrelevant for these types.

2. Taking a Loan (Debt Taken)

Type: Select "Debt Taken".

Category: Select "Personal Loan", "Home Loan", etc.

Amount: Enter the Principal amount borrowed.

Interest Rate: Enter the annual interest rate (e.g., 10.5 for 10.5%).

Interest Type:

IPA (Simple Interest): Calculated on Principal only.

CIPA (Compound Interest): Calculated on Principal + Accumulated Interest.

3. Paying Off Debt (Debt Repayment)

This feature uses the "Smart Repayment Engine".

Type: Select "Debt Repayment".

Category:

The dropdown will dynamically load only your active loans.

It displays the loan name alongside the Current Outstanding Balance (Principal + Interest accrued to date - Previous payments).

Amount:

Selecting a loan will automatically fill the Amount field with the exact figure needed to close the loan.

You can manually edit this amount if you are only making a partial payment (EMI).

B. Date & Filter Logic (Crucial Behavior)

Understanding how dates affect the numbers on your dashboard is essential for accurate tracking.

Metric

Behavior

Income, Expense, Investments

Filtered View: These stats strictly follow the Year and Month dropdowns at the top. If you select "2025", you only see transactions from 2025.

Outstanding Debt (KPI)

Global View (As of Today): Debt is a continuous liability. The "Net Debt" card always shows your total outstanding balance calculated up to the current real-world date (Today), regardless of the dashboard filter. This ensures you always know your true liability.

Debt Repayment (Modal)

Projected View: When paying a debt, the system calculates interest up to the Transaction Date you select in the form. 



• If you select a Future Date (e.g., 2028), it projects the interest forward.



• If you select a Past Date, it calculates what was due at that time.

Charts

Context Aware: The Cash Flow and Wealth Growth charts visualize data based on the selected Year filter to show trends over time.

C. The Financial Advisor Logic

The banner at the top uses a hierarchical logic engine to audit your finances. Hover over the (?) icon to see the specific math behind the advice.

Status

Condition

Advice Logic

🚨 Critical

Total Debt > 3x Annual Income

Focus purely on debt reduction. Avoid new liabilities.

⚠️ Warning

Debt Repayment > 30% of Income

Your debt burden is too high. Reduce EMI obligations.

⚠️ Warning

Expenses > 80% of Income

You are living paycheck to paycheck. Cut discretionary spending.

💡 Opportunity

Savings > 30% & Investments < 10%

You are hoarding cash. Move surplus funds into investments to beat inflation.

🌟 Excellent

Investments > 20% of Income

You are on the fast track to financial independence.

✅ Balanced

None of the above

Maintain the 50/30/20 rule (Needs/Wants/Savings).

4. Backend Maintenance (Google Sheets)

While the dashboard is preferred, you can manage data directly in the Google Sheet.

Automatic Data Cleaning

The script contains an onEdit trigger that runs whenever you edit the sheet manually.

Dropdown Sync: If you change a row's type from "Expense" to "Debt Taken", the correct dropdowns for Interest Rate appear automatically.

N/A Enforcement: If you change a "Debt Taken" row to "Expense", the script wipes the Interest columns and sets them to "N/A" to prevent database corruption.

Net Amount Calculation: The script calculates the Net Amount (Column H) automatically. Do not manually edit Column H.

Troubleshooting Menu

If the sheet behaves unexpectedly (e.g., red error triangles appear), use the custom menu:

📈 Stonks > 🛠️ Fix All Dropdowns: Re-scans the entire sheet and repairs validation rules.

📈 Stonks > 🔄 Force Recalculate: Re-runs the math for the "Net Amount" column for all rows.

5. Technical Specifications

Formulas Used

Net Cash (Liquidity)


$$Net Cash = (Income + Debt Taken) - (Expenses + Debt Repaid + Investments)$$

Outstanding Debt (Per Loan)


$$Outstanding = (Principal + Accrued Interest) - Total Repaid$$

Simple Interest (IPA)


$$I = P \times r \times t$$


Where $t$ is time in years calculated from the Loan Date to the Current Date.

Compound Interest (CIPA)


$$A = P \times (1 + r)^t - P$$


Calculates total interest accrued over time $t$.

Browser Compatibility

Desktop: Chrome, Firefox, Edge, Safari (Latest versions).

Mobile: Fully responsive on iOS and Android via browser.

Stonks 📈 Finance System - Empowering Financial Independence.

/**
 * SERVES THE HTML DASHBOARD
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Wealth Tracker Pro')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * ==========================================
 * 🛠️ MENU & SETUP TOOLS
 * ==========================================
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('💰 Wealth Tracker')
      .addItem('🛠️ Fix All Dropdowns', 'setupSheetValidation')
      .addItem('🔄 Force Recalculate', 'updateRunningBalanceWrapper')
      .addToUi();
}

function updateRunningBalanceWrapper() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  updateRunningBalance(sheet);
  SpreadsheetApp.getUi().alert('✅ Balances Updated!');
}

function setupSheetValidation() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const maxRows = sheet.getMaxRows();
  
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let i = -5; i <= 5; i++) { years.push(currentYear + i); }
  sheet.getRange(2, 1, maxRows - 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(years, true).build());

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  sheet.getRange(2, 2, maxRows - 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(months, true).build());

  const types = ["Expense", "Savings", "Debt Taken", "Debt Repayment", "Investment"];
  sheet.getRange(2, 4, maxRows - 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(types, true).build());

  fixDataValidation();
  SpreadsheetApp.getUi().alert('✅ All Dropdowns Created & Fixed!');
}

/**
 * ==========================================
 * SHEET AUTOMATION
 * ==========================================
 */

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const row = range.getRow();
  const col = range.getColumn();

  if (row < 2 || range.getNumRows() > 1) return; 

  // --- 1. HANDLE TYPE CHANGE (Column 4) ---
  if (col === 4) {
    const typeValue = range.getValue();
    
    // Clear dependent cells
    sheet.getRange(row, 5, 1, 3).clearContent(); 
    
    updateCategoryDropdown(sheet, typeValue, row);
    
    const rateCell = sheet.getRange(row, 6);
    const typeCell = sheet.getRange(row, 7);

    if (typeValue === "Debt Taken") {
      const rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['IPA (Simple Interest)', 'CIPA (Compound Interest)'], true)
        .build();
      typeCell.setDataValidation(rule);
    } else {
      // FIXED: Use clearDataValidations() (Plural)
      rateCell.clearDataValidations(); 
      typeCell.clearDataValidations();
      rateCell.setValue("N/A");
      typeCell.setValue("N/A");
    }
  }

  // --- 2. RECALCULATE NET BALANCE ---
  if (col === 3 || col === 4) {
    updateRunningBalance(sheet);
  }
}

function updateCategoryDropdown(sheet, typeValue, row) {
  const cell = sheet.getRange(row, 5);
  let options = [];
  
  if (typeValue === "Expense") options = ['Rent/EMI', 'Food', 'Groceries', 'Travel', 'Shopping', 'Medical', 'Bills', 'Entertainment'];
  else if (typeValue === "Debt Taken") options = ['Personal Loan', 'Credit Card Swipe', 'Borrowed from Friend', 'Car Loan Disbursed', 'Home Loan Disbursed'];
  else if (typeValue === "Debt Repayment") {
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const data = sheet.getRange(2, 4, lastRow - 1, 2).getValues();
      const debts = new Set();
      data.forEach(r => {
        if (r[0] === "Debt Taken" && r[1]) debts.add(String(r[1]).trim());
      });
      options = Array.from(debts);
    }
    if (options.length === 0) options = ['No Active Debts Found'];
  }
  else if (typeValue === "Investment") options = ['Stocks', 'SIP', 'Gold', 'Crypto', 'FD', 'Real Estate'];
  else if (typeValue === "Savings") options = ['Salary', 'Bonus', 'Business Profit', 'Rent Income', 'Interest'];

  if (options.length > 0) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(options, true).setAllowInvalid(typeValue === "Debt Repayment").build();
    cell.setDataValidation(rule);
  } else {
    cell.clearDataValidations(); // FIXED: Plural
  }
}

function updateInterestDropdown(sheet, typeValue, row) {
  const intRateCell = sheet.getRange(row, 6); 
  const intTypeCell = sheet.getRange(row, 7); 
  
  if (typeValue === "Debt Taken") {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['IPA (Simple Interest)', 'CIPA (Compound Interest)'], true)
      .build();
    intTypeCell.setDataValidation(rule);
    
    if (intRateCell.getValue() === "N/A") intRateCell.setValue("");
    if (intTypeCell.getValue() === "N/A") intTypeCell.setValue("");
    
  } else {
    // FIXED: Use clearDataValidations() (Plural)
    intTypeCell.clearDataValidations();
    intRateCell.setValue("N/A");
    intTypeCell.setValue("N/A");
  }
}

function updateRunningBalance(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const range = sheet.getRange(2, 3, lastRow - 1, 2); 
  const values = range.getValues();
  
  let runningBalance = 0;
  const balanceOutput = [];

  for (let i = 0; i < values.length; i++) {
    const amount = parseFloat(values[i][0]) || 0; 
    const type = values[i][1]; 

    if (type === "Savings" || type === "Debt Taken") {
      runningBalance += amount;
    } else {
      runningBalance -= amount;
    }
    balanceOutput.push([runningBalance]);
  }

  sheet.getRange(2, 8, balanceOutput.length, 1).setValues(balanceOutput);
}

/**
 * ------------------------------------------------------------------
 * DATA PROCESSING & API
 * ------------------------------------------------------------------
 */

function getDashboardData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  
  const data = sheet.getRange(2, 1, lastRow - 1, 8).getDisplayValues();
  
  return data.map((row, index) => {
    const amount = parseFloat(row[2]) || 0;
    const type = row[3];
    const interestRate = (row[5] === "N/A" || row[5] === "") ? 0 : parseFloat(row[5]);
    const interestType = row[6];
    const year = row[0];
    const month = row[1];

    let accruedInterest = 0;
    if (type === 'Debt Taken' && interestRate > 0) {
      accruedInterest = calculateInterest(amount, interestRate, interestType, year, month);
    }

    return {
      rowIndex: index,
      year: year,
      month: month,
      amount: amount,
      type: type,
      category: row[4],
      interestRate: interestRate,
      interestType: interestType,
      net: row[7],
      accruedInterest: accruedInterest
    };
  });
}

function calculateInterest(principal, rate, type, yearStr, monthStr) {
  const monthMap = { "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11 };
  const year = parseInt(yearStr);
  const month = monthMap[monthStr];
  
  if (isNaN(year) || month === undefined) return 0;

  const debtDate = new Date(year, month, 1);
  const diffTime = new Date() - debtDate;
  const timeInYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  if (timeInYears <= 0) return 0;

  if (type && type.includes("CIPA")) {
    return (principal * Math.pow((1 + (rate / 100)), timeInYears)) - principal;
  } else {
    return principal * (rate / 100) * timeInYears;
  }
}

function addTransaction(form) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  let iRate = "N/A", iType = "N/A";
  if (form.type === "Debt Taken") {
    iRate = form.interestRate || "";
    iType = form.interestType || "";
  }

  sheet.appendRow([
    form.year, form.month, form.amount, form.type, form.category, 
    iRate, iType, ""
  ]);
  
  const newRow = sheet.getLastRow();
  updateCategoryDropdown(sheet, form.type, newRow);
  updateInterestDropdown(sheet, form.type, newRow);
  updateRunningBalance(sheet);
  return "Success";
}

function deleteTransaction(rowIndex) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.deleteRow(rowIndex + 2);
  updateRunningBalance(sheet);
  return "Deleted";
}

function fixDataValidation() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  const types = sheet.getRange(2, 4, lastRow - 1).getValues();
  for (let i = 0; i < types.length; i++) {
    updateCategoryDropdown(sheet, types[i][0], i + 2);
    
    const rateCell = sheet.getRange(i+2, 6);
    const typeCell = sheet.getRange(i+2, 7);
    const typeVal = types[i][0];
    
    if (typeVal === "Debt Taken") {
       const rule = SpreadsheetApp.newDataValidation().requireValueInList(['IPA (Simple Interest)', 'CIPA (Compound Interest)'], true).build();
       typeCell.setDataValidation(rule);
    } else {
       // FIXED: Use clearDataValidations() (Plural)
       typeCell.clearDataValidations();
       if (!rateCell.getValue()) rateCell.setValue("N/A");
       if (!typeCell.getValue()) typeCell.setValue("N/A");
    }
  }
  updateRunningBalance(sheet);
}

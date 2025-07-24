export const userOffices = ["Naekana", "Kasese", "Libera Impex", "Libera Executive", "Kangema", "Aberdere", "Ungwana","Defense Office"];
export const serviceMap = {
  "Naekana": ["Mzigo", "Deductions"],
  "Kasese": ["Mzigo", "TKT"],
  "Libera Impex": ["Mzigo","TKT"],
  "Libera Executive": ["Mzigo"],
  "Kangema": ["TKT"],
  "Aberdere": ["TKT"],
  "Ungwana": ['TKT'],
  "Defense Office": ['Defoca']
};
export const issueTypes = {
  Mzigo: ["Login Failure", "Sync Error", "Hardware Issue"],
  TKT: ["Printer Offline", "Network Problem", "Software Crash"],
  Defoca: ["Payment Failure", "Invoice Error"],
  Deductions: ["Calculation Error", "Report Generation"],
};

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

export const mockGetAnalytics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          status_counts: [
            { status: 'unresolved', count: 12 },
            { status: 'in_progress', count: 8 },
            { status: 'resolved', count: 23 }
          ],
          issues_created: {
            today: 5,
            week: 28,
            month: 112
          },
          avg_resolution_time: 18.5,
          office_distribution: [
            { office__name: 'Nairobi', count: 45 },
            { office__name: 'Nakuru', count: 32 },
            { office__name: 'Mombasa', count: 22 }
          ],
          service_distribution: [
            { service__name: 'TKT', count: 23 },
            { service__name: 'Defoca', count: 18 },
            { service__name: 'Mzigo', count: 15 },
            { service__name: 'Collections', count: 10 }
          ],
          recent_activity: [
            {
              id: 123,
              type: 'Login Issue',
              status: 'resolved',
              updated_at: new Date().toISOString()
            },
            {
              id: 124,
              type: 'Payment Failure',
              status: 'in_progress',
              updated_at: new Date(Date.now() - 3600000).toISOString()
            }
          ]
        }
      });
    }, 500); // Simulate network delay
  });
};
export const url = "https://issue-tracker-jywg.onrender.com/api";

export async function authenticateUser(data) {
  const response = await fetch(url + "/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    console.log(resData.detail);
    return resData.detail;
  }

  return resData;
}

export async function getOffices() {
  const response = await fetch(url + "/offices/list/", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          }});
  const resData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    return errorData.detail;
  }

  return resData;
}

export async function getServices() {
     try {
    const response = await fetch(url + "/services/list/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    const services = await response.json();
    return services;
    
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function reportIssue(formData) {
    const accessToken = sessionStorage.getItem("accessToken")
     const response = await fetch(url + "/issues/create/", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: formData
  });
  const resData = await response.json();

  return resData;
}

export async function listAllIssues() {
     try {
    const response = await fetch(url + "/issues/list/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }

    const issues = await response.json();
    return issues;
    
  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

export async function getIssueDetails(issueId) {
  console.log(issueId)
     try {
    const response = await fetch(url + "/issues/list/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(issueId)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }

    const issueDetails = await response.json();
    return issueDetails.data;
    
  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

// api/issues.js
export async function resolveIssue(issueId) {
  const response = await fetch(url + "/issues/update/", {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({id: issueId})
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resolve issue");
  }

  const resData = await response.json();

  return resData;
}


export async function deleteIssue(issueId) {
  const response = await fetch(url + "/issues/delete/", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({id: issueId})
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resolve issue");
  }

  const resData = await response.json();
  console.log(resData)

  return resData;
}

export async function unResolveIssue(issueId) {
  const response = await fetch(url + "/issues/update/", {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: JSON.stringify({id: issueId, status: "unsolved"})
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resolve issue");
  }

  const resData = await response.json();

  return resData;
}

export async function listResolvedIssues() {
     try {
    const response = await fetch(url + "/issues/list/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: "solved"})
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resolved issues');
    }

    const resolvedIssues = await response.json();
    return resolvedIssues;
    
  } catch (error) {
    console.error('Error fetching resolved issues:', error);
  }
}

export async function listResolvedIssuesByDate(date) {
     try {
    const response = await fetch(url + "/issues/list/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: "solved",
        start_date: date.startDate,
        end_date: date.endDate
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resolved issues');
    }

    const resolvedIssues = await response.json();
    return resolvedIssues;
    
  } catch (error) {
    console.error('Error fetching resolved issues:', error);
  }
}

export async function listUnResolvedIssues() {
     try {
    const response = await fetch(url + "/issues/list/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: "unsolved"})
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unresolved issues');
    }

    const unresolvedIssues = await response.json();
    return unresolvedIssues;
    
  } catch (error) {
    console.error('Error fetching unresolved issues:', error);
  }
}

export async function listUnResolvedIssuesByDate(date) {
     try {
    const response = await fetch(url + "/issues/list/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: "unsolved",
        start_date: date.startDate,
        end_date: date.endDate
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unresolved issues');
    }

    const unresolvedIssues = await response.json();
    return unresolvedIssues;
    
  } catch (error) {
    console.error('Error fetching unresolved issues:', error);
  }
}


export async function updateTopUp(formData) {
    const accessToken = sessionStorage.getItem("accessToken")
     const response = await fetch(url + "/data-bundles/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
    office: formData.office,
    sim_number: formData.sim_number,
    amount: Number(formData.amount),
    purchase_date: formData.date,
    notes: "Monthly data bundle for office internet"

    }),
  });
  const resData = await response.json();

  return resData;
}

export async function getAllTopUps() {
     try {
    const response = await fetch(url + "/data-bundles/list/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top-ups');
    }

    const topUps = await response.json();
    return topUps;
    
  } catch (error) {
    console.error('Error fetching ', error);
  }
}
export async function getAllTopUpsByDate(date) {
     try {
    const response = await fetch(url + `/data-bundles/list/?start_date=${date.startDate}&end_date=${date.endDate}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top-ups');
    }

    const topUps = await response.json();
    return topUps;
    
  } catch (error) {
    console.error('Error fetching ', error);
  }
}

export async function getAnalytics() {
       try {
    const response = await fetch(url + "/issues/analytics/", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }

    const analytics = await response.json();
    return analytics;
    
  } catch (error) {
    console.error('Error fetching analytics', error);
  }
}

export async function fetchUsers() {
       try {
    const response = await fetch(url + "/users/", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();
    console.log(users)
    return users;
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

export async function toggleUserStatus(data) {
   const accessToken = sessionStorage.getItem("accessToken")
     const response = await fetch(url + "/users/update-status/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  return resData;
}

export async function createOffices(formData) {
      try {
      const response = await fetch(url + '/offices/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log(response.status)

      const data = await response.json();
      // console.log(data.errors.name[0])

      if (!response.ok) {
       return 
      }

      return data
    } catch (error) {
      console.log(error.message) 
    } finally {
      // setIsSubmitting(false);
    }
}
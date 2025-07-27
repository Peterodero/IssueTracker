const url = "https://issue-tracker-jywg.onrender.com/api/";

export async function authenticateUser(data) {
  const response = await fetch(url + "auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.detail);
    return errorData.detail;
  }

  console.log(resData);

  return resData;
}

export async function getOffices() {
  const response = await fetch(url + "offices/list/", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          }});
  const resData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.detail);
    return errorData.detail;
  }

  return resData;
}

export async function getServices() {
     try {
    const response = await fetch(url + "services/list/", {
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
     const response = await fetch(url + "issues/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
    ...formData,
    status: "unsolved", 
    assigned_to: "552b97e1-8ff9-4331-8559-47e11eecf555"

    }),
  });
  const resData = await response.json();

//   if (!response.ok) {
//     const errorData = await response.json();
//     console.log(errorData.detail);
//     return errorData.detail;
//   }

  console.log(resData);

  return resData;
}

export async function listAllIssues() {
     try {
    const response = await fetch(url + "issues/list/", {
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
    console.log(issues[0])
    return issues;
    
  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

// api/issues.js
export async function resolveIssue(issueId, resolutionData) {
  const response = await fetch(url + `issues/${issueId}/resolve/`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(resolutionData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resolve issue");
  }

  return await response.json();
}

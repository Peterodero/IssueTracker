export const url = "https://issue-tracker-jywg.onrender.com/api";

let isRefreshing = false;
let refreshSubscribers = [];

export async function refreshAuthToken() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  // Check if refresh token is expired
  if (isTokenExpired(refreshToken)) {
    throw new Error("Refresh token expired");
  }

  try {
    console.log("Trying refetch after ");
    const response = await fetch(url + "/auth/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      // Handle specific refresh token errors
      if (response.status === 401) {
        console.log("Handle specific refresh token errors");
        throw new Error("REFRESH_TOKEN_EXPIRED");
      }
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    sessionStorage.setItem("accessToken", data.access);
    sessionStorage.setItem("refreshToken", data.refresh);
    return data.access;
  } catch (error) {
    // Clear tokens on refresh failure
    clearSession();

    if (error.message === "REFRESH_TOKEN_EXPIRED") {
      throw new Error("REFRESH_TOKEN_EXPIRED");
    }
    throw error;
  }
}

// Helper function to check token expiry
export function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// Helper function to clear session
export function clearSession() {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("username");
}

// Enhanced authFetch with complete expiry handling
export async function authFetch(input, options = {}) {
  let accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // Check if refresh token is expired upfront
  if (refreshToken && isTokenExpired(refreshToken)) {
    clearSession();
    window.location.href = "/login?error=session_expired";
    throw new Error("REFRESH_TOKEN_EXPIRED");
  }

  const headers = { ...options.headers };

  // const headers = {
  //   'Content-Type': 'application/json',
  //   ...options.headers,
  // };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(input, { ...options, headers });

  // Handle token expiration (401)
  if (response.status === 401 && accessToken && refreshToken) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newAccessToken = await refreshAuthToken();
        isRefreshing = false;

        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];

        headers["Authorization"] = `Bearer ${newAccessToken}`;
        response = await fetch(input, { ...options, headers });
      } catch (error) {
        isRefreshing = false;
        refreshSubscribers = [];

        if (error.message === "REFRESH_TOKEN_EXPIRED") {
          clearSession();
          window.location.href = "/login?error=session_expired";
        }
        throw error;
      }
    } else {
      return new Promise((resolve, reject) => {
        refreshSubscribers.push((newToken) => {
          headers["Authorization"] = `Bearer ${newToken}`;
          fetch(input, { ...options, headers })
            .then(resolve)
            .catch(reject);
        });
      });
    }
  }

  return response;
}

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
    return resData.detail;
  }

  return resData;
}

export async function getSaccos() {
  const response = await authFetch(url + "/saccos/list/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    return errorData.detail;
  }

  return resData;
}

export async function getAllOffices() {
  const response = await authFetch(url + "/offices/list/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch offices");
  const offices = await response.json();

  return offices;
}

export async function getSaccoOffices(saccoId) {
  const response = await authFetch(url + `/offices/list/?sacco_id=${saccoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   saccoId: saccoId
    // })
  });
  if (!response.ok) throw new Error("Failed to fetch offices");
  const offices = await response.json();

  return offices;
}

export async function getServices() {
  try {
    const response = await authFetch(url + "/services/list/", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const services = await response.json();
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function reportIssue(formData) {
  console.log(formData);
  const response = await authFetch(url + "/issues/create/", {
    method: "POST",
    body: formData,
  });
  const resData = await response.json();

  return resData;
}

export async function listAllIssues() {
  try {
    const response = await authFetch(url + "/issues/list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch issues");
    }

    const issues = await response.json();
    return issues;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

export async function getIssueDetails(issueId) {
  try {
    const response = await authFetch(url + "/issues/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueId),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch issues");
    }

    const issueDetails = await response.json();
    return issueDetails.data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}

// api/issues.js
export async function resolveIssue(issueId) {
  const response = await authFetch(url + "/issues/update/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: issueId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resolve issue");
  }

  const resData = await response.json();

  return resData;
}

export async function deleteIssue(issueId) {
  const response = await authFetch(url + "/issues/delete/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: issueId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to resolve issue");
  }

  const resData = await response.json();

  return resData;
}

export async function unResolveIssue(issueId) {
  const response = await authFetch(url + "/issues/update/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: issueId, status: "unsolved" }),
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
    const response = await authFetch(url + "/issues/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "solved" }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch resolved issues");
    }

    const resolvedIssues = await response.json();
    return resolvedIssues;
  } catch (error) {
    console.error("Error fetching resolved issues:", error);
  }
}

export async function listResolvedIssuesByDate(searchIssues) {
  try {
    const response = await authFetch(url + "/issues/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "solved",
        start_date: searchIssues.startDate,
        end_date: searchIssues.endDate,
        office_id: searchIssues.sacco,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch resolved issues");
    }

    const resolvedIssues = await response.json();
    return resolvedIssues;
  } catch (error) {
    console.error("Error fetching resolved issues:", error);
  }
}

export async function listUnResolvedIssues() {
  try {
    const response = await authFetch(url + "/issues/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "unsolved" }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch unresolved issues");
    }

    const unresolvedIssues = await response.json();
    return unresolvedIssues;
  } catch (error) {
    console.error("Error fetching unresolved issues:", error);
  }
}

export async function listUnResolvedIssuesByDate(searchIssues) {
  try {
    const response = await authFetch(url + "/issues/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "unsolved",
        start_date: searchIssues.startDate,
        end_date: searchIssues.endDate,
        office_id: searchIssues.sacco,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch unresolved issues");
    }

    const unresolvedIssues = await response.json();
    return unresolvedIssues;
  } catch (error) {
    console.error("Error fetching unresolved issues:", error);
  }
}

export async function addComment(issueId, text) {
  const response = await authFetch(url + "/issues/comments/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      issue: issueId,
      text: text,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to add comment");
  }
  return response.json();
}

export async function updateTopUp(formData) {
  const response = await authFetch(url + "/data-bundles/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sacco: formData.sacco,
      office: formData.office,
      sim_number: formData.sim_number,
      amount: Number(formData.amount),
      purchase_date: formData.date,
      notes: "Monthly data bundle for office internet",
    }),
  });
  const resData = await response.json();

  return resData;
}

export async function getAllTopUps() {
  try {
    const response = await authFetch(url + "/data-bundles/list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch top-ups");
    }

    const topUps = await response.json();
    console.log(topUps)
    return topUps;
  } catch (error) {
    console.error("Error fetching ", error);
  }
}
export async function getAllTopUpsByDate(date) {
  try {
    const response = await authFetch(
      url +
        `/data-bundles/list/?start_date=${date.startDate}&end_date=${date.endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // headers: {
        //   Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        //   "Content-Type": "application/json",
        // },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top-ups");
    }

    const topUps = await response.json();
    return topUps;
  } catch (error) {
    console.error("Error fetching ", error);
  }
}

export async function getAnalytics() {
  try {
    const response = await authFetch(url + "/issues/analytics/", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
      // headers: {
      //   Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      //   "Content-Type": "application/json",
      // },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch analytics");
    }

    const analytics = await response.json();
    return analytics;
  } catch (error) {
    console.error("Error fetching analytics", error);
  }
}

export async function fetchUsers() {
  try {
    const response = await authFetch(url + "/users/", {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
    },
      // headers: {
      //   Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      //   "Content-Type": "application/json",
      // },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function toggleUserStatus(data) {
  const response = await authFetch(url + "/users/update-status/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${accessToken}`,
    // },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  return resData;
}

export async function createSaccos(formData) {
  try {
    const response = await authFetch(url + "/saccos/create/", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    // console.log(data.errors.name[0])

    if (!response.ok) {
      return;
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function createOffices(officeName) {
  try {
    const response = await authFetch(url + "/offices/create/", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ name: officeName.name }),
    });

    return response;
  } catch (error) {
    console.log(error.message);
  }
}

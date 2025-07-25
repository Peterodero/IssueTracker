const url = "https://issue-tracker-jywg.onrender.com/api/"

export async function authenticateUser(data) {
    try {
        const response = await fetch(url + "auth/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      console.log(response)


    } catch (error) {
        console.error('Login error:', error);
    }
   
}
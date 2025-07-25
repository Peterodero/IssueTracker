const url = ""

export async function authenticateUser(data) {
    try {
         const response = await fetch(url, {
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

      

    } catch (error) {
        console.error('Login error:', error);
    }
   
}
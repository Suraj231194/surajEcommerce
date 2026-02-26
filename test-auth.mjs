async function testAuth() {
    const baseUrl = 'http://localhost:3002/api/auth';
    const email = `test${Date.now()}@example.com`;
    const password = 'password123';

    console.log('Testing Signup...');
    try {
        const signupRes = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName: 'Test', lastName: 'User' }),
        });

        console.log('Signup Status:', signupRes.status);
        const signupText = await signupRes.text();
        console.log('Signup Body:', signupText);

        if (signupRes.status === 201 || signupRes.status === 200) {
            console.log('Testing Login...');
            const loginRes = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            console.log('Login Status:', loginRes.status);
            const loginText = await loginRes.text();
            console.log('Login Body:', loginText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testAuth();

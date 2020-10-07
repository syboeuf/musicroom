export default function authHeader(token) {
    console.log("token :", token)
    if (token !== null) {
        if (token.length !== 0) {
            return { "Authorization": "Bearer " + token };
            // return { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQxMCRHUFNBYUZWd21kWFFSRjVURFoudzRlb2hDalZxd1pUYU5qRi8yeHNLUWEyRnRnbHFNa3JqVyIsImRhdGEiOiI1ZjBiMWVlYjMwOWJhYTAzNTZjN2IyMTAiLCJpYXQiOjE1OTQ1NjY4NDYsImV4cCI6MTU5NDYxMDA0Nn0.qgdm6sYJ42-mnyjvlU6UibVxyCyNY6JwF09LzsyrNsM"};
        } else {
            return {};
        }
    }

}
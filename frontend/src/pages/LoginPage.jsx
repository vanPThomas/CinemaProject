import { useState } from "react";
import { useAuth } from "../hooks/useAuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, login } = useAuth();

  const handleLogin = async () => {
    const apiUrl = "http://localhost:3000/users/authenticate";
    const requestBody = {
      email: email,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      if (data.message === "Authentication successful!") {
        login(email); // Set email when the user logs in
        alert("Login successful!");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  const handleCreateUser = async () => {
    const createApiUrl = "http://localhost:3000/users/createuser";
    const createUserBody = {
      email: email,
      password,
    };
    try {
      const response = await fetch(createApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserBody),
      });

      if (!response.ok) {
        console.error("Response not OK:", response.status, response.statusText);
        throw new Error("User creation failed");
      }

      const createdUser = await response.json();
      console.log("User created:", createdUser);
      login(email); // Set email when the user is created and logged in
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred during user creation");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login Page</h2>
      {isLoggedIn ? (
        <p>You are already logged in.</p>
      ) : (
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              E-mail:
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleCreateUser}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;

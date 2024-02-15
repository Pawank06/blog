/**************************** Login User ******************************/


const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Please fill in all fields");
  }

  const res = await fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data; // Return data if needed
};

/**************************** Register User ******************************/

const registerUser = async (name, email, password, confirmPassword) => {
  if(!name || !email || !password || !confirmPassword) {
    throw Error("Please fill in all fields");
  }

  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  const res = await fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw Error(data.error || "Registration failed");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data; // Return data if needed

}

export { loginUser, registerUser };


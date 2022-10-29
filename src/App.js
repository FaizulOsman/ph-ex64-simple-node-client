import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers([...users, data]);
      })
      .catch((e) => console.log(e));

    console.log(user);
    form.reset();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" id="" placeholder="Email" />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h4> Total users: {users.length}</h4>

      {users.map((user) => (
        <p key={user._id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from "react";
// import "./App.css"; // Ensure you have the correct path to your CSS file

// const App = () => {
//   const [fake, setFake] = useState([]);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     gender: ""
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editUserId, setEditUserId] = useState(null);

//   useEffect(() => {
//     fakestore();
//   }, []);

//   const fakestore = async () => {
//     const response = await fetch("http://localhost:8000/api/users");
//     const jsonData = await response.json();
//     setFake(jsonData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editMode) {
//       const updatedUser = { ...formData, id: editUserId };
//       const response = await fetch(`http://localhost:8000/api/users/${editUserId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedUser),
//       });

//       if (response.ok) {
//         const updatedUsers = fake.map((user) =>
//           user.id === editUserId ? updatedUser : user
//         );
//         setFake(updatedUsers);
//         setEditMode(false);
//         setEditUserId(null);
//       }
//     } else {
//       const response = await fetch("http://localhost:8000/api/users", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const newUser = await response.json();
//         setFake([...fake, newUser]);
//       }
//     }
//     setFormData({
//       first_name: "",
//       last_name: "",
//       email: "",
//       gender: ""
//     });
//   };

//   const handleEdit = (user) => {
//     setEditMode(true);
//     setEditUserId(user.id);
//     setFormData({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       email: user.email,
//       gender: user.gender
//     });
//   };

//   const handleDelete = async (userId) => {
//     const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       const updatedUsers = fake.filter((user) => user.id !== userId);
//       setFake(updatedUsers);
//     }
//   };

//   return (
//     <>
//       <h2>Divyansh API Store</h2>
//       <div className="container">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             placeholder="First Name"
//             required
//           />
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//             placeholder="Last Name"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="text"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             placeholder="Gender"
//             required
//           />
//           <button type="submit">{editMode ? "Update User" : "Add User"}</button>
//         </form>
//         {fake.map((values) => (
//           <div className="box" key={values.id}>
//             <div className="content">
//               <h5>Id: {values.id}</h5>
//               <p>First Name: {values.first_name}</p>
//               <p>Last Name: {values.last_name}</p>
//               <p>Email: {values.email}</p>
//               <p>Gender: {values.gender}</p>
//               <button onClick={() => handleEdit(values)}>Edit</button>
//               <button onClick={() => handleDelete(values.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default App;











import React, { useState, useEffect } from "react";
import "./App.css"; // Ensure you have the correct path to your CSS file

const App = () => {
  const [fake, setFake] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fakestore();
  }, []);

  const fakestore = async () => {
    const response = await fetch("http://localhost:8000/api/users");
    const jsonData = await response.json();
    setFake(jsonData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedUser = { ...formData, id: editUserId };
      const response = await fetch(`http://localhost:8000/api/users/${editUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUsers = fake.map((user) =>
          user.id === editUserId ? updatedUser : user
        );
        setFake(updatedUsers);
        setEditMode(false);
        setEditUserId(null);
        setMessage("Update successful!");
      }
    } else {
      const response = await fetch("http://localhost:8000/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setFake([...fake, newUser]);
        setMessage("User added successfully!");
      }
    }
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      gender: ""
    });
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditUserId(user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      gender: user.gender
    });
  };

  const handleDelete = async (userId) => {
    const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedUsers = fake.filter((user) => user.id !== userId);
      setFake(updatedUsers);
      setMessage("User deleted successfully!");
    }
  };

  return (
    <>
      <h2>Divyansh API Store</h2>
      {message && <p>{message}</p>}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            required
          />
          <button type="submit">{editMode ? "Update User" : "Add User"}</button>
        </form>
        {fake.map((values) => (
          <div className="box" key={values.id}>
            <div className="content">
              <h5>Id: {values.id}</h5>
              <p>First Name: {values.first_name}</p>
              <p>Last Name: {values.last_name}</p>
              <p>Email: {values.email}</p>
              <p>Gender: {values.gender}</p>
              <button onClick={() => handleEdit(values)}>Edit</button>
              <button onClick={() => handleDelete(values.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;


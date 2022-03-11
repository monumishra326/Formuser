import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user.css";

const Userform = () => {
  const [userdata, setuserdata] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    department: "",
    Married: "",
    Unmarried: "",
    salary: "",
  });
  const [getdata, setgetdata] = useState([]);

  const handleinput = (e) => {
    const { id, value } = e.target;
    setuserdata({ ...userdata, [id]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/userdata", userdata).then(() => {
      alert("data submitted");
      setuserdata({
        name: "",
        age: "",
        email: "",
        address: "",
        department: "",
        Married: "",
        Unmarried: "",
        salary: "",
      });

      details();
    });
  };
  const details = () => {
    axios.get("http://localhost:3001/userdata").then((res) => {
     
      var alldata = res.data;
      setgetdata(alldata);
    });
  };
  useEffect(() => {
    details();
  }, []);

  

  return (
    <>
      <form>
        <input
          id="name"
          type="text"
          onChange={handleinput}
          placeholder="name"
        />
        <input
          id="email"
          type="email"
          onChange={handleinput}
          placeholder="email"
        />
        <input id="age" type="text" onChange={handleinput} placeholder="age" />
        <input
          id="address"
          type="text"
          onChange={handleinput}
          placeholder="address"
        />
        <input
          id="salary"
          type="Number"
          onChange={handleinput}
          placeholder="salary"
        />
        <select name="" id="department" onChange={handleinput}>
          <option value="Learning and development">
            Learning and development
          </option>
          <option value="Product development">Product development</option>
          <option value="Admin department">Admin department</option>
          <option value="HR">HR</option>
        </select>
        <label htmlFor="">Married</label>
        <input id="Married" type="checkbox" value="✔" onChange={handleinput} />
        <label htmlFor="">Unmarried</label>
        <input
          id="Unmarried"
          type="checkbox"
          value="✔"
          onChange={handleinput}
        />
        <input id="handle" type="submit" value="submit" onClick={handlesubmit} />
      </form>

      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <td className="detail">Name</td>
            <td className="detail">Age</td>
            <td className="detail">Address</td>
            <td className="detail">Email</td>
            <td className="detail">Department</td>
            <td className="detail">Married</td>
            <td className="detail">Unmarried</td>
          </tr>
        </thead>
        {getdata.map((e) => {
          return (
            <tr>
              <td>{e.name}</td>
              <td>{e.age}</td>
              <td>{e.address}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>{e.Married}</td>
              <td>{e.Unmarried}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Userform;
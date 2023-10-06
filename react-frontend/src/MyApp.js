// src/MyApp.js
import React, { useState, useEffect } from "react";
import axios, { HttpStatusCode } from "axios";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  function removeOneCharacter(index) {
    const id = characters[index].id;
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
    makeDeleteCall(id);
  }
  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === HttpStatusCode.Created)
        setCharacters([...characters, result.data]);
    });
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post("http://localhost:8000/users", person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:8000/users");
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete(`http://localhost:8000/users/${id}`);
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  return (
    <div>
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    </div>
  );
}
export default MyApp;

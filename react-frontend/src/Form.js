// src/Form.js
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: "",
  });
  // Add the following code to src/Form.js
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job") {
      console.log("setting job");
      setPerson({ name: person["name"], job: value });
    } else {
      console.log("setting name");
      setPerson({ name: value, job: person["job"] });
    }
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}
export default Form;
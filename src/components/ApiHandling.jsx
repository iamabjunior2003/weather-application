import React, { useState } from "react";

export default function ApiHandling() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("https://api.github.com/users/hadley/orgs");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error while fetching API details:", error);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={getData}>Get Data</button>
       {data.map((org) => (
        <div
          key={org.id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            margin: "8px 0",
            borderRadius: "6px",
          }}
        >
          <h3>{org.login}</h3>
          <p><strong>ID:</strong> {org.id}</p>
          <p><strong>URL:</strong> <a href={org.url}>{org.url}</a></p>
          <p><strong>Description:</strong> {org.description || "—"}</p>
          <img src={org.avatar_url} alt={org.login} width={50} />
        </div>
      ))}
    </div>
  );
}
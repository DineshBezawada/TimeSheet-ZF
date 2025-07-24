import React, { useEffect, useState } from "react";

const Test = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/users");
      const users = await res.json();
      console.log(users, "users");
      setUsers(users);
    } catch (err) {
      console.log(err, "err");
    }
  };

 function fetchWithTimeout(timeout = 5000) {
  console.log("Starting fetch with artificial delay...");

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      console.log("Request timed out");
      reject(new Error("Request timed out after 5 seconds"));
    }, timeout);

    // Simulate slow fetch (6s delay)
    setTimeout(() => {
      fetch("https://fakestoreapi.com/users")
        .then((response) => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch((error) => {
          clearTimeout(timer);
          reject(error);
        });
    }, 6000); // Delayed fetch start
  });
}

  // const handlErr = () => {
  //   setTimeout(() => {
  //     const fallback = new Promise((res, rej) => {
  //       rej(() => {
  //         console.log("error");
  //       });
  //     });
  //     fallback
  //       .then(() => {
  //         console.log("then");
  //       })
  //       .catch(() => {
  //         console.log("err");
  //       });
  //   }, 5000);
  // };
  // handlErr();

 useEffect(() => {
  // fetchUsers();
    fetchWithTimeout()
      .then((res) => res.json())
      .then((data) => console.log("Fetched data:", data))
      .catch((err) => {
        console.error("Caught error:", err.message);
      });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <div className="users">
        {users?.length &&
          users?.map((user) => {
            const isValidCity = user?.address?.city !== "kilcoole";
            return (
              <React.Fragment key={user?.id}>
                {isValidCity && (
                  <div className="card">
                    <h2>{user?.name?.firstname}</h2>
                    <h2>{user?.name?.lastname}</h2>
                    <p>{user?.address?.city}</p>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Test;

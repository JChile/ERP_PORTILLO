import React from "react";
import { useState } from "react";

export const DetailUsuarios = () => {
  const userObject = {
    username: "user",
    firstName: "Andrew",
    lastName: "Pold",
    email: "example@example.com",
    groups: [2],
  };

  const [user, setUser] = useState(userObject);

  const { username, firstName, lastName, email, groups } = user;

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="p-3 border-[1px] flex items-center gap-x-5">
        <div
          style={{
            background: "black",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "22px",
          }}
        >
          {firstName[0]}
          {lastName[0]}
        </div>

        <h1 className="text-2xl">
          {firstName} {lastName}
        </h1>
      </div>

      <div className="p-3 border-[1px] flex flex-col gap-y-4">
        <h2 className="text-xl">Login y rol de usuario</h2>
        <hr />

        <div className="flex flex-col md:flex-row min-w-[242px] gap-x-2 gap-y-3">
          <div className="w-full flex flex-col gap-y-3">
            <label className="block flex gap-y-1 min-w-full">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Nombre usuario
              </span>
              <span className="block text-sm">{username}</span>
            </label>

            <label className="block flex gap-y-1 ">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Nombre
              </span>
              <span className="block text-sm">{firstName}</span>
            </label>
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <label className="block flex gap-y-1 ">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Email trabajo
              </span>
              <span className="block text-sm">{email}</span>
            </label>

            <label className="block flex gap-y-1 ">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Apellido
              </span>
              <span className="block text-sm">{lastName}</span>
            </label>

            <label className="block flex gap-y-1 ">
              <span className="block text-sm font-medium min-w-[10rem] text-zinc-500">
                Rol
              </span>
              <span className="block text-sm">{groups[0]}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { sha256 } from "crypto-hash";
import { useRouter } from "next/router";

import Seo from "./components/Seo";

export default function Login() {
  const router = useRouter();

  const [inputID, setinputID] = useState("");
  const [inputPW, setinputPW] = useState("");
  const [alert, setalert] = useState("");

  const tryAccount = async () => {
    const res = await fetch("http://localhost:3000/api/checkAccount", {
      method: "POST",
      body: JSON.stringify({
        ID: inputID,
        PW: await sha256(inputPW),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  const handleBtn = async (e) => {
    e.preventDefault();

    console.log(`ID: ${inputID}, PW: ${inputPW}`);

    if (!inputID || !inputPW || inputID.length < 3 || inputPW.length < 5) {
      // remove basic chances
      setalert("Incorrect ID or PW.");
    } else {
      // try requesting
      let res = await tryAccount();
      console.log("res: " + res);
      res = await JSON.parse(res);
      if (res.msg == "true") {
        console.log(1);
        router.push("/home");
      } else {
        console.log(2);
        setalert("Incorrect ID or PW.");
      }
    }
  };

  return (
    <div id="body">
      <Seo title="Droop | Login" />

      <input
        value={inputID}
        onChange={(e) => setinputID(e.target.value)}
        type="text"
        placeholder="ID"
      />
      <br />
      <input
        value={inputPW}
        onChange={(e) => setinputPW(e.target.value)}
        type="password"
        placeholder="PW"
      />
      <br />

      {alert != "" ? (
        <>
          <span id="span_alert">{alert}</span>
          <br />
        </>
      ) : (
        <></>
      )}

      <button id="btn" onClick={handleBtn}>
        Login
      </button>

      <style jsx>{`
        #body {
          text-align: center;
          margin: 2em;
        }
        input {
          border: 2px solid black;
          margin: 1em;
          padding: 1em;
          background: none;
          border-radius: 0.6em;
          width: 16em;
          border-radius: 8em;
          transition-duration: 500ms;
        }
        input:hover,
        input:focus {
          border-radius: 0.6em;
        }

        #span_alert {
          color: #ff5050;
        }

        #btn {
          width: 16em;
          padding-top: 1em;
          padding-bottom: 1em;
          border: 2px solid black;
          background: none;
          border-radius: 8em;
          transition-duration: 500ms;
          margin: 1em;
        }
        #btn:hover {
          border-radius: 0.6em;
        }
      `}</style>
    </div>
  );
}

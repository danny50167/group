import { useState } from "react";
import { useRouter } from "next/router";
import { sha256 } from "crypto-hash";

import Seo from "./components/Seo";

export default function Signup({ data }) {
  const router = useRouter();

  const [inputID, setInputID] = useState("");
  const [inputNick, setInputNick] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [alert_id, setAlert_id] = useState("");
  const [alert_nick, setAlert_nick] = useState("");
  const [alert_pw, setAlert_pw] = useState("");

  const isIDDuplicate = (isID) => {
    if (isID == true) {
      setAlert_id("This ID is already used.");
    } else if (isID == false) {
      setAlert_id("");
    }
  };

  const submitAccount = async (ID, nick, PW) => {
    const res = await fetch("http://localhost:3000/api/createAccount", {
      method: "POST",
      body: JSON.stringify({
        ID: ID,
        nick: nick,
        PW: await sha256(PW),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ID duplicate check
    if (inputID && !data[inputID] && inputID.length >= 3) {
      isIDDuplicate(false);

      // 2. nick length check
      if (inputNick.length > 12 || inputNick.length < 3) {
        setAlert_nick("Nickname should be 3~15 letters.");
      } else {
        setAlert_nick("");

        // 3. pw min length check
        if (inputPW.length < 5) {
          setAlert_pw("Password should be at least 5 letters.");
        } else {
          setAlert_pw("");

          // 4. set POST request to API
          submitAccount(inputID, inputNick, inputPW);

          // 5. switch route
          router.push("/login");
        }
      }
    } else {
      isIDDuplicate(true);
    }
  };

  return (
    <div id="body">
      <Seo title="Droop | Signup" />

      <input
        type="text"
        placeholder="ID"
        value={inputID}
        maxLength="12"
        onChange={(e) => setInputID(e.target.value)}
      />
      {alert_id != "" ? (
        <>
          <br />
          <span id="span_alert">{alert_id}</span>
        </>
      ) : (
        <></>
      )}
      <br />
      <input
        type="text"
        placeholder="Nickname"
        value={inputNick}
        maxLength="12"
        onChange={(e) => setInputNick(e.target.value)}
      />
      {alert_nick != "" ? (
        <>
          <br />
          <span id="span_alert">{alert_nick}</span>
        </>
      ) : (
        <></>
      )}
      <br />
      <input
        type="password"
        placeholder="Password"
        value={inputPW}
        maxLength="30"
        onChange={(e) => setInputPW(e.target.value)}
      />
      {alert_pw != "" ? (
        <>
          <br />
          <span id="span_alert">{alert_pw}</span>
        </>
      ) : (
        <></>
      )}
      <br />
      <button id="btn" onClick={handleSubmit}>
        Create Account
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
          color: red;
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

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/userDB`);
  let data = await res.json();
  data = JSON.parse(data);
  console.log(data);

  return { props: { data } };
}

import Link from "next/link";
import Seo from "./components/Seo";

export default function Home() {
  return (
    <div id="body">
      <Seo title="Droop" />
      <div id="main">
        <h1>Droop</h1>
        <h3>Plan and share everything.</h3>
        <br />

        <div id="div_btns">
          <Link href="/signup">
            <a className="btns">Start Now</a>
          </Link>
          <Link href="/login">
            <a className="btns">Login</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        #body {
          display: flex;
          text-align: center;
        }
        #main {
          margin: auto;
        }
        h1 {
          font-size: 6em;
          margin-bottom: 0;
        }
        h3 {
          margin-bottom: 1em;
        }

        a {
          margin: 1em;
          padding: 0.7em 1em;
          border-radius: 50em;
          background: none;
          border: 2px solid black;
          font-size: 1.02em;
          margin-top: 2em;
          transition-duration: 500ms;
        }
        a:hover {
          border-radius: 0.6em;
        }
      `}</style>
    </div>
  );
}

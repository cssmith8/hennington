import * as elements from "typed-html";
import { WebAutoMercyDisplay } from "../commands/automercy";
export const BaseHtml = ({ children, ...other }: any) => (
  <html>
    <head>
      <title>Yapper Bot</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.8"
        integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr"
        crossorigin="anonymous"
      ></script>
      <link rel="stylesheet" href="/public/style.css" />
    </head>
    <body {...other} class="p-8" hx-ws="connect:/pubsub">
      <WebAutoMercyDisplay />
      <button
        class="bg-slate-700 rounded p-2"
        hx-post="/mercytoggle"
        hx-swap="none"
      >
        Toggle mercy status
      </button>
      <div>Message Log:</div>
      <div id="messages"></div>
    </body>
  </html>
);

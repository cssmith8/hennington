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

      <div class="p-2 border border-white">
        <form hx-post="/send" hx-on:after-request="this.reset()">
          <label>Send a message</label>
          <input class="text-black" name="message" />
        </form>
      </div>

      <div class="debug">Message Log:</div>
      <div>Role Log:</div>
      <div id="messages"></div>

      <div>
        <button
          class="bg-slate-700 rounded p-2"
          hx-swap="outerHTML"
          hx-post="/roles"
        >
          Show Roles
        </button>
      </div>
    </body>
  </html>
);

import * as elements from "typed-html";
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
      {children}
    </body>
  </html>
);

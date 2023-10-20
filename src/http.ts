export async function postData(url = "", data: { content: string }) {
  //generate random number with 19 digits
  const random = Math.floor(Math.random() * 10000000000000000000);

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.RPTOKEN!,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      type: 0,
      content: data.content,
      channel_id: "1120455140416172115",
      author: {
        id: "1164630646124195890",
        username: "rphennington",
        avatar: "ba3d60e53155540fb71da74faff6deb4",
        discriminator: "0",
        public_flags: 0,
        premium_type: 0,
        flags: 0,
        banner: null,
        accent_color: null,
        global_name: "Real Person Hennington",
        avatar_decoration_data: null,
        banner_color: null,
      },
      attachments: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: "2023-10-19T22:46:58.785000+00:00",
      edited_timestamp: null,
      flags: 0,
      components: [],
      nonce: random.toString(),
      referenced_message: null,
    }), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

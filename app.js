const express = require("express");
const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const fetch = (await import('node-fetch')).default;
  await fetch("https://webhook.site/44d57a5c-bb18-4dde-b606-0bf0a33acc09", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  res.send("Sent to Webhook.site");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

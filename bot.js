require("dotenv").config();
const express = require("express");
const line = require("@line/bot-sdk");
const {
  messageReply,
  getCandidatePollResult,
  getPartyPollResult,
} = require("./messageReply.js");
const getTime = require("./getTime.js");
const functions = require("@google-cloud/functions-framework");
const welcomeFlexMessage = require("./imagemap/welcome.json");
const serviceAccount = require("./mrming-firebase-adminsdk-ove8r-73d01eb135.json");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const configOptions = require("./configOptions");
const { API_KEY, XER_API_URL } = process.env;
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });
const config = configOptions[process.env.NODE_ENV] || {};
// create LINE SDK client
const client = new line.Client(config);

const app = express();
app.post("/update", express.json(), async (req, res) => {
  const key = req.body.key;
  if (key !== API_KEY) {
    res.send("error key");
  }

  const candidateResult = await getCandidatePollResult(db);
  const partyResult = await getPartyPollResult(db);
  const documentRef = db.collection("weekly_result").doc();

  const dataToWrite = {
    candidate: candidateResult,
    party: partyResult,
    date: new Date(),
    date_string: getTime(),
  };
  await documentRef.set(dataToWrite);
  return res.status(200).end();
});

app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get("/share_candidate_result/:id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  if (id === "latest") {
    try {
      const result = await getCandidatePollResult(db);
      const resultPercent = result.candidate.map((candidate) =>
        ((100 * candidate) / result.total).toFixed(2)
      );
      const data = {
        resultPercent,
        date: getTime(),
        total: result.total,
      };

      res.send(`${JSON.stringify(data)}`);
    } catch {
      res.status(500).end();
    }
  } else {
    try {
      const collectionRef = db.collection("share_candidate_result").doc(id);
      const doc = await collectionRef.get();
      if (doc.exists) {
        const data = doc.data();
        const jsonData = JSON.stringify(data);
        // console.log(jsonData);
        res.send(`${jsonData}`);
      } else {
        res.status(500).end();
      }
    } catch {
      res.status(500).end();
    }
  }
});
app.get("/share_party_result/:id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  try {
    const collectionRef = db.collection("share_party_result").doc(id);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const data = doc.data();
      const jsonData = JSON.stringify(data);
      // console.log(jsonData);
      res.send(`${jsonData}`);
    } else {
      res.status(500).end();
    }
  } catch {
    res.status(500).end();
  }
});
async function handleEvent(event) {
  if (event.type === "follow") {
    return client.replyMessage(event.replyToken, [
      {
        type: "text",
        text: "歡迎加入民調君 (動態全民調)，我們透過專業的人類認證機制確保每張選票都是由真人投下。點擊下方開始驗證，一起參與全民投票全民調!",
      },
      welcomeFlexMessage,
    ]);
  } else if (event.type === "join") {
    // return client.replyMessage(event.replyToken, [
    //   {
    //     type: "text",
    //     text: "歡迎加入民調君 (動態全民調)，我們透過專業的人類認證機制確保每張選票都是由真人投下。點擊下方開始驗證，一起參與全民投票全民調!",
    //   },
    //   welcomeFlexMessage,
    // ]);
  } else if (event.type === "message") {
    const reply = await messageReply(event, client, db);
    if (reply !== "default") {
      return client.replyMessage(event.replyToken, reply);
    }
  } else {
    return Promise.resolve(null);
  }
}
if (process.env.NODE_ENV === "dev") {
  const port = process.env.PORT || 80;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

exports.bot = app;

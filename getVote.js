const { getWeeklyResult } = require("./messageReply");
const serviceAccount = require("./mrming-firebase-adminsdk-ove8r-73d01eb135.json");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

async function getCandidatePollResult(db) {
  const collectionRef = db.collection("candidate_result");
  const result = [
    collectionRef.get(),
    ...Array.from({ length: 6 }, (_, i) =>
      collectionRef.where("candidate", "==", i).get()
    ),
  ];

  var rt;
  await Promise.all(result)
    .then((response) => {
      candidateResult = response.map((item) => item.size);
      rt = {
        total: candidateResult[0],
        candidate: candidateResult.slice(1),
      };
    })
    .catch(() => {
      rt = {}; // TODO error handling
    });

  return rt;
}
async function getPartyPollResult(db) {
  const collectionRef = db.collection("party_result");
  const result = [
    collectionRef.get(),
    ...Array.from({ length: 10 }, (_, i) =>
      collectionRef.where("party", "==", i).get()
    ),
  ];
  var rt;
  await Promise.all(result)
    .then((response) => {
      partyResult = response.map((item) => item.size);
      rt = { total: partyResult[0], party: partyResult.slice(1) };
    })
    .catch(() => {
      rt = {}; // TODO error handling
    });
  return rt;
}
const test = async () => {
  console.log(await getCandidatePollResult(db));
  console.log(await getPartyPollResult(db));
};
test();

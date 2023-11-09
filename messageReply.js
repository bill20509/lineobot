const path = require("path");
const fetch = require("node-fetch");
const welcomeFlexMessage = require("./imagemap/welcome.json");
// const level_0 = require("./imagemap/start_verify_1.json");
// const level_1 = require("./imagemap/level_1.json");
// const level_2 = require("./imagemap/level_2.json");
// const level_3 = require("./imagemap/level_3.json");

const start_verify_1 = require("./imagemap/start_verify_1.json");
const start_verify_2 = require("./imagemap/start_verify_2.json");
const start_verify_3 = require("./imagemap/start_verify_3.json");

const verify_1 = require("./imagemap/verify_1.json");
const verify_2 = require("./imagemap/verify_2.json");
const verify_3 = require("./imagemap/verify_3.json");

const academic_survey = require("./flex_message/academic_survey.json");
const age_survey = require("./flex_message/age_survey.json");
const living_survey = require("./flex_message/living_survey.json");
const north = require("./flex_message/living_place/north.json");
const taoyuan = require("./flex_message/living_place/taoyuan.json");
const yunlin = require("./flex_message/living_place/yunlin.json");
const taichung = require("./flex_message/living_place/taichung.json");
const kao = require("./flex_message/living_place/kao.json");
const hua = require("./flex_message/living_place/hua.json");
const outside_island = require("./flex_message/living_place/outside_island.json");

// const party_survey = require("./flex_message/party_survey.json");
const gender_suvery = require("./flex_message/gender_survey.json");
const poll_now = require("./imagemap/poll_now.json");
const candidate_poll = require("./imagemap/candidate_poll.json");
const party_poll = require("./imagemap/party_poll.json");
const candidateResultMessage = require("./flex_message/candidateResultMessage");
const partyResultMessage = require("./flex_message/partyResultMessage");

const candidateResultMessage2 = require("./flex_message/candidateResultMessage2");
const partyResultMessage2 = require("./flex_message/partyResultMessage2");
const shareCandidate = require("./flex_message/shareCandidate");
const failMessage = require("./text_message/fail.json");
const { XER_API_URL } = process.env;
async function getLevel(event, delay = 0) {
  // return value level 0 = 0
  // level 1 = 1
  // level 2 = 3
  // levle 3 = 7
  if (process.env.NODE_ENV === "dev") {
    return 1;
    // return [0, 1, 3, 7][min % 4];
  }
  const api_url = new URL(
    path.join("providers", "line", event.source.userId),
    XER_API_URL
  );
  return new Promise((resolve, reject) => {
    setTimeout(async function () {
      try {
        const response = await fetch(api_url.href);
        const json = await response.json();
        const data = json.data;
        const level = String(data).substring(0, 2);
        resolve(Number(level));
      } catch (error) {
        // console.error("Fetch error:", error);
        resolve(Number(0));
      }
    }, delay);
  });
}

// async function changeRichMenu(event, level) {
//   const richmenu = [
//     "richmenu-bf6c7e9594d9fea0a874521510269fe1",
//     "richmenu-2d657fa3fd9a64466607eceeee1e86bf",
//   ];
//   const api_url = `https://api.line.me/v2/bot/user/${event.source.userId}/richmenu/${richmenu[level]}`;
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${channelAccessToken}`,
//     },
//   };
//   try {
//     await fetch(api_url, requestOptions);
//   } catch (error) {
//     console.log(error);
//   }
// }
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
async function getWeeklyResult(db) {
  const collectionRef = db.collection("weekly_result");
  return new Promise((resolve, reject) => {
    collectionRef
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          resolve(data);
        });
      })
      .catch((error) => {
        resolve("Error getting documents");
      });
  });
}

async function voteCandidate(id, candidate, db) {
  const documentRef = db.collection("candidate_result").doc(id);
  const dataToWrite = {
    candidate: candidate,
  };
  await documentRef.set(dataToWrite);
}

async function voteParty(id, party, db) {
  const documentRef = db.collection("party_result").doc(id);
  const dataToWrite = {
    party: party,
  };
  await documentRef.set(dataToWrite);
}
async function getUserVoteParty(id, db) {
  const documentRef = db.collection("party_result").doc(id);
  return new Promise((resolve, reject) => {
    documentRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          resolve(docSnapshot.data().party);
        } else {
          resolve(-1);
        }
      })
      .catch((error) => {
        console.log(error);
        resolve(-1);
      });
  });
}
async function getUserVoteCandidate(id, db) {
  const documentRef = db.collection("candidate_result").doc(id);
  return new Promise((resolve, reject) => {
    documentRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          resolve(docSnapshot.data().candidate);
        } else {
          resolve(-1);
        }
      })
      .catch((error) => {
        console.log(error);
        resolve(-1);
      });
  });
}
async function groupSurvey(
  id,
  db,
  gender = undefined,
  age = undefined,
  academic = undefined,
  living_place = undefined
) {
  const documentRef = db.collection("users").doc(id);
  documentRef
    .get()
    .then((doc) => {
      var dataToUpdate = {
        gender,
        age,
        academic,
        living_place,
      };
      if (doc.exists) {
        const dataToUpdate = {
          gender,
          age,
          academic,
          living_place,
        };
        documentRef.update(dataToUpdate);
      } else {
        documentRef.set(dataToUpdate);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
const messageReply = async (event, client, db) => {
  const message = event.message.text;
  if (event.source.type === "group") {
    switch (message) {
      // case "候選人民調": {
      //   const result = await getCandidatePollResult(db);
      //   const resultPercent = result.candidate.map((candidate) =>
      //     ((100 * candidate) / result.total).toFixed(2)
      //   );

      //   const resultMessage = await candidateResultMessage(
      //     resultPercent,
      //     result.total,
      //     db
      //   );
      //   return [
      //     {
      //       type: "flex",
      //       altText: "2024總統民調 支持度最新民調",
      //       contents: resultMessage,
      //     },
      //   ];
      // }
      default: {
        return "default";
      }
    }
  } else if (event.source.type === "user") {
    switch (message) {
      case "民調君介紹":
        return [
          {
            type: "text",
            text: "歡迎加入民調君 (動態全民調)，我們透過專業的人類認證機制確保每張選票都是由真人投下。點擊下方開始驗證，一起參與全民投票全民調!",
          },
          welcomeFlexMessage,
        ];
      case "完成驗證": {
        let level = await getLevel(event, 300);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else if (level === 1) {
          return [
            {
              type: "text",
              text: "恭喜你完成人類驗證, 目前驗證等級Level 1。 您可以繼續完成驗證參與民調, 或者查看目前進行中的民調",
            },
            verify_1,
          ];
        } else if (level === 3) {
          return [
            {
              type: "text",
              text: "恭喜你完成人類驗證, 目前驗證等級Level 2。 您可以繼續完成驗證參與民調, 或者查看目前進行中的民調",
            },
            verify_2,
          ];
        } else if (level === 7) {
          return [
            {
              type: "text",
              text: "恭喜你完成人類驗證, 目前驗證等級Level 3。 您可以繼續完成驗證參與民調, 或者查看目前進行中的民調",
            },
            verify_3,
          ];
        }
      }
      case "開始驗證":
      case "人類驗證": {
        let level = await getLevel(event, 0);

        // changeRichMenu(event, level);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else if (level === 1) {
          return [
            {
              type: "text",
              text: "恭喜你完成人類驗證, 目前驗證等級Level 1。 您可以繼續完成驗證參與民調, 或者查看目前進行中的民調",
            },
            start_verify_2,
          ];
        } else if (level === 3) {
          return [
            // {
            //   type: "text",
            //   text: "目前尚未開放，預計11月開放",
            // },
            {
              type: "text",
              text: "恭喜你完成人類驗證, 目前驗證等級Level 2。 您可以繼續完成驗證參與民調, 或者查看目前進行中的民調",
            },
            start_verify_3,
          ];
        } else if (level === 7) {
          return [
            {
              type: "text",
              text: "恭喜你完成人類驗證, 目前驗證等級Level 3。 您可以繼續完成驗證參與民調, 或者查看目前進行中的民調",
            },
            verify_3,
          ];
        }
      }

      case "Level 3":
        return [
          {
            type: "text",
            text: "目前尚未開放，預計11月開放",
          },
        ];
      case "族群設定":
        return [
          {
            type: "flex",
            altText: "請問你的生理性別",
            contents: gender_suvery,
          },
        ];
      case "男性":
      case "女性":
      case "多元性別":
      case "不透漏性別":
        const gender = ["男性", "女性", "多元性別", "不透漏性別"].findIndex(
          (e) => e === message
        );
        groupSurvey(event.source.userId, db, gender);
        // voteGender(event.source.userId, gender, db);
        return [
          {
            type: "flex",
            altText: "請問你的年齡?",
            contents: age_survey,
          },
        ];
      case "20歲以下":
      case "20-29歲":
      case "30-39歲":
      case "40-49歲":
      case "50-59歲":
      case "60歲以上":
        const age = [
          "20歲以下",
          "20-29歲",
          "30-39歲",
          "40-49歲",
          "50-59歲",
          "60歲以上",
        ].findIndex((e) => e === message);
        groupSurvey(event.source.userId, db, undefined, age);
        return [
          {
            type: "flex",
            altText: "你的學歷",
            contents: academic_survey,
          },
        ];
      case "國中以下":
      case "高中職":
      case "專科":
      case "大學":
      case "研究所以上":
        const academicList = [
          "國中以下",
          "高中職",
          "專科",
          "大學",
          "研究所以上",
        ];
        const academic = academicList.findIndex((e) => e === message);
        groupSurvey(event.source.userId, db, undefined, undefined, academic);
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: living_survey,
          },
        ];

      case "北北基":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: north,
          },
        ];
      case "桃竹苗":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: taoyuan,
          },
        ];
      case "中彰投":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: taichung,
          },
        ];
      case "雲嘉南":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: yunlin,
          },
        ];
      case "高屏":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: kao,
          },
        ];
      case "花東":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: hua,
          },
        ];
      case "離島":
        return [
          {
            type: "flex",
            altText: "請選擇你的戶籍地",
            contents: outside_island,
          },
        ];
      case "臺北市":
      case "基隆市":
      case "新北市":
      case "宜蘭縣":

      case "桃園市":
      case "新竹市":
      case "新竹縣":
      case "苗栗縣":

      case "臺中市":
      case "彰化縣":
      case "南投縣":

      case "嘉義市":
      case "嘉義縣":
      case "雲林縣":
      case "臺南市":

      case "高雄市":
      case "屏東縣":

      case "臺東縣":
      case "花蓮縣":

      case "連江縣":
      case "金門縣":
      case "澎湖縣": {
        const countries = [
          "臺北市",
          "基隆市",
          "新北市",
          "宜蘭縣",
          "桃園市",
          "新竹市",
          "新竹縣",
          "苗栗縣",
          "臺中市",
          "彰化縣",
          "南投縣",
          "嘉義市",
          "嘉義縣",
          "雲林縣",
          "臺南市",
          "高雄市",
          "屏東縣",
          "臺東縣",
          "澎湖縣",
          "花蓮縣",
          "金門縣",
          "連江縣",
        ];
        const place = countries.findIndex((e) => e === message);
        groupSurvey(
          event.source.userId,
          db,
          undefined,
          undefined,
          undefined,
          place
        );
        return [
          {
            type: "text",
            text: "這樣就可以了。那麼開始去投票吧!",
            quickReply: {
              items: [
                {
                  type: "action", // 3
                  action: {
                    type: "message",
                    label: "我要投票",
                    text: "開始投票",
                  },
                },
                {
                  type: "action",
                  action: {
                    type: "message",
                    label: "先不用",
                    text: "看看目前其他人的投票結果",
                  },
                },
              ],
            },
          },
        ];
      }

      case "進行中的民調":
      case "開始投票": {
        const level = await getLevel(event);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else {
          return [poll_now];
        }
      }

      case "政黨民調": {
        const level = await getLevel(event);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else return [party_poll];
      }
      case "投給民進黨": // 0
      case "投給國民黨": // 1
      case "投給新黨": // 2
      case "投給綠黨": // 3
      case "投給親民黨": // 4
      case "投給時代力量": // 5
      case "投給台灣基進黨": // 6
      case "投給民眾黨": // 7
      case "都不投政黨": // 8
      case "未決定政黨": {
        //9
        const level = await getLevel(event);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else {
          const party = [
            "投給民進黨", // 0
            "投給國民黨", // 1
            "投給新黨", // 2
            "投給綠黨", // 3
            "投給親民黨", // 4
            "投給時代力量", // 5
            "投給台灣基進黨", // 6
            "投給民眾黨", // 7
            "都不投政黨", // 8
            "未決定政黨", //9
          ].findIndex((e) => e === message);
          voteParty(event.source.userId, party, db);
          const user = await client.getProfile(event.source.userId);
          // const result = await getPartyPollResult(db);
          // const resultPercent = result.party.map((party) =>
          //   ((100 * party) / result.total).toFixed(2)
          // );
          // const partyResult = await partyResultMessage(
          //   resultPercent,
          //   result.total,
          //   db
          // );
          const partyResult = await partyResultMessage2();
          return [
            // {
            //   type: "text",
            //   text: `${user.displayName} 在「政黨票民調」${message} , 有${
            //     result.party[party] - 1
            //   }人和你做一樣的選擇。`,
            // },
            // {
            //   type: "flex",
            //   altText: "2024總統民調 政黨支持度最新民調",
            //   contents: partyResult,
            // },
            {
              type: "flex",
              altText: "2024總統民調 政黨支持度最新民調",
              contents: partyResult,
            },
            // {
            //   type: "text",
            //   text:
            //     `投票成功，你在「政黨票民調」${message}，投票結果每週結算一次，於每週五 18:00 公告，請於選單中的「得票統計」查看前一週的統計結果。\n\n` +
            //     "每個人只有一票，你可以隨時回到民調君重新選擇改投給你要支持的政黨。",
            // },
            {
              type: "text",
              text: "因應中選會規範，民調需要公告抽樣方法及誤差估計。民調君還在研究網友主動投票如何呈現資料，因此暫時不開放投票結果。",
            },
            // {
            //   type: "text",
            //   text:
            //     `投票成功，${user.displayName} 在「政黨票民調」${message}，目前有${result.total}人完成投票，統計至當前統計結果如下：\n\n` +
            //     `國民黨(${resultPercent[1]}%)\n` +
            //     `民進黨(${resultPercent[0]}%)\n` +
            //     `新黨(${resultPercent[2]}%)\n` +
            //     `綠黨(${resultPercent[3]}%)\n` +
            //     `親民黨(${resultPercent[4]}%)\n` +
            //     `時代力量(${resultPercent[5]}%)\n` +
            //     `台灣基進黨(${resultPercent[6]}%)\n` +
            //     `民眾黨(${resultPercent[7]}%)\n` +
            //     `都不投(${resultPercent[8]}%)\n` +
            //     `未決定(${resultPercent[9]}%)\n\n` +
            //     `每個人只有一票，你可以隨時回到民調君重新選擇改投給你要支持的政黨。`,
            // },
          ];
        }
      }
      case "候選人民調": {
        const level = await getLevel(event);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else return [candidate_poll];
      }
      case "投給柯文哲": //0
      case "投給郭台銘": //1
      case "投給賴清德": //2
      case "投給侯友宜": //3
      case "都不投候選人": // 4
      case "未決定候選人": {
        //5
        const level = await getLevel(event);
        if (level === 0) {
          return [failMessage, start_verify_1];
        } else {
          const candidate = [
            "投給柯文哲", // 0
            "投給賴清德", // 1
            "投給侯友宜", // 2
            "投給郭台銘", // 3
            "都不投候選人", // 4
            "未決定候選人", //5
          ].findIndex((e) => e === message);
          voteCandidate(event.source.userId, candidate, db);
          // const user = await client.getProfile(event.source.userId);
          // const result = await getCandidatePollResult(db);
          // const resultPercent = result.candidate.map((candidate) =>
          //   ((100 * candidate) / result.total).toFixed(2)
          // );

          // const resultMessage = await candidateResultMessage(
          //   resultPercent,
          //   result.total,
          //   db
          // );
          const resultMessage = await candidateResultMessage2();
          var rt = [
            // {
            //   type: "text",
            //   text: `${user.displayName} 在「總統民調」${message} , 有${
            //     result.candidate[candidate] - 1
            //   }人和你做一樣的選擇。`,
            // },
            {
              type: "flex",
              altText: "2024總統民調 支持度最新民調",
              contents: resultMessage,
            },
          ];

          //Didn't select any candidate
          if (candidate !== 4 && candidate !== 5) {
            rt.push(shareCandidate(candidate));
          }
          rt.push({
            type: "text",
            text: "因應中選會規範，民調需要公告抽樣方法及誤差估計。民調君還在研究網友主動投票如何呈現資料，因此暫時不開放投票結果。",
          });
          // rt.push({
          //   type: "text",
          //   text:
          //     `投票成功，${user.displayName} 在「總統民調」${message}，目前有${result.total}人完成投票，統計至當前統計結果如下：\n\n` +
          //     `柯文哲(${resultPercent[0]}%)\n` +
          //     `賴清德(${resultPercent[1]}%)\n` +
          //     `侯友宜(${resultPercent[2]}%)\n` +
          //     `郭台銘(${resultPercent[3]}%)\n` +
          //     `都不投(${resultPercent[4]}%)\n` +
          //     `未決定(${resultPercent[5]}%)\n\n` +
          //     "每個人只有一票，你可以隨時回到民調君重新選擇改投給你要支持的候選人。",
          // });
          return rt;
        }
      }
      case "看看目前其他人的投票結果":
      case "得票統計": {
        var rt = [
          {
            type: "text",
            text: "因應中選會規範，民調需要公告抽樣方法及誤差估計。民調君還在研究網友主動投票如何呈現資料，因此暫時不開放投票結果。",
          },
        ];

        // const userID = event.source.userId;
        // const userVotePartyResult = await getUserVoteParty(userID, db);
        // const userVoteCandidateResult = await getUserVoteCandidate(userID, db);
        // if (userVotePartyResult === -1 && userVoteCandidateResult === -1) {
        //   return [
        //     {
        //       type: "text",
        //       text: "完成投票才能查看 ",
        //     },
        //   ];
        // }
        // const weeklyResult = await getWeeklyResult(db);

        // if (userVotePartyResult !== -1) {
        //   const partyResult = weeklyResult.party;
        //   const partyResultPercent = partyResult.party.map((party) =>
        //     ((100 * party) / partyResult.total).toFixed(2)
        //   );
        //   const partyResultMessages = await partyResultMessage(
        //     partyResultPercent,
        //     partyResult.total,
        //     weeklyResult.date_string
        //   );

        //   rt.push({
        //     type: "flex",
        //     altText: "2024總統民調 政黨支持度最新民調",
        //     contents: partyResultMessages,
        //   });
        // }
        // if (userVoteCandidateResult !== -1) {
        //   const result = weeklyResult.candidate;
        //   const resultPercent = result.candidate.map((candidate) =>
        //     ((100 * candidate) / result.total).toFixed(2)
        //   );

        //   const resultMessage = await candidateResultMessage(
        //     resultPercent,
        //     result.total,
        //     weeklyResult.date_string
        //   );
        //   rt.push({
        //     type: "flex",
        //     altText: "2024總統民調 支持度最新民調",
        //     contents: resultMessage,
        //   });
        // }
        // rt.push({
        //   type: "text",
        //   text: "投票結果每週結算一次，於每週五 18:00 公告。請訂閱民調君 Youtube 頻道獲得最新統計結果公告。",
        // });
        return rt;
      }

      case "未決定":
        return [
          {
            type: "text",
            text: "還未決定",
          },
        ];
      // case "邀請朋友":
      //   return [
      //     {
      //       type: "flex",
      //       altText: "分享民調君",
      //       contents: share0,
      //     },
      //   ];

      default: {
        return "default";
        // return [
        //   {
        //     type: "text",
        //     text: "Hello ",
        //   },
        // ];
      }
    }
  }
};
module.exports = {
  messageReply,
  getCandidatePollResult,
  getPartyPollResult,
  getWeeklyResult,
};

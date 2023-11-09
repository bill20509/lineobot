const getTime = require("../getTime");

async function partyResultMessage(resultPercent, total, date) {
  const party = [
    {
      color: "#0D9B09",
      borderColor: "#7ED957",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_0.png",
      score: resultPercent[0],
    },
    {
      color: "#004AAD",
      borderColor: "#5271FF",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_1.png",
      score: resultPercent[1],
    },
    {
      color: "#D7C830",
      borderColor: "#FFFFFF",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_2.png",
      score: resultPercent[2],
    },
    {
      color: "#008C2F",
      borderColor: "#F8D802",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_3.png",
      score: resultPercent[3],
    },
    {
      color: "#FF6200",
      borderColor: "#FFFFFF",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_4.png",
      score: resultPercent[4],
    },
    {
      color: "#FEBB02",
      borderColor: "#FFFFFF",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_5.png",
      score: resultPercent[5],
    },
    {
      color: "#B43314",
      borderColor: "#FFFFFF",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_6.png",
      score: resultPercent[6],
    },
    {
      color: "#27C8C8",
      borderColor: "#80D9D9",
      icon: "https://storage.googleapis.com/mrming_img/logo/logo_7.png",
      score: resultPercent[7],
    },
  ].sort((a, b) => b.score - a.score);
  const base = 60;
  const h1 = `${base}%`;
  const h2 = `${(party[1].score / party[0].score).toFixed(2) * base}%`;
  const h3 = `${(party[2].score / party[0].score).toFixed(2) * base}%`;
  const h4 = `${(party[3].score / party[0].score).toFixed(2) * base}%`;

  // const date = getTime();

  // const documentRef = db.collection("share_party_result").doc();
  // const dataToWrite = {
  //   date,
  //   total,
  //   resultPercent,
  // };
  // await documentRef.set(dataToWrite);
  // const docPath = documentRef.path.split("/")[1];
  // const shareUri = `https://liff.line.me/2000917409-We3Ragrk/party_poll?id=${docPath}`;
  const shareUri = `https://liff.line.me/2000917409-We3Ragrk/party_poll`;
  return {
    type: "bubble",
    size: "giga",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "image",
          url: "https://storage.googleapis.com/mrming_img/share_target/party_result_bg_2.png",
          size: "full",
          aspectMode: "cover",
          aspectRatio: "1:1.125",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [],
                  backgroundColor: party[0].color,
                  width: h1,
                  height: "100%",
                  borderWidth: "1px",
                  borderColor: party[0].borderColor,
                },
                {
                  type: "text",
                  text: `${party[0].score}%`,
                  margin: "5px",
                  color: "#FFFFFF",
                  size: "20px",
                },
              ],
              width: "100%",
              height: "42%",
              position: "absolute",
              offsetStart: "30px",
              alignItems: "flex-start",
              justifyContent: "center",
            },
            {
              type: "image",
              url: party[0].icon,
              size: "40px",
              aspectRatio: "1:1",
              position: "absolute",
            },
          ],
          width: "100%",
          height: "14%",
          position: "absolute",
          offsetBottom: "60%",
          offsetStart: "10%",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [],
                  backgroundColor: party[1].color,
                  width: h2,
                  height: "100%",
                  borderWidth: "1px",
                  borderColor: party[1].borderColor,
                },
                {
                  type: "text",
                  text: `${party[1].score}%`,
                  margin: "5px",
                  color: "#FFFFFF",
                  size: "20px",
                },
              ],
              width: "100%",
              height: "42%",
              position: "absolute",
              offsetStart: "30px",
              alignItems: "flex-start",
              justifyContent: "center",
            },
            {
              type: "image",
              url: party[1].icon,
              size: "40px",
              aspectRatio: "1:1",
              position: "absolute",
            },
          ],
          width: "100%",
          height: "14%",
          position: "absolute",
          offsetBottom: "48%",
          offsetStart: "10%",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [],
                  backgroundColor: party[2].color,
                  width: h3,
                  height: "100%",
                  borderWidth: "1px",
                  borderColor: party[2].borderColor,
                },
                {
                  type: "text",
                  text: `${party[2].score}%`,
                  margin: "5px",
                  color: "#FFFFFF",
                  size: "20px",
                },
              ],
              width: "100%",
              height: "42%",
              position: "absolute",
              offsetStart: "30px",
              alignItems: "flex-start",
              justifyContent: "center",
            },
            {
              type: "image",
              url: party[2].icon,
              size: "40px",
              aspectRatio: "1:1",
              position: "absolute",
            },
          ],
          width: "100%",
          height: "14%",
          position: "absolute",
          offsetBottom: "36%",
          offsetStart: "10%",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [],
                  backgroundColor: party[3].color,
                  width: h4,
                  height: "100%",
                  borderWidth: "1px",
                  borderColor: party[3].borderColor,
                },
                {
                  type: "text",
                  text: `${party[3].score}%`,
                  margin: "5px",
                  color: "#FFFFFF",
                  size: "20px",
                },
              ],
              width: "100%",
              height: "42%",
              position: "absolute",
              offsetStart: "30px",
              alignItems: "flex-start",
              justifyContent: "center",
            },
            {
              type: "image",
              url: party[3].icon,
              size: "40px",
              aspectRatio: "1:1",
              position: "absolute",
            },
          ],
          width: "100%",
          height: "14%",
          position: "absolute",
          offsetBottom: "24%",
          offsetStart: "10%",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "image",
              url: party[4].icon,
              size: "30px",
            },
            {
              type: "text",
              text: `${Number(party[4].score).toFixed(1)}%`,
              color: "#FFFFFF",
            },
            {
              type: "image",
              url: party[5].icon,
              size: "30px",
            },
            {
              type: "text",
              text: `${Number(party[5].score).toFixed(1)}%`,
              color: "#FFFFFF",
            },
            {
              type: "image",
              url: party[6].icon,
              size: "30px",
            },
            {
              type: "text",
              text: `${Number(party[6].score).toFixed(1)}%`,
              color: "#FFFFFF",
            },
            {
              type: "image",
              url: party[7].icon,
              size: "30px",
            },
            {
              type: "text",
              text: `${Number(party[7].score).toFixed(1)}%`,
              color: "#FFFFFF",
            },
          ],
          position: "absolute",
          offsetBottom: "15%",
          width: "85%",
          height: "10%",
          alignItems: "center",
          offsetStart: "10%",
          justifyContent: "flex-start",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: `符合法定投票資格投票人數 ${total} 人`,
              color: "#FFFFFF",
              size: "10px",
            },
            {
              type: "text",
              text: `資料時間 : ${date}`,
              color: "#FFFFFF",
              size: "10px",
              align: "end",
              style: "normal",
            },
          ],
          position: "absolute",
          offsetBottom: "12%",
          width: "96%",
          height: "5%",
          alignItems: "flex-end",
          justifyContent: "space-between",
          offsetStart: "2%",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "vertical",
              contents: [],
              width: "50%",
              height: "100%",
              action: {
                type: "message",
                label: "我要投票",
                text: "開始投票",
              },
            },
            {
              type: "box",
              layout: "vertical",
              contents: [],
              width: "50%",
              height: "100%",
              action: {
                type: "uri",
                label: "分享",
                uri: shareUri,
              },
            },
          ],
          width: "100%",
          height: "12%",
          position: "absolute",
          offsetBottom: "0%",
        },
      ],
      paddingAll: "0px",
      justifyContent: "center",
    },
  };
}

module.exports = partyResultMessage;

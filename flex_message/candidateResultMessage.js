const getTime = require("../getTime");

async function candidateResultMessage(resultPercent, total, date) {
  const num1 = `${resultPercent[0]}%`;
  const num2 = `${resultPercent[1]}%`;
  const num3 = `${resultPercent[2]}%`;
  const num4 = `${resultPercent[3]}%`;

  const h1 = `${(resultPercent[0] * 0.9).toFixed(2)}%`;
  const h2 = `${(resultPercent[1] * 0.9).toFixed(2)}%`;
  const h3 = `${(resultPercent[2] * 0.9).toFixed(2)}%`;
  const h4 = `${(resultPercent[3] * 0.9).toFixed(2)}%`;

  // const date = getTime();

  // const documentRef = db.collection("share_candidate_result").doc();
  // const dataToWrite = {
  //   date,
  //   total,
  //   resultPercent,
  // };
  // await documentRef.set(dataToWrite);
  // const docPath = documentRef.path.split("/")[1];
  // const shareUri = `https://liff.line.me/2000917409-We3Ragrk/candidate_poll?id=${docPath}`;
  const shareUri = `https://liff.line.me/2000917409-We3Ragrk/candidate_poll`;
  return {
    type: "bubble",
    size: "giga",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "image",
          url: "https://storage.googleapis.com/mrming_img/share_target/candidate_result_bg.png",
          size: "full",
          aspectMode: "cover",
          aspectRatio: "1:1.125",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "image",
              url: "https://storage.googleapis.com/mrming_img/candidate_result_img/candidate_1.png",
              gravity: "bottom",
              size: "100%",
              aspectMode: "cover",
              aspectRatio: "1:1.3",
              offsetStart: "-5px",
            },
            {
              type: "image",
              url: "https://storage.googleapis.com/mrming_img/candidate_result_img/candidate_2.png",
              gravity: "bottom",
              size: "100%",
              aspectMode: "cover",
              aspectRatio: "1:1.3",
              offsetStart: "-5px",
            },
            {
              type: "image",
              url: "https://storage.googleapis.com/mrming_img/candidate_result_img/candidate_3.png",
              gravity: "bottom",
              size: "100%",
              aspectMode: "cover",
              aspectRatio: "1:1.3",
              offsetStart: "-5px",
            },
            {
              type: "image",
              url: "https://storage.googleapis.com/mrming_img/candidate_result_img/candidate_4.png",
              gravity: "bottom",
              size: "90%",
              aspectMode: "cover",
              aspectRatio: "1:1.3",
              offsetStart: "-5px",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "image",
                  url: "https://storage.googleapis.com/mrming_img/logo/logo_7.png",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [],
                  height: h1,
                  backgroundColor: "#27C8C8",
                  borderWidth: "1px",
                  borderColor: "#80D9D9",
                },
              ],
              width: "5%",
              height: "100%",
              position: "absolute",
              offsetStart: "20%",
              justifyContent: "flex-end",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "image",
                  url: "https://storage.googleapis.com/mrming_img/logo/logo_0.png",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [],
                  height: h2,
                  backgroundColor: "#0D9B09",
                  borderWidth: "1px",
                  borderColor: "#7ED957",
                },
              ],
              width: "5%",
              height: "100%",
              position: "absolute",
              offsetStart: "44%",
              justifyContent: "flex-end",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "image",
                  url: "https://storage.googleapis.com/mrming_img/logo/logo_1.png",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [],
                  height: h3,
                  backgroundColor: "#0000AA",
                  borderWidth: "1px",
                  borderColor: "#4F6CFB",
                },
              ],
              width: "5%",
              height: "100%",
              position: "absolute",
              offsetStart: "68%",
              justifyContent: "flex-end",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "image",
                  url: "https://storage.googleapis.com/mrming_img/logo/logo_8.png",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [],
                  height: h4,
                  backgroundColor: "#A6AABB",
                  borderWidth: "1px",
                  borderColor: "#CAC9CA",
                },
              ],
              width: "5%",
              height: "100%",
              position: "absolute",
              offsetStart: "92%",
              justifyContent: "flex-end",
            },
          ],
          position: "absolute",
          width: "100%",
          height: "43%",
          offsetBottom: "38.5%",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "柯文哲",
                  color: "#FFFFFF",
                  weight: "bold",
                },

                {
                  type: "text",
                  text: num1,
                  color: "#FFFFFF",
                  weight: "bold",
                },
              ],
              justifyContent: "center",
              alignItems: "center",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "賴清德",
                  color: "#FFFFFF",
                  weight: "bold",
                },
                {
                  type: "text",
                  text: num2,
                  color: "#FFFFFF",
                  weight: "bold",
                },
              ],
              justifyContent: "center",
              alignItems: "center",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "侯友宜",
                  color: "#FFFFFF",
                  weight: "bold",
                },
                {
                  type: "text",
                  text: num3,
                  color: "#FFFFFF",
                  weight: "bold",
                },
              ],
              justifyContent: "center",
              alignItems: "center",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  color: "#FFFFFF",
                  weight: "bold",
                  text: "郭台銘",
                },
                {
                  type: "text",
                  text: num4,
                  color: "#FFFFFF",
                  weight: "bold",
                },
              ],
              justifyContent: "center",
              alignItems: "center",
            },
          ],
          width: "100%",
          height: "15%",
          position: "absolute",
          offsetBottom: "20%",
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

module.exports = candidateResultMessage;

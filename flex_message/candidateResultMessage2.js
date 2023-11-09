const getTime = require("../getTime");

async function candidateResultMessage() {
  const shareUri = `https://liff.line.me/2000917409-We3Ragrk/candidate_poll?`;
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

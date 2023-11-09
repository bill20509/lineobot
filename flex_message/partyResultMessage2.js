const getTime = require("../getTime");

async function partyResultMessage() {
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
          url: "https://storage.googleapis.com/mrming_img/share_target/vote_party_share.png",
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

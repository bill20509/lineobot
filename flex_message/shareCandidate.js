function shareCandidate(id) {
  const partyUrl = [
    "https://storage.googleapis.com/mrming_img/share_target/recevid_1.png",
    "https://storage.googleapis.com/mrming_img/share_target/recevid_2.png",
    "https://storage.googleapis.com/mrming_img/share_target/recevid_3.png",
    "https://storage.googleapis.com/mrming_img/share_target/recevid_4.png",
  ];

  return {
    type: "flex",
    altText: "LINE上總統民調進行中",
    contents: {
      type: "bubble",
      size: "giga",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "image",
            url: partyUrl[id],
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
                  uri: `https://liff.line.me/2000917409-We3Ragrk/candidate?id=${id}`,
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
    },
  };
}
module.exports = shareCandidate;

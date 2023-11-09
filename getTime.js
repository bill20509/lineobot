function getTime() {
  const currentDateTime = new Date();
  const currentUTCTimestamp = currentDateTime.getTime();
  const UTCPlus8Timestamp = currentUTCTimestamp + 8 * 60 * 60 * 1000;
  const dateInUTCPlus8 = new Date(UTCPlus8Timestamp);
  const year = dateInUTCPlus8.getUTCFullYear();
  const month = dateInUTCPlus8.getUTCMonth() + 1;
  const day = dateInUTCPlus8.getUTCDate();
  const hour = dateInUTCPlus8.getUTCHours().toString().padStart(2, "0");
  const minute = dateInUTCPlus8.getUTCMinutes().toString().padStart(2, "0");
  const second = dateInUTCPlus8.getUTCSeconds().toString().padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}
module.exports = getTime;

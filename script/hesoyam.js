module.exports.config = {
  name: "hesoyam",
  role: 2,
  version: "1.0.0",
  info: "Grant yourself a financial boost",
  type: "currency",
  aliases: ["moneycheat", "givemecredits", "devmoney", "iamrich", "becomerich", "makemerich"],
  cd: 30,
};

module.exports.run = async function ({ api, event, Currencies }) {
  try {
    const { threadID, senderID } = event;

    const grantAmount = 250000000; 

    await Currencies.increaseMoney(senderID, grantAmount);

    const updatedUserData = await Currencies.getData(senderID);
    const totalBalance = updatedUserData.money || 0;

    api.sendMessage(`💸 | Hesoyam! You've been granted $${grantAmount.toLocaleString()}`, threadID);
  } catch (error) {
    console.error("Error in hesoyam command:", error);
  }
};
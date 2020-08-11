// const sendUserInvitation = require("./sendUserInvitation");
// const commentWithStatus = require("./commentWithStatus");

// async function createEntitlement(context) {
//   const bot = context.isBot;
//   const { body } = context.payload.comment;
//   const containsCommand = body.includes("/add-me");

//   try {
//     if (!bot && containsCommand) {
//       const inviteResp = await sendUserInvitation(context);
//       const commentResp = await commentWithStatus(context);
//       return { inviteResp, commentResp };
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = createEntitlement;

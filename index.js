/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

// const createEntitlement = require("./lib/createEntitlement");
const sendUserInvitation = require("./lib/sendUserInvitation");
const commentWithStatus = require("./lib/commentWithStatus");

// const fs = require("fs");

module.exports = (app) => {
  // Your code here
  app.log("Yay, the app was loaded!");

  app.on("issue_comment.created", async (context) => {
    const bot = context.isBot;
    const { body } = context.payload.comment;
    const containsCommand = body.includes("/add-me");

    try {
      if (!bot && containsCommand) {
        const inviteResp = await sendUserInvitation(context);
        const commentResp = await commentWithStatus(context);
        return { inviteResp, commentResp };
      }
    } catch (error) {
      app.log(error);
    }
  });
};

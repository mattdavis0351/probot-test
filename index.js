/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const sendUserInvitation = require('./lib/sendUserInvitation')
const commentWithStatus = require('./lib/commentWithStatus')

module.exports = (app) => {
  app.log('Yay, the app was loaded!')

  app.on('issue_comment.created', async (context) => {
    const bot = context.isBot
    const { body } = context.payload.comment
    const containsCommand = body.includes('/add-me')
    try {
      if (!bot && containsCommand) {
        app.log('calling sendUserInvitation')
        const inviteResp = await sendUserInvitation(context)
        app.log(
          `sendUserInvitation completed, \nvalue ${inviteResp}\nnow calling comment with status`
        )
        const commentResp = await commentWithStatus(context)
        app.log(`comment with status has been called.\nvalue ${commentResp}`)
        return { inviteResp, commentResp }
      }
      // if (bot) {
      //   return false;
      // }
    } catch (error) {
      app.log(error)
    }
  })
}

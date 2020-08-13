async function sendUserInvitation (context) {
  const repoPayload = {
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    username: context.payload.comment.user.login
  }
  try {
    console.log('inside of sendUserInvitation: trying to sendn invite')
    const inviteResult = await context.github.repos.addCollaborator(
      repoPayload
    )
    console.log(`inviteResult after api call is: ${inviteResult}`)
    if (inviteResult) {
      if (inviteResult.status === 201) {
        console.log(
          'sendUserInvitation: invite returned 201 and was sucessful'
        )
        return 'invitation sucessfully sent'
      } else if (inviteResult.status === 204) {
        console.log(
          'sendUserInvitation: user is already a collaborator and status is 204'
        )
        return 'User is already a collaborator'
      } else {
        console.log(
          `sendUserInvitation returned a status code of: ${inviteResult.status}`
        )
      }
    }
  } catch (error) {
    if (error.status === 404) {
      throw new Error('Oops, something went horribly wrong!')
    }
  }
}

module.exports = sendUserInvitation

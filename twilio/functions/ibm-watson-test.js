const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

exports.handler = async (context, event, callback) => {
  try {
    const assistant = new AssistantV2({
      version: context.ibm_watson_assistant_version,
      authenticator: new IamAuthenticator({
        apikey: context.ibm_watson_assistant_api_key,
      }),
      url: context.ibm_watson_assistant_url,
    });
  
    const message = 'Hi';
    let { sessionId } = event;
    
    if(!sessionId) {
      //Get sessionId
      sessionId = await createSessionId(context, assistant);
    }
    
    // Send message
    const watsonResponse = await sendUserInput(context, assistant, sessionId, message);

    callback(null, watsonResponse);
  } catch(e) {
    callback(e);
  }
};

const createSessionId = async (context, assistant) => {
  try {
    const session = await assistant.createSession({
      assistantId: context.ibm_watson_assistant_id
    });

    return session.result.session_id;
  } catch (e) {
    return formatErrorMsg(context, 'createSessionId', e);
  }
}

const sendUserInput = async (context, assistant, sessionId, message) => {
  try {
    const watsonResponse = await assistant.message({
      sessionId,
      assistantId: context.ibm_watson_assistant_id,
      input: {
        'message_type': 'text',
        'text': message,
        'options': {
          'return_context': true
        }
      }
    });
    
    return watsonResponse;
  } catch (e) {
    return formatErrorMsg(context, 'sendUserInput', e);
  }
}

const formatErrorMsg = (context, functionName, errorMsg) => {
  return `
    Twilio Function Path: ${context.PATH} \n
    Function Name: ${functionName} \n
    Error Message: ${errorMsg}
  `;
}
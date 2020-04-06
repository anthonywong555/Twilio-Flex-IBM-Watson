const ACTION_STORE_SYNC = 'STORE_SYNC';
const ACTION_GET_SYNC_AND_DELETE = 'GET_SYNC_AND_DELETE';

exports.handler = async (context, event, callback) => {
  try {
    const { action } = event;
    let result = null;

    if(action === ACTION_STORE_SYNC) {
      const botIntent = event.intent;
      const botContext = event.context;
      result = await createSyncDoc(context, twilioClient, botIntent, botContext);
    } else if(action === ACTION_GET_SYNC_AND_DELETE) {
      const { phoneNumber } = event;
      result = await getSyncDoc(context, twilioClient, phoneNumber);
      await deleteSyncDoc(context, twilioClient, phoneNumber);
    } else {
      throw "Missing an action statement";
    }
    
    callback(null, result);
  } catch (e) {
    callback(e);
  }
}

const getSyncDoc = async (context, twilioClient, documentId) => {
  try {
    const result = await twilioClient.sync.
    services(context.TWILIO_SYNC_DEFAULT_SERVICE_SID).
    documents(documentId).fetch();

    return result;
  } catch (e) {
    throw formatErrorMsg(context, 'getSyncDoc', e);
  }
}

const deleteSyncDoc = async(context, twilioClient, documentId) => {
  try {
    const result = await twilioClient.sync.
    services(context.TWILIO_SYNC_DEFAULT_SERVICE_SID).
    documents(documentId).remove();

    return result;
  } catch (e) {
    throw formatErrorMsg(context, 'deleteSyncDoc', e);
  }
}

const createSyncDoc = async (context, twilioClient, botIntent, botContext) => {
  try {
    let data = {
      botIntent,
      botContext
    };

    let uniqueName = '';

    if(botContext.vgwSIPFromURI) {
      // From IBM Watson Voice Gateway
      uniqueName = botContext.vgwSIPFromURI.substring(4, 16);
      const formattedContext = {};

      const keys = Object.keys(botContext);

      for(const aKey of keys) {
        if(!aKey.includes('vgw') && aKey !== 'system') {
          formattedContext[aKey] = botContext[aKey];
        }
      }

      data.botContext = formattedContext;
    }
    
    const result = await twilioClient.sync.
    services(context.TWILIO_SYNC_DEFAULT_SERVICE_SID).
    documents.create({
      uniqueName,
      data
    });

    return result;
  } catch(e) {
    throw formatErrorMsg(context, 'createSyncDoc', e);
  }
}

const formatErrorMsg = (context, functionName, errorMsg) => {
  return `
    Twilio Function Path: ${context.PATH} \n
    Function Name: ${functionName} \n
    Error Message: ${errorMsg}
  `;
}
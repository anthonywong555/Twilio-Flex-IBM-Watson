# Twilio Flex - IBM Watson

This project is to showcase how to connect IBM products into Twilio Flex.

## IBM Watson Assistant

### Prerequisites

Before you can get started you will need the following:
* [IBM Watson](https://www.ibm.com/cloud/watson-assistant/)

#### Setup Twilio

0. Go to the ./twilio/flex/plugin-task-bot-parser folder and 

```console
npm build
```

the asset. The output should be plugin-task-bot-parser.js

1. Go to [Twilio Functions - Configure](https://www.twilio.com/console/functions/configure)

2. Add the following node modules:
- ibm-watson

3. Add the following Environment Variables:

| KEY                          | VALUE                                            |
|------------------------------|--------------------------------------------------|
| ibm_watson_assistant_version | 2020-02-05                                       |
| ibm_watson_assistant_api_key |                                                  |
| ibm_watson_assistant_url     | https://gateway.watsonplatform.net/assistant/api |
| ibm_watson_assistant_id      |                                                  |

4. Go to [Twilio Functions](https://www.twilio.com/console/functions/manage) and deploy the functions in the ./twilio/functions directory.

**The function paths should match the function file names**

5. Go to [Twilio Studio](https://www.twilio.com/console/studio/dashboard) and import the studio flows in the ./twilio/studio directory.

**When you import the studio flow you might have to change the Run Function Widget's <em>Function URL</em>**

6. Go to [Twilio Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming) and select your Flex Phone Number. 

7. Under <em>A CALL COMES IN</em> select **Studio Flow** **IBM-Watson-Voice-IVR**.

8. Go to [Twilio Flex - Messaging](https://www.twilio.com/console/flex/messaging).

9. Under <em>Manager Flex Flows</em> have the following:

| CHANNEL 	| IDENTITY                            	| FRIENDLY NAME               	| INTEGRATION TYPE 	| CONFIGURATION                    	|
|---------	|-------------------------------------	|-----------------------------	|------------------	|----------------------------------	|
| sms     	| +1XXXXXXXXXX                        	| Flex Messaging Channel Flow 	| Studio           	| IBM-Watson-Messaging-Flow         |
| web     	| FOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 	| Flex Web Channel Flow       	| Studio           	| IBM-Watson-Webchat-Flow           |

### Testing 

I would highly recommend running the ibm-watson-test function to test to see if you get a response from IBM Watson.

### Limitations

Here are couple things to keep in mind.

You might run into the following errors.

| Error Code | Message                                                 |
|------------|---------------------------------------------------------|
| [81000](https://www.twilio.com/docs/api/errors/81000)      | The Execution has exceeded max steps allowed for a flow |
| [81001](https://www.twilio.com/docs/api/errors/81001)      | The Widget has exceeded max steps in a loop             |

## IBM Voice Gateway

### Prerequisites

Before you can get started you will need the following:
* Did all the instructions above.
* You will need two phone numbers:
    > 1. [Setting up a Twilio SIP trunk for self-service agents](https://www.ibm.com/support/knowledgecenter/SS4U29/twilio.html)
    > 2. Will be IBM Watson Assistant transfer to. When a call comes in set the studio flow to be IBM-Voice-Gateway-Driver
* Import the IBM Watson Assistant Skill from the /ibm/assistant.
    > Before importing change the +18888888888 to be the second twilio phone number.
* The Twilio Function ibm-voice-gateway-driver, needs to have <strong>ACCESS CONTROL</strong> to be false.

### Setup Twilio

1. Go to [Twilio Functions - Configure](https://www.twilio.com/console/functions/configure)

2. Enable <strong>Enable ACCOUNT_SID and AUTH_TOKEN</strong>

3. Add the following Enbironment Variables:

| KEY                             	| VALUE                               	|
|---------------------------------	|-------------------------------------	|
| [TWILIO_SYNC_DEFAULT_SERVICE_SID](https://www.twilio.com/console/sync/services) 	| ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 	|

### Setup IBM Watson Assistant

1. Set the IBM Watson Assistant webhook to be your Twilio Function ibm-voice-gateway-driver url.

## Disclaimer

This guide is only to showcase how to demo IBM Solution inside Twilio Flex. This is not a production level code. This is only for demo purposes. I do not take liability if anyone deploys this into production.

## Author

* **Anthony Wong**
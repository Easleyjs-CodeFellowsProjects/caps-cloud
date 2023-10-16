const {
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SQSClient,
    DeleteMessageBatchCommand,
  } = require("@aws-sdk/client-sqs");
  
  const client = new SQSClient({});
  
  const SQS_QUEUE_URL = "https://sqs.us-west-2.amazonaws.com/067714926294/1-206-flowers";

  const receiveMessage = (queueUrl) =>
    client.send(
      new ReceiveMessageCommand({
        AttributeNames: ["SentTimestamp"],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ["All"],
        QueueUrl: queueUrl,
        WaitTimeSeconds: 20,
        VisibilityTimeout: 20,
      }),
    );
  
exports.getStoreQueue = async function (queueUrl) {
    
    const { Messages } = await receiveMessage(queueUrl);

    if (!Messages) {
        console.log('No messages in queue.')
        return;
    }
    Messages.forEach(async message => {
        const msgJson = JSON.parse(message.Body);
        console.log(`Thank you ${msgJson.customer}!`);
        await client.send(
            new DeleteMessageBatchCommand({
                QueueUrl: queueUrl,
                Entries: Messages.map((message) => ({
                    Id: message.MessageId,
                    ReceiptHandle: message.ReceiptHandle,
                })),
            }),
            );
    })
    
};

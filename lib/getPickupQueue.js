const {
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SQSClient,
    DeleteMessageBatchCommand,
  } = require("@aws-sdk/client-sqs");
  
  const client = new SQSClient({});

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
  
exports.getPickupQueue = async function (queueUrl) {
    let msgArr = [];
    const { Messages } = await receiveMessage(queueUrl);

    if (!Messages) {
        console.log('No messages in queue.')
        return;
    }
    Messages.forEach(async message => {
        const msgJson = await JSON.parse(message.Body);
        msgArr.push(msgJson);

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
  return msgArr;  
};
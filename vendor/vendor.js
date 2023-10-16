const { getStoreQueue } = require('../lib/getStoreQueue');
const { createPickup } = require('../lib/createPickup');

const SQS_BASE_QUEUE_URL = "https://sqs.us-west-2.amazonaws.com/067714926294/";

class Vendor {
    constructor(storeName) {
        this.storeName = storeName;
        this.SQS_QUEUE_URL = SQS_BASE_QUEUE_URL + storeName
    }

    async getDelivered() {
        const deliveries = await getStoreQueue(this.SQS_QUEUE_URL);
        if ( deliveries ) {
            deliveries.forEach(delivery => {
                console.log(`Thank you ${delivery.customerName}!`);
            })
        } else {
            console.log('No completed deliveries in queue.');
        }
    }

    //pickupDetails = { "customer": <customer name>, "storeName": <storeName> }
    createNewPickup(pickupDetails) {
        const pickup = createPickup({ "customerName": pickupDetails.customerName, "storeName": this.storeName });
    }
}

module.exports = Vendor;
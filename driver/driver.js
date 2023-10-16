const { getPickupQueue } = require('../lib/getPickupQueue');
const { createDelivery } = require('../lib/createDelivery');

const SQS_PICKUP_QUEUE_URL = "https://sqs.us-west-2.amazonaws.com/067714926294/packages";

class Driver {
    constructor() {}

    //deliveryDetails = { customer: <customer name>, storeName: <store name>}
    async createNewDelivery(deliveryDetails) {
        const delivery = await createDelivery(deliveryDetails);
    }

    async getPickups() {
        const pickups = await getPickupQueue(SQS_PICKUP_QUEUE_URL);

        if ( pickups ) {
            pickups.forEach( pickup => {
                this.createNewDelivery(pickup);
            })
        } else {
            console.log('No pickups in queue.');
        }
        
    }
}

module.exports = Driver;
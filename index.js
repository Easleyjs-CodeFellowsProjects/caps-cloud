const Driver = require('./driver/driver');
const Vendor = require('./vendor/vendor');
let chance = require('chance')();

let myDriver = new Driver();
let myVendor = new Vendor('1-206-flowers');

// Create random pickupDetails
const pickupDetails = {
    customerName: chance.name(),
}

// Adds a new entry to the packages SQS queue via the "pickups" SNS topic.
//myVendor.createNewPickup(pickupDetails) // working

// Should recieve pickup via packages SQS queue, then create a new delivery in the store's SQS queue.
//myDriver.getPickups(); // working

// Should get delivery from SQS store delivery queue and output thank you.
myVendor.getDelivered();
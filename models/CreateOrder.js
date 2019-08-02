const mongoose = require('mongoose');

const { Schema } = mongoose;

const CreateOrderSchema = new Schema({
  shopeeOrderId: String,
  shopeeInventory: String,
  shipmentIds: Array,
  shopeePDFName: String,
  mainShopName: String,
  remarks: String,
});

export default CreateOrderSchema;



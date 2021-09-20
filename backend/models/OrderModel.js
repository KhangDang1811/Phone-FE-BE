import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    order_code: String,
    to_ward_code: String,
    to_district_id: Number,
    token: String,

    cancelOrder: Boolean,

    orderItems: [{
        name: { type: String, required: true},
        qty: { type: String, required: true},
        image: { type: String, required: true},
        special_price: { type: Number, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    shippingAddress: {
        city: {type: String},
        name:{type:String},
        address:{type:String},
        fullName: {type: String},
        phone: {type: String},
    },
    paymentMethod: String,
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    name: String,
    status: String,
    totalPrice: { type: Number},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{
    timestamps: true,
}
)

export const OrderModel = mongoose.model('Order', orderSchema);

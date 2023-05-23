import {object, string, InferType} from 'yup';

let checkoutSchema =object({
    firstName:string().required().min(2).max(255),
    lastName:string().required().min(2).max(255),
    emailAddress:string().email().required(),
    phoneNumber:string().required(),
    postCode:string().required().min(8),
    address:string().required().min(10).max(255),
    province:string().notRequired(),
    city:string().required().max(100),
    payment:string().oneOf(["Paystack","Flutterwave"]).required()
});
type Checkout = InferType<typeof checkoutSchema>
export type {Checkout};
export  default checkoutSchema;
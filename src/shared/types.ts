export enum PaymentTypes {
    CREDIT_CARD = "PaymentTypes.CREDIT_CARD",
    DEBIT = "PaymentTypes.DEBIT",
    PIX = "PaymentTypes.PIX",
}

export interface ConfigConstants {
    PAYMENT_QUEUE: string
}

export interface PaymentRequest {
    userId: number;
    purchaseId: number;
    paymentAmount: number;
    paymentType: PaymentTypes;
}
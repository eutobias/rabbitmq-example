export enum PaymentTypes {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT = "DEBIT",
    PIX = "PIX",
}

export enum PaymentStatus {
    PROCESSING= "PROCESSING",
    FAILED_SENT="FAILED_SENT",
    FAILED_PROCESSING="FAILED_PROCESSING",
    COMPLETE="COMPLETE"
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

export interface PaymentResponse {
    paymentStatus: PaymentStatus
}
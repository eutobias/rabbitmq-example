import { Message } from "amqplib";

export enum PaymentTypes {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT = "DEBIT",
    PIX = "PIX",
}

export enum PaymentStatus {
    PROCESSING = "PROCESSING",
    FAILED_SENT = "FAILED_SENT",
    FAILED_PROCESSING = "FAILED_PROCESSING",
    COMPLETE = "COMPLETE"
}

export interface ConfigConstants {
    PAYMENT_QUEUE: string,
    QUEUE_CONSUME_INTERVAL_MS?: number
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

export type QueueMessageCallback = (message: Message) => void
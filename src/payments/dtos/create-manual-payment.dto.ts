// src/payments/dtos/create-manual-payment.dto.ts

import { IsEnum } from 'class-validator';

export enum ManualPaymentResult {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export class CreateManualPaymentDto {
  @IsEnum(ManualPaymentResult)
  result!: ManualPaymentResult;
}

// export type InterestRate = {
//   period: string;
//   rate: number;
// };

export type LoanCalculationResult = {
  month: number;
  principalBalance: number;
  interestPayment: number;
  principalPayment: number;
  totalPayment: number;
};

export interface InterestRate {
  startMonth: number;
  endMonth: number;
  rate: number;
}

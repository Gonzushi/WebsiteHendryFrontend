// App.tsx
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface LoanCalculationResult {
  month: number;
  principalBalance: number;
  interestPayment: number;
  principalPayment: number;
  totalPayment: number;
}

interface InterestRate {
  startMonth: number;
  endMonth: number;
  rate: number;
}

const calculateFixedPayment = (
  balance: number,
  monthlyRate: number,
  numMonths: number,
): number => {
  if (monthlyRate === 0) return balance / numMonths;
  return (balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numMonths));
};

const calculateLoan = (
  principal: number,
  rates: InterestRate[],
): LoanCalculationResult[] => {
  const results: LoanCalculationResult[] = [];
  let balance = principal;

  rates.forEach(({ startMonth, endMonth, rate }) => {
    const numMonths = endMonth - startMonth + 1;
    const monthlyRate = rate / 100 / 12;
    const fixedPayment = calculateFixedPayment(balance, monthlyRate, numMonths);

    for (let monthOffset = 0; monthOffset < numMonths; monthOffset++) {
      const month = startMonth + monthOffset;
      const interestPayment = balance * monthlyRate;
      const principalPayment = fixedPayment - interestPayment;
      balance -= principalPayment;

      results.push({
        month,
        principalBalance: Math.max(0, balance),
        interestPayment,
        principalPayment,
        totalPayment: fixedPayment,
      });
    }
  });

  return results;
};

const App: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const rates: InterestRate[] = [
    { startMonth: 1, endMonth: 12, rate: 2.79 },
    { startMonth: 13, endMonth: 36, rate: 5.79 },
    { startMonth: 37, endMonth: 72, rate: 8.1 },
    { startMonth: 73, endMonth: 120, rate: 10.1 },
    { startMonth: 121, endMonth: 240, rate: 12.0 },
  ];
  const [results, setResults] = useState<LoanCalculationResult[]>([]);

  const handleCalculation = () => {
    const calculationResults = calculateLoan(principal, rates);
    setResults(calculationResults);
  };

  const data = {
    labels: results.map((res) => `Month ${res.month}`),
    datasets: [
      {
        label: "Interest Payment",
        data: results.map((res) => res.interestPayment),
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Principal Payment",
        data: results.map((res) => res.principalPayment),
        borderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        KPR Tiered Interest Calculator
      </h1>
      <div className="mb-4">
        <input
          type="number"
          className="w-full border p-2"
          placeholder="Principal Amount"
          value={principal}
          onChange={(e) => setPrincipal(+e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 px-4 py-2 text-white"
          onClick={handleCalculation}
        >
          Calculate
        </button>
      </div>

      <table className="mb-4 min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Balance</th>
            <th className="border px-4 py-2">Interest</th>
            <th className="border px-4 py-2">Principal</th>
            <th className="border px-4 py-2">Total Payment</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{result.month}</td>
              <td className="border px-4 py-2">
                {result.principalBalance.toFixed(2)}
              </td>
              <td className="border px-4 py-2">
                {result.interestPayment.toFixed(2)}
              </td>
              <td className="border px-4 py-2">
                {result.principalPayment.toFixed(2)}
              </td>
              <td className="border px-4 py-2">
                {result.totalPayment.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <Line data={data} />
      </div>
    </div>
  );
};

export default App;

import { TrendingUp, TrendingDown } from 'lucide-react';

import { useGetBalanceQuery } from '../../../store/api/transactionsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../shared/ui/card';

const BalanceCard = () => {
  const { data: balance, isLoading } = useGetBalanceQuery(undefined);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!balance) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
        <CardDescription>Total income minus expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-4xl font-bold">
              {parseFloat(balance.balance).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Current balance</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-2xl font-semibold">
                  {parseFloat(balance.income).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Income</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-2xl font-semibold">
                  {parseFloat(balance.expenses).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Expenses</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

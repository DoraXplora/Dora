import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Progress } from '@/src/components/ui/progress';

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* SOL Supply Card */}
      <Card>
        <CardHeader>
          <CardTitle>SOL Supply</CardTitle>
          <CardDescription>588,781,209.16</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm">
                <span>Circulating Supply</span>
                <span>80.6%</span>
              </div>
              <Progress value={80.6} className="mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Non-circulating Supply</span>
                <span>19.4%</span>
              </div>
              <Progress value={19.4} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Epoch Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Epoch</CardTitle>
          <CardDescription>701</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Slot Range</span>
              <span>302832000 to 303263999</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Time Remain</span>
              <span>1d 10h 48m 52s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Card */}
      <Card>
        <CardHeader>
          <CardTitle>Network (Transactions)</CardTitle>
          <CardDescription>340,202,425,152</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Block Height</span>
              <span>281437809</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>TPS</span>
              <span>4,414.5</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Stake Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Stake (SOL)</CardTitle>
          <CardDescription>386,000,318.55</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Stake</span>
              <span>99.7%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delinquent Stake</span>
              <span>0.3%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

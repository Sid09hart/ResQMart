// src/components/dashboard/PurchasesTab.jsx
import React, { useState, useEffect, useCallback } from "react";
import { getMyPurchasesApi } from "../../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react"; // Import a refresh icon

export default function PurchasesTab() {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPurchases = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMyPurchasesApi();

      // ✨ DEBUG LOG: See the exact data received from the API
    //   console.log("[Frontend] Data received from getMyPurchasesApi:", data);

      setPurchases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
      setPurchases([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  if (isLoading) return <p>Loading your purchase history...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Order History</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchPurchases}
          aria-label="Refresh purchases"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      {purchases.length === 0 ? (
        <Card className="text-center p-8">
          <p>You haven't purchased any items yet.</p>
        </Card>
      ) : (
        purchases.map((order) => (
          <Card key={order._id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>
                  Order on {new Date(order.createdAt).toLocaleDateString()}
                </CardTitle>
                <CardDescription className="mt-1">
                  Order ID: {order._id}
                </CardDescription>
              </div>
              <Badge>{order.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.products.map(
                ({ product, quantity, price }) =>
                  product && (
                    <div
                      key={product._id}
                      className="flex items-center gap-4 border-t pt-4 first:border-t-0 first:pt-0"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      </div>
                      <p className="font-semibold">
                        ${(price * quantity).toFixed(2)}
                      </p>
                    </div>
                  )
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

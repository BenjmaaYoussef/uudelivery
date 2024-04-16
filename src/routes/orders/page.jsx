import React from "react";
import { ArrowUpRight, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { BASE_URL } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";

export default function Orders() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(BASE_URL + "/api/order", fetcher);
  if (error) return "An error has occurred.";
  if (isLoading)
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center">
        <Card className="xl:col-span-2 max-w-6xl w-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Recent orders added into our database.
              </CardDescription>
            </div>
            <Skeleton className="w-[140px] h-[40px] rounded-lg ml-auto" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Destination</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    );
  console.log(data);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center">
      <Card className="xl:col-span-2 max-w-6xl w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Recent orders added into our database.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to="/orders/new">
              Add new order
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Destination</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Link to={"/orders/" + order._id}>
                      <div className="font-medium">{order._id}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.customerEmail}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{order.destination}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

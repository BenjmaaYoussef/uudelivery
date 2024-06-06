import React from "react";
import { ArrowUpRight, Check, Loader, Plus, Trash } from "lucide-react";

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
import useSWRMutation from "swr/mutation";
import { getUser } from "@/utils";
import { useToast } from "@/components/ui/use-toast";

async function deleteReq(url, { arg }) {
  console.log(arg.requestBody);
  return fetch(BASE_URL + "/api/order/" + arg.requestBody, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}

export default function Orders() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const user = getUser();
  const { toast } = useToast();
  console.log(user);
  async function updateReq(url, { arg }) {
    console.log(arg.requestBody);
    const res = await fetch(BASE_URL + "/api/order/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: arg.requestBody.start
        ? JSON.stringify({
            id: arg.requestBody.id,
            userId: user.id,
            start: true,
          })
        : JSON.stringify({
            id: arg.requestBody.id,
            userId: user.id,
            end: true,
          }),
    });
    if (!res.ok) {
      // Attach extra info to the error object.
      const msg = await res.json();
      const error = new Error(msg.message);
      error.status = res.status;
      throw error;
    }
    return res.json();
  }
  const { data, error, isLoading } = useSWR(BASE_URL + "/api/order", fetcher);
  const {
    data: deletedTracked,
    trigger: deleteTrackerPost,
    isMutating: isDeleting,
  } = useSWRMutation(BASE_URL + "/api/order", deleteReq);
  const {
    data: updatedOrder,
    trigger: updateOrder,
    isMutating: isUpdating,
  } = useSWRMutation(BASE_URL + "/api/order", updateReq);
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
                  <TableHead className="sr-only">Actions</TableHead>
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
          {user.roles.includes("Manager") && (
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="/orders/new">
                Add new order
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => {
                if (user.roles.includes("Manager")) {
                  return (
                    <TableRow key={order._id}>
                      <TableCell>
                        <Link to={"/track/" + order._id}>
                          <div className="font-medium">{order._id}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {order.customerEmail}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>
                        {order.start
                          ? new Date(order.start).toLocaleString()
                          : "Not started"}
                      </TableCell>
                      <TableCell>
                        {order.end
                          ? new Date(order.end).toLocaleString()
                          : "Not ended"}
                      </TableCell>
                      <TableCell className="text-right flex-col gap-1 md:flex-row">
                        <Button
                          size="sm"
                          className="md:ml-2 w-full md:w-auto"
                          disabled={isDeleting}
                          onClick={async () => {
                            try {
                              const result = await deleteTrackerPost({
                                requestBody: order._id,
                              });
                              setOpen(false);
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                        >
                          {isDeleting ? (
                            <>
                              <Loader className="h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              <Trash className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  if (
                    order.start == null ||
                    (order.end == null && user.id == order.userId)
                  )
                    return (
                      <TableRow key={order._id}>
                        <TableCell>
                          <Link to={"/track/" + order._id}>
                            <div className="font-medium">{order._id}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {order.customerEmail}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>{order.destination}</TableCell>
                        <TableCell>
                          {order.start
                            ? new Date(order.start).toLocaleString()
                            : "Not started"}
                        </TableCell>
                        <TableCell>
                          {order.end
                            ? new Date(order.end).toLocaleString()
                            : "Not ended"}
                        </TableCell>
                        <TableCell className="text-right flex-col gap-1 md:flex-row">
                          <Button
                            size="sm"
                            className={
                              order.start
                                ? "md:ml-2 w-full md:w-auto bg-red-800"
                                : "md:ml-2 w-full md:w-auto bg-green-800"
                            }
                            disabled={isUpdating}
                            onClick={async () => {
                              try {
                                const result = await updateOrder(
                                  order.start
                                    ? {
                                        requestBody: {
                                          id: order._id,
                                          end: true,
                                        },
                                      }
                                    : {
                                        requestBody: {
                                          id: order._id,
                                          start: true,
                                        },
                                      }
                                );
                                toast({
                                  description:
                                    "Order status updated successfully",
                                });
                              } catch (e) {
                                toast({
                                  description: e.message,
                                });
                                console.log(e);
                              }
                            }}
                          >
                            {isUpdating ? (
                              <>
                                <Loader className="h-4 w-4 animate-spin" />
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4" />
                              </>
                            )}
                            <span className="ml-1">
                              {order.start ? "End order" : "Start order"}
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                }
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

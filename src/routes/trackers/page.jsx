import React, { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Cross,
  Crosshair,
  Loader,
  Plus,
  Trash,
  X,
} from "lucide-react";

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
import useSWR, { useSWRConfig } from "swr";
import { BASE_URL } from "@/config";
import useSWRMutation from "swr/mutation";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/utils";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
async function postReq(url) {
  return fetch(BASE_URL + "/api/tracker", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => res.json());
}

async function deleteReq(url, { arg }) {
  console.log(arg.requestBody);
  return fetch(BASE_URL + "/api/tracker/" + arg.requestBody, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}

async function updateTrackerStatus(url, { arg }) {
  console.log(arg.requestBody);
  return fetch(BASE_URL + "/api/tracker/" + arg.requestBody.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      status: arg.requestBody.status,
    }),
  });
}

export default function Trackers() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const user = getUser();

  const { data, error, isLoading } = useSWR(BASE_URL + "/api/tracker", fetcher);
  const {
    data: newTracker,
    trigger: addTrackerPost,
    isMutating: isUpdating,
  } = useSWRMutation(BASE_URL + "/api/tracker", postReq);
  const {
    data: deletedTracked,
    trigger: deleteTrackerPost,
    isMutating: isDeleting,
  } = useSWRMutation(BASE_URL + "/api/tracker", deleteReq);
  const {
    data: updatedTracker,
    trigger: updateTracker,
    isMutating: isUpdatingStatus,
  } = useSWRMutation(BASE_URL + "/api/tracker", updateTrackerStatus);
  if (error) return "An error has occurred.";

  if (isLoading)
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center">
        <Card className="xl:col-span-2 max-w-6xl w-full">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Trackers</CardTitle>
              <CardDescription>
                All trackers available in our database
              </CardDescription>
            </div>
            <Skeleton className="w-[140px] h-[40px] rounded-lg ml-auto" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracker ID</TableHead>
                  <TableHead>Status</TableHead>
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
                  <TableCell>
                    <Skeleton className="w-[70px] h-[30px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-1/2 h-[30px] rounded-lg" />

                    <Skeleton className="w-[100px] h-[30px] rounded-lg ml-2" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[70px] h-[30px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-1/2 h-[30px] rounded-lg" />

                    <Skeleton className="w-[100px] h-[30px] rounded-lg ml-2" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[70px] h-[30px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-1/2 h-[30px] rounded-lg" />

                    <Skeleton className="w-[100px] h-[30px] rounded-lg ml-2" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[70px] h-[30px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-1/2 h-[30px] rounded-lg" />

                    <Skeleton className="w-[100px] h-[30px] rounded-lg ml-2" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      <Skeleton className="w-[150px] h-[30px] rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[70px] h-[30px] rounded-full" />
                  </TableCell>
                  <TableCell className="text-right flex">
                    <Skeleton className="w-1/2 h-[30px] rounded-lg" />

                    <Skeleton className="w-[100px] h-[30px] rounded-lg ml-2" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    );
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center">
      <Card className="xl:col-span-2 max-w-6xl w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Trackers</CardTitle>
            <CardDescription>
              All trackers available in our database
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracker ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="sr-only">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!data.message
                ? data.map((tracker) => (
                    <TableRow key={tracker._id}>
                      <TableCell>
                        <div className="font-medium">
                          {tracker.trackerId || tracker._id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"outline"}>
                          {capitalizeFirstLetter(tracker.status)}
                        </Badge>
                      </TableCell>
                      {user.roles.includes("Manager") ? (
                        <TableCell className="text-right flex-col gap-1 md:flex-row">
                          {tracker.status == "active" ? (
                            <Button
                              size="sm"
                              className="bg-red-800 hover:bg-red-950 mb-1 md:mb-0 w-full md:w-1/2"
                              disabled={isUpdatingStatus}
                              onClick={async () => {
                                try {
                                  const result = await updateTracker({
                                    requestBody: {
                                      id: tracker.trackerId,
                                      status: "inactive",
                                    },
                                  });
                                  setOpen(false);
                                } catch (e) {
                                  console.log(e);
                                }
                              }}
                            >
                              {isUpdatingStatus ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4 mr-2" />
                              )}
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-green-800 hover:bg-green-950 mb-1 md:mb-0 md:w-1/2 w-full"
                              disabled={isUpdatingStatus}
                              onClick={async () => {
                                try {
                                  const result = await updateTracker({
                                    requestBody: {
                                      id: tracker.trackerId,
                                      status: "active",
                                    },
                                  });
                                  setOpen(false);
                                } catch (e) {
                                  console.log(e);
                                }
                              }}
                            >
                              {isUpdatingStatus ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 mr-2" />
                              )}
                              Activate
                            </Button>
                          )}

                          <Button
                            size="sm"
                            className="md:ml-2 w-full md:w-auto"
                            disabled={isDeleting}
                            onClick={async () => {
                              try {
                                const result = await deleteTrackerPost({
                                  requestBody: tracker.trackerId,
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
                                <span className=" md:hidden">Delete</span>
                              </>
                            ) : (
                              <>
                                <Trash className="h-4 w-4" />
                                <span className=" md:hidden">Delete</span>
                              </>
                            )}
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell></TableCell>
                      )}
                    </TableRow>
                  ))
                : data.message}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

import React, { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { DialogClose } from "@radix-ui/react-dialog";
import { BASE_URL } from "@/config";
import useSWRMutation from "swr/mutation";
import { useToast } from "@/components/ui/use-toast";

async function postReq(url, { arg }) {
  console.log(arg.requestBody);
  return fetch(BASE_URL + "/api/order", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(arg.requestBody),
  }).then((res) => res.json());
}

export default function AddOrder() {
  const { toast } = useToast();

  const {
    data,
    trigger: addOrder,
    isMutating: isUpdating,
  } = useSWRMutation("/api/order", postReq);
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [temperatureMax, setTemperatureMax] = useState("");
  const [temperatureMin, setTemperatureMin] = useState("");
  const [tiltAngleMax, setTiltAngleMax] = useState("");
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 items-center">
      <div className="flex items-center justify-between gap-4 max-w-6xl w-full">
        <div className="flex gap-3">
          <Link to="/orders">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create a new order
          </h1>
        </div>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Save Order</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action will create an order on our servers.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    size="sm"
                    disabled={isUpdating}
                    onClick={async () => {
                      if (
                        destination == "" ||
                        customerEmail == "" ||
                        temperatureMax == "" ||
                        temperatureMin == "" ||
                        tiltAngleMax == ""
                      ) {
                        setOpen(false);
                        toast({
                          variant: "destructive",
                          title: "Uh oh! Something went wrong.",
                          description: "Make sure you filled all fields.",
                        });
                      } else {
                        try {
                          const newOrder = {
                            destination,
                            customerEmail,
                            temperatureMax,
                            temperatureMin,
                            tiltAngleMax,
                          };
                          const result = await addOrder({
                            requestBody: newOrder,
                          });
                          setOpen(false);
                          navigate("/orders");
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }}
                  >
                    Proceed
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 max-w-6xl w-full">
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Destination</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  placeholder="Please enter the location here..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Customer Email:</Label>
                <Input
                  id="name"
                  type="email"
                  className="w-full"
                  placeholder="Please enter the email here..."
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Temperature:</Label>
                <Slider
                  min={-10}
                  max={40}
                  className="w-full mt-2 py-2"
                  onValueChange={(e) => {
                    setTemperatureMax(e[1].toString());
                    setTemperatureMin(e[0].toString());
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Tilt Check:</Label>
                <Select onValueChange={(e) => setTiltAngleMax(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Very carefully: 5°</SelectItem>
                    <SelectItem value="25">Carefully: 25°</SelectItem>
                    <SelectItem value="45">Normal: 45°</SelectItem>
                    <SelectItem value="180">Don't care: 180°</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center gap-2 ml-auto md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Save Order</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action will create an order on our servers.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  size="sm"
                  disabled={isUpdating}
                  onClick={async () => {
                    if (
                      destination == "" ||
                      customerEmail == "" ||
                      temperatureMax == "" ||
                      temperatureMin == "" ||
                      tiltAngleMax == ""
                    ) {
                      setOpen(false);
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Make sure you filled all fields.",
                      });
                    } else {
                      try {
                        const newOrder = {
                          destination,
                          customerEmail,
                          temperatureMax,
                          temperatureMin,
                          tiltAngleMax,
                        };
                        const result = await addOrder({
                          requestBody: newOrder,
                        });
                        setOpen(false);
                        navigate("/orders");
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  }}
                >
                  Proceed
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

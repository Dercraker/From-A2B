"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import type { AddressType } from "@feat/address/address.schema";
import { cx } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";

type AddressDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  address: AddressType;
  setAddress: (address: AddressType) => void;
  adrAddress: string;
  dialogTitle: string;
  isLoading: boolean;
};

type AddressFields = {
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
};

export const createAddressSchema = (address: AddressFields) => {
  let schema = {};

  if (address.address1 !== "") {
    schema = {
      ...schema,
      address1: z.string().min(1, {
        message: "Address line 1 is required",
      }),
    };
  }

  schema = {
    ...schema,
    address2: z.string().optional(),
  };

  if (address.city !== "") {
    schema = {
      ...schema,
      city: z.string().min(1, {
        message: "City is required",
      }),
    };
  }

  if (address.region !== "") {
    schema = {
      ...schema,
      region: z.string().min(1, {
        message: "State is required",
      }),
    };
  }

  if (address.postalCode !== "") {
    schema = {
      ...schema,
      postalCode: z.string().min(1, {
        message: "Postal code is required",
      }),
    };
  }

  return z.object(schema);
};

const AddressDialog = ({
  address,
  adrAddress,
  dialogTitle,
  isLoading,
  open,
  setOpen,
  children,
}: React.PropsWithChildren<AddressDialogProps>) => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  const addressSchema = createAddressSchema({
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    region: address.region,
    postalCode: address.postalCode,
  });

  useEffect(() => {
    setAddress1(address.address1);
    setAddress2(address.address2 || "");
    setPostalCode(address.postalCode);
    setCity(address.city);
    setRegion(address.region);

    if (!open) {
      setErrorMap({});
    }
  }, [address, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-52 items-center justify-center">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : (
          <form>
            <div className="space-y-4 py-7">
              <div className="space-y-0.5">
                <Label
                  htmlFor="address1"
                  className={cx(
                    address.address1 === "" && "text-muted-foreground",
                  )}
                >
                  Address line 1
                </Label>
                <Input
                  value={address1}
                  onChange={(e) => setAddress1(e.currentTarget.value)}
                  disabled
                  id="address1"
                  name="address1"
                  placeholder="Address line 1"
                />
                {errorMap.address1 && (
                  <FormMessage>{errorMap.address1}</FormMessage>
                )}
              </div>

              <div className="space-y-0.5">
                <Label
                  htmlFor="address2"
                  className={cx(
                    address.address2 === "" && "text-muted-foreground",
                  )}
                >
                  Address line 2{" "}
                  <span className={cx("text-xs")}>(Optional)</span>
                </Label>
                <Input
                  value={address2}
                  onChange={(e) => setAddress2(e.currentTarget.value)}
                  disabled
                  id="address2"
                  name="address2"
                  placeholder="Address line 2"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-0.5">
                  <Label
                    htmlFor="city"
                    className={cx(
                      address.city === "" && "text-muted-foreground",
                    )}
                  >
                    City
                  </Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    disabled
                    id="city"
                    name="city"
                    placeholder="City"
                  />
                  {errorMap.city && <FormMessage />}
                </div>
                <div className="flex-1 space-y-0.5">
                  <Label
                    htmlFor="region"
                    className={cx(
                      address.region === "" && "text-muted-foreground",
                    )}
                  >
                    State / Province / Region
                  </Label>
                  <Input
                    value={region}
                    onChange={(e) => setRegion(e.currentTarget.value)}
                    disabled
                    id="region"
                    name="region"
                    placeholder="Region"
                  />
                  {errorMap.region && <FormMessage />}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-0.5">
                  <Label
                    htmlFor="postalCode"
                    className={cx(
                      address.postalCode === "" && "text-muted-foreground",
                    )}
                  >
                    Postal Code
                  </Label>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.currentTarget.value)}
                    disabled
                    id="postalCode"
                    name="postalCode"
                    placeholder="Postal Code"
                  />
                  {errorMap.postalCode && (
                    <FormMessage>{errorMap.postalCode}</FormMessage>
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <Label
                    htmlFor="country"
                    className={cx(
                      address.country === "" && "text-muted-foreground",
                    )}
                  >
                    Country
                  </Label>
                  <Input
                    value={address.country}
                    id="country"
                    disabled
                    name="country"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;

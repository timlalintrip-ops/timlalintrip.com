"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { getEmailBookingAvailability } from "@/app/book-now/actions";
import { buttonClassName, type Variant } from "@/components/ui/ButtonLink";
import { ArrowIcon, CloseIcon } from "@/components/ui/icons";
import { BookingForm } from "./BookingForm";

type BookingDialogProps = Omit<ComponentProps<typeof BookingForm>, "deliveryConfigured"> & {
  label: string;
  activityName?: string;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

export function BookingDialog({
  label,
  activityName,
  variant = "primary",
  className = "",
  withArrow = false,
  ...formProps
}: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [deliveryConfigured, setDeliveryConfigured] = useState<boolean>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  function openDialog() {
    setOpen(true);
    if (deliveryConfigured === undefined) {
      getEmailBookingAvailability().then(setDeliveryConfigured, () => setDeliveryConfigured(false));
    }
  }

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={openDialog} className={buttonClassName(variant, className)}>
        <span>{label}</span>
        {withArrow && (
          <ArrowIcon className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
        )}
      </button>
      {open &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={() => setOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) event.currentTarget.close();
            }}
            className="m-auto max-h-[calc(100dvh-1.5rem)] w-[min(100%-1.5rem,46rem)] overflow-y-auto overscroll-contain bg-sand p-0 text-charcoal shadow-2xl backdrop:bg-charcoal/70"
          >
            <div className="p-6 sm:p-10">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow mb-3 text-orange-deep">Booking enquiry</p>
                  <h2 id={titleId} className="text-title font-semibold">
                    {activityName ? `Book ${activityName}` : "Book your adventure"}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => dialogRef.current?.close()}
                  className="-mt-1 -mr-2 inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-charcoal transition-colors hover:text-orange-deep"
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>
              <BookingForm {...formProps} deliveryConfigured={deliveryConfigured} />
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}

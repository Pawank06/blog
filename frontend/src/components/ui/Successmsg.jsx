/* eslint-disable react/prop-types */
import { CheckCircle2Icon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export function Successmsg({ msg }) {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 2000);

  return (
    <div>
      {show && (
        <Alert variant="success" className="mb-5">
          <CheckCircle2Icon className="h-10 w-5" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{msg}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

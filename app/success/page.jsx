import { Suspense } from "react";
import SuccessComponent from "./SuccessComponent";

export default function SuccessPage() {
  return (
    <div>
      <Suspense fallback={<p>Chargement du paiement...</p>}>
        <SuccessComponent />
      </Suspense>
    </div>
  );
}

import { ShieldCheck } from "lucide-react";

const Proof = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <ShieldCheck className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mt-sp-3 text-2xl font-semibold">Proof & Artifacts</h2>
        <p className="mt-sp-1 max-w-md text-muted-foreground">
          Screenshots, checklists, and build evidence will be collected here.
        </p>
      </div>
    </div>
  );
};

export default Proof;

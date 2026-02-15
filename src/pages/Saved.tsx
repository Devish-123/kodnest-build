import { Bookmark } from "lucide-react";

const Saved = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-sp-4 py-sp-5">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Bookmark className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mt-sp-3 text-2xl font-semibold">No saved jobs</h2>
        <p className="mt-sp-1 max-w-md text-muted-foreground">
          Jobs you bookmark will appear here for quick reference.
        </p>
      </div>
    </div>
  );
};

export default Saved;

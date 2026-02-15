import { useState } from "react";
import { Check, Square } from "lucide-react";

interface ProofItem {
  label: string;
  checked: boolean;
}

const ProofFooter = () => {
  const [items, setItems] = useState<ProofItem[]>([
    { label: "UI Built", checked: false },
    { label: "Logic Working", checked: false },
    { label: "Test Passed", checked: false },
    { label: "Deployed", checked: false },
  ]);

  const toggle = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <footer className="border-t px-sp-4 py-sp-3">
      <div className="flex items-center gap-sp-4">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => toggle(i)}
            className="flex items-center gap-sp-1 text-sm transition-all duration-base ease-base hover:text-foreground"
          >
            {item.checked ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Square className="h-4 w-4 text-muted-foreground" />
            )}
            <span className={item.checked ? "text-foreground" : "text-muted-foreground"}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;

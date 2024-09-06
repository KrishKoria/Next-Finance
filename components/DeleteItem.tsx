"use client";
import { deleteTransaction } from "@/lib/actions";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader, X } from "lucide-react";

export default function DeleteItem({
  id,
  onRemoved,
}: {
  id: number;
  onRemoved: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemoved();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size="sm"
      variant={!confirmed ? "ghost" : "destructive"}
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className="h-4 w-4" />}
      {loading && <Loader className="h-4 w-4 animate-spin" />}
    </Button>
  );
}

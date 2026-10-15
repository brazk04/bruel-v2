"use client";

import { useEffect, useRef, useState } from "react";
import type { BookingReference } from "@/types/booking";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const maxSize = 10 * 1024 * 1024;

export function useBookingReferences() {
  const [references, setReferences] = useState<BookingReference[]>([]);
  const [error, setError] = useState("");
  const urls = useRef(new Set<string>());
  const sequence = useRef(0);

  useEffect(() => {
    const activeUrls = urls.current;
    return () => { activeUrls.forEach(url => URL.revokeObjectURL(url)); activeUrls.clear(); };
  }, []);

  const validate = (file: File) => {
    if (!allowedTypes.has(file.type)) return "Use imagens PNG, JPG ou WEBP.";
    if (file.size > maxSize) return `A imagem ${file.name} ultrapassa 10 MB.`;
    return "";
  };

  const add = (files: FileList | null) => {
    if (!files?.length) return;
    const selected = Array.from(files);
    if (references.length + selected.length > 5) { setError("Escolha até 5 referências."); return; }
    const invalid = selected.map(validate).find(Boolean);
    if (invalid) { setError(invalid); return; }
    const next = selected.map(file => {
      const url = URL.createObjectURL(file);
      urls.current.add(url);
      return { id: String(++sequence.current), file, url };
    });
    setReferences(current => [...current, ...next]);
    setError("");
  };

  const replace = (id: string, file: File | undefined) => {
    if (!file) return;
    const invalid = validate(file);
    if (invalid) { setError(invalid); return; }
    const old = references.find(item => item.id === id);
    if (!old) return;
    const url = URL.createObjectURL(file);
    urls.current.add(url);
    setReferences(current => current.map(item => item.id === id ? { id, file, url } : item));
    URL.revokeObjectURL(old.url);
    urls.current.delete(old.url);
    setError("");
  };

  const remove = (id: string) => {
    const old = references.find(item => item.id === id);
    if (!old) return;
    setReferences(current => current.filter(item => item.id !== id));
    URL.revokeObjectURL(old.url);
    urls.current.delete(old.url);
    setError("");
  };

  return { references, error, add, replace, remove };
}

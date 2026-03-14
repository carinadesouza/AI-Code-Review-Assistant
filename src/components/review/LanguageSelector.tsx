"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/lib/languages";
import { Language } from "@/lib/types";

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (lang: Language) => void;
}

export function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <Select
      value={selected.value}
      onValueChange={(val) => {
        const lang = LANGUAGES.find((l) => l.value === val);
        if (lang) onSelect(lang);
      }}
    >
      <SelectTrigger className="w-40 h-8 bg-transparent border-white/15 hover:border-white/40 text-white/60 hover:text-white/80 text-xs rounded-sm focus:ring-0 focus:ring-offset-0 transition-all">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-black border-white/15 text-white rounded-sm">
        {LANGUAGES.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
            className="text-xs text-white/60 focus:bg-white/8 focus:text-white cursor-pointer"
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

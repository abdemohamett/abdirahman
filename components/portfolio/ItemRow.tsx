import { ChevronDown } from "lucide-react";

export function ItemRow({
  icon,
  title,
  subtitle,
  year,
  chevron = true,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  year?: string;
  chevron?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 flex items-center justify-center text-muted-foreground">{icon}</div>
        <div className="leading-tight">
          <div className="text-[15px] font-medium text-foreground/95">{title}</div>
          {subtitle ? (
            <div className="text-muted-foreground text-sm">{subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        {year ? <span>{year}</span> : null}
        {chevron ? <ChevronDown className="h-4 w-4" /> : null}
      </div>
    </div>
  );
}



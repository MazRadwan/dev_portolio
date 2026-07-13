interface TermPaneProps {
  title?: string;
  status?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "div" | "article" | "section";
}

/* A framed terminal pane: square border, accent corner ticks, and an optional
   title bar with a right-aligned status slot. */
export function TermPane({
  title,
  status,
  children,
  className = "",
  bodyClassName = "",
  as: Tag = "div",
}: TermPaneProps) {
  return (
    <Tag className={`term-frame flex flex-col ${className}`}>
      {(title || status) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2.5">
          {title ? <span className="mono-label truncate text-faint">{title}</span> : <span />}
          {status ? <div className="shrink-0">{status}</div> : null}
        </div>
      )}
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}

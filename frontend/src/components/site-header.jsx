const SiteHeader = ({ title }) => {
  return (
    <header className="sticky top-0 z-40 mb-8 flex w-full items-center justify-between border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live System</span>
      </div>
    </header>
  )
}

export default SiteHeader

# Polakerja — Agent Instructions

## REQUIRED: Read architecture guide first

Before touching any code in this project, **read `docs/architecture.md`** to understand:
- The "1 Next.js, 2 domain" pattern (polakerja.com + webinar.polakerja.com via `proxy.ts`)
- Registry + Dispatcher pattern (`lib/webinars.ts` + `components/webinar/pages/registry.ts` + `app/webinar/[slug]/page.tsx`)
- Zero-storage filosofi (semua aset visual via URL eksternal)
- Mayar.id integration (URL redirect only — no API/webhook)
- CLI generator workflow (`npm run webinar:new`)
- File markers yang tidak boleh dihapus

For significant changes, also read relevant `docs/plans/` to understand prior design decisions.

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Notable Next.js 16 breaking changes used in this project:
- `middleware.ts` → `proxy.ts` (file rename), `middleware()` → `proxy()` (function rename)
- `params` in route components is now async (`Promise<Params>`)
<!-- END:nextjs-agent-rules -->

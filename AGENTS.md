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

## Deploy ke production

**Auto-deploy via GitHub TIDAK reliable** untuk project ini — push ke `master` di GitHub tidak men-trigger build Vercel secara otomatis (terbukti pada 2026-05-10: push sukses tapi production tetap versi 2 hari lalu sampai dideploy manual). **Selalu deploy manual** dengan Vercel CLI:

```bash
# dari root project
npx -y vercel@latest --prod --yes
```

Project terlink ke scope `dfundewananta-8668s-projects`, project name `polakerja`. Kalau `.vercel/project.json` stale (orgId tidak match), re-link dulu:

```bash
rm -rf .vercel
npx -y vercel@latest link --yes --project polakerja
```

Push ke GitHub `master` tetap dilakukan untuk source-of-truth — tapi harus diikuti `vercel --prod` manual untuk benar-benar live.

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Notable Next.js 16 breaking changes used in this project:
- `middleware.ts` → `proxy.ts` (file rename), `middleware()` → `proxy()` (function rename)
- `params` in route components is now async (`Promise<Params>`)
<!-- END:nextjs-agent-rules -->

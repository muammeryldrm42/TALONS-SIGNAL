# Talons Signal

Talons Signal is a Farcaster-first mini app with a dark purple UI, signal board home screen, rankings, radar, and a live referral quest worth 10 TS per unique referral.

## Included in this package

- Farcaster context auto-linking when opened inside Warpcast / Farcaster
- No top metric cards on the home screen
- Home, Rankings, Radar, Quest, and Profile pages
- Single active quest: referral quest
- 10 TS credited for each unique referral pair
- Cookie-backed session init
- Dynamic `/.well-known/farcaster.json` route so the manifest uses the deployed origin automatically
- Local Node store under `/tmp/talons-signal-store.json`

## Important production note

This package **runs as-is** in local Node hosting and single-instance environments.

For real durable referral accounting on Vercel or other serverless platforms, replace the `/tmp` JSON store with a persistent database such as Postgres, Redis, Supabase, or another external store.

## Development

```bash
npm install
npm run dev
```

## Deploy checklist

1. Deploy to Vercel.
2. Replace the `accountAssociation` values returned by `/.well-known/farcaster.json`.
3. Register the mini app in the Farcaster developer portal.
4. For durable production referrals, swap `/tmp` storage for a persistent database.

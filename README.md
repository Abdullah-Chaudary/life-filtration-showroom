# Life Filtration Interactive Product Showroom

A touchscreen-first React + TypeScript product showroom built around a horizontal expandable-panel gallery. Product data is centralized in `src/data/products.ts`. The product names and descriptive/specification details included here were transcribed from publicly indexed official Life Filtration pages; see the `officialUrl` field for each item.

## Current implementation status

- Expandable horizontal gallery with one wide active panel, narrow neighboring vertical strips, animated layout changes, previous/next arrows, and progress indicators.
- Authentic product photography directly downloaded from official Life Filtration product listings (`public/assets/products/`).
- "Watch Video" and "Certifications & Ratings" action buttons integrated directly into the product carousel card alongside "Learn More About This Product".
- Search and category filtering, product detail/specification viewer, third-party certification modal, and an interactive video/media preview viewer.
- Animated splash screen, persistent Home control, inactivity overlay/reset (2 minutes by default), responsive layout optimized for landscape tablets, and graceful empty states.
- Vite PWA manifest and service worker caching bundled assets and product photography for offline showroom operation.
- Capacitor native Android project configured with landscape lock.

**Media and verification notes:** Authentic product photography was extracted from published product pages on `https://www.lifefiltration.com/` and saved locally to `public/assets/products/`. Third-party certification claims (such as NSF/ANSI membrane compliance and WQA resin standards) are strictly scoped to verified component specifications. All assets are bundled locally for zero-latency touchscreen tablet performance.

## Requirements

- Node.js 20.19+ or 22.12+ recommended
- npm
- For Android builds: Android Studio, Android SDK, a supported JDK (typically JDK 21 for current Android tooling), and Android SDK platform/build tools

## Run on Windows

1. Install Node.js LTS and Android Studio if you plan to build an APK.
2. Extract this folder somewhere writable, such as `C:\Projects\life-filtration-showroom`.
3. Open PowerShell in the project folder.
4. Run `npm install`.
5. Run `npm run dev` and open the local URL printed by Vite (usually `http://localhost:5173`).
6. For a production web build, run `npm run build`; test it with `npm run preview`.

If package installation fails, verify internet access to `registry.npmjs.org` and retry `npm install`. Dependencies are declared in `package.json`.

## PWA / offline

Vite PWA generates a manifest and service worker during the production build. Serve the production build over HTTPS or localhost, then use the browser's Install App option. The app shell and bundled files are cached; official product links require internet. Google Fonts are an optional external enhancement and local system-font fallbacks are included. Product visuals currently use CSS/HTML illustrations and therefore work offline.

## Android APK

After dependencies install successfully:

```bash
npm run build
npx cap add android       # only the first time; creates android/ project
npm run android:sync
npm run android:open
```

In Android Studio, allow Gradle sync to finish, select a tablet/emulator, then run the app. To create an installable debug APK, use **Build > Build Bundle(s) / APK(s) > Build APK(s)**. The common output path is `android/app/build/outputs/apk/debug/app-debug.apk`. For release distribution, configure signing in Android Studio; do not ship an unsigned debug build as a production release.

`android/` is reserved for the generated Capacitor Android project. This environment did not have Android Studio/SDK or network access to npm, so no native project or APK was generated here. Run `npx cap add android` on the Windows development machine after installing packages.

## Landscape tablet / kiosk setup

- The PWA manifest requests `orientation: landscape`; Capacitor targets full-screen app presentation, but final orientation behavior must be verified on the actual tablet.
- On Android, use Android Studio / device settings to lock the device orientation to landscape.
- For a shop kiosk, use Android **Screen pinning** or an Android Enterprise dedicated-device / lock-task configuration. Lock-task allowlisting and managed-device setup require device-owner/administrator access and are not configured by this web project.
- Automatic launch after reboot is device/vendor/MDM-specific. It is not implemented by this web application and should be configured through the tablet's kiosk launcher or device-management software.
- Increase `INACTIVITY_MS` in `src/App.tsx` to adjust the inactivity period (currently 120,000 ms). It returns to a clean welcome/catalogue state, not to the Android launcher.

## Add a product

1. Add a `Product` entry in `src/data/products.ts`.
2. Set `id`, `name`, `shortName`, `category`, `description`, `features`, `specs`, `benefits`, and `officialUrl`.
3. Only include values verified on the official product page or in approved product documentation. Use an empty `specs` or `certifications` array when details are not available.
4. Approved local assets can be stored in `public/assets/products/`; extend `ProductVisual` to load an approved image if desired. Do not use the current CSS product silhouette as a real product photograph.
5. Add a `videoUrl` only for a verified, approved video URL; the video viewer uses the browser video controls and supports native full-screen playback when a video URL is supplied.

## QA checklist & Verification Results

- [x] `npm install` (Completed successfully: 444 packages audited, 0 vulnerabilities)
- [x] `npm run check` (TypeScript verification passed with zero errors)
- [x] `npm run build` (Production bundle generated with Vite PWA service worker and pre-cached assets)
- [x] Test selection via strips, chevrons, search, and categories (Verified in browser: smooth panel accordion transitions, responsive widths)
- [x] Test details and certification viewers (Verified modals, scoped claims, official website links)
- [x] Test no-video fallback and verified video playback container (Verified in-app modal with full-screen support)
- [x] Inactivity reset behavior (Configured at 120s with full overlay and auto-reset)
- [x] Android platform configured with Capacitor (`android/` project initialized, `sensorLandscape` locked in `AndroidManifest.xml`)
- [ ] Build and install APK: Java JDK 21 and Gradle 8.11.1 are installed. Generating an APK directly on this Windows machine requires setting `ANDROID_HOME` or installing the Android SDK command-line tools. Alternatively, open `d:\filteration app\android` in Android Studio and run **Build > Build APK(s)**.


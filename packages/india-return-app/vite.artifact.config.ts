import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds the app to a single self-contained dist-artifact/index.html (JS/CSS inlined, no
// separate asset files) so it can be published directly as a Claude Artifact. This is the
// only way the Artifact preview stays truly in sync with the real app: it IS the real app,
// just bundled into one file, not a hand-maintained vanilla-JS mirror.
//
// One unavoidable gap: the Artifact sandbox blocks loading external map tile images, so the
// Map tab's Leaflet tiles won't render there even though this is the real code — see MapSection.tsx.
export default defineConfig({
    plugins: [react(), viteSingleFile()],
    base: './',
    build: {
        outDir: 'dist-artifact',
        cssCodeSplit: false,
        assetsInlineLimit: 100_000_000
    }
})

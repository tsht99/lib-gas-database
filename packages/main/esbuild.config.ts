import esbuild, { BuildOptions } from 'esbuild'

const config: Partial<BuildOptions> = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    format: 'esm',
    platform: 'node',
}

esbuild.build(config).catch(() => process.exit(1))

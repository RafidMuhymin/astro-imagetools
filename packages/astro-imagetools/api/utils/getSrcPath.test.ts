import path from 'node:path';
import { describe, expect, it, afterAll, vi } from 'vitest'
import {getSrcPath} from './getSrcPath';

vi.mock("../../astroViteConfigs.js", () => {
  return {
   default: {
    rootDir: buildPath(),
    // Custom publicDir
    publicDir: buildPath('out'),
   }
  }
})

/**
 * Build an absolute path to the target in the fixture directory
 */
function buildPath(target = '') {
  return path.resolve(__dirname, '../../test-fixtures/getSrcPath', target)
}

describe('getLinkElement', () => {
  afterAll(() => {
    vi.unmock("../../astroViteConfigs.js");
  })

  it('finds a file in the root of the project', () => {
    const result = getSrcPath('root.jpeg');
    expect(result).toBe(buildPath('root.jpeg'));
  })

  it('finds a file in the public folder', () => {
    const result = getSrcPath('out.jpeg');
    expect(result).toBe(buildPath('out/out.jpeg'));
  })

  it('returns an absolute path unchanged, if it exists', () => {
    const result = getSrcPath(buildPath('out/out.jpeg'));
    expect(result).toBe(buildPath('out/out.jpeg'));
  })

  it('handles query parameters', () => {
    const result = getSrcPath('root.jpeg?w=200');
    expect(result).toBe(buildPath('root.jpeg?w=200'));
  })

  it('handles query parameters for public-resolved files', () => {
    const result = getSrcPath('out.jpeg?w=200');
    expect(result).toBe(buildPath('out/out.jpeg?w=200'));
  })

  it('returns the original input if the file is not found', () => {
    const result = getSrcPath('https://cdn.nedis.com/images/products_high_res/TVRC2080BK_P30.JPG');
    expect(result).toBe('https://cdn.nedis.com/images/products_high_res/TVRC2080BK_P30.JPG');
  })

  it('finds relative paths correctly', () => {
    const outResult = getSrcPath('./out/out.jpeg');
    const rootResult = getSrcPath('./root.jpeg');
    expect(outResult).toBe(buildPath('out/out.jpeg'));
    expect(rootResult).toBe(buildPath('root.jpeg'));
  })
})

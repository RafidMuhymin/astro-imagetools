import { beforeEach, describe, expect, it, vi } from "vitest";

describe("GlobalConfigOptions", () => {
  beforeEach(() => {
    // Need to reset the modules so that we can change the mock implementation between tests
    vi.resetModules();
  });

  it("Should be an empty object by default, if a config file isn't found", async () => {
    // Simulate not finding a config file
    vi.doMock("find-up", () => {
      return {
        findUp: async () => undefined,
      };
    });
    // Need to import this after the mocks are set up with `doMock`.
    const { GlobalConfigOptions } = await import("./runtimeChecks");
    expect(GlobalConfigOptions).toEqual({});
  });

  it("should return the configuration from a global config file", async () => {
    // Find a config file, and mock the contents of that file
    vi.doMock("find-up", () => {
      return {
        findUp: async () => "mockedConfigFile",
      };
    });
    vi.doMock("mockedConfigFile", () => {
      return {
        default: { breakpoints: [800, 1200] },
      };
    });
    const { GlobalConfigOptions } = await import("./runtimeChecks");
    expect(GlobalConfigOptions).toEqual({ breakpoints: [800, 1200] });
  });
});

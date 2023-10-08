import * as core from "@actions/core";

/**
 * action.yaml definition.
 */
export interface ActionConfig {
  /**
   * Elastic API token for making requests.
   */
  token: string;

  /**
   * The base url of the sourcemap that is being uploaded
   */
  base_url: string;

  /**
   * Project id in raygun to upload sourcemaps
   */
  project_id: string;

  /**
   * Folder to recursively look for sourcemaps
   */
  folder?: string;
}

export function getConfig(): ActionConfig {
  return {
    token: core.getInput("token", { required: true }),
    base_url: trimTrailingSlash(core.getInput("base_url", { required: true })),
    project_id: core.getInput("project_id", { required: true }),
    folder: (() => {
      const input = core.getInput("folder");
      return input === "" ? "./" : input;
    })(),
  };
}

function trimTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

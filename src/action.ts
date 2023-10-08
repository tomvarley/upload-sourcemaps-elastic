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
  elastic_url: string;

  /**
   * The base url of the sourcemap that is being uploaded
   */
  base_url: string;

  /**
   * Service name in Elastic to upload sourcemaps
   */
  service_name: string;

  /**
   * Service version in Elastic to upload sourcemaps
   */
  service_version: string;

  /**
   * Folder to recursively look for sourcemaps
   */
  folder?: string;
}

export function getConfig(): ActionConfig {
  return {
    token: core.getInput("token", { required: true }),
    elastic_url: core.getInput("elastic_url", { required: true }),
    base_url: trimTrailingSlash(core.getInput("base_url", { required: true })),
    service_name: core.getInput("service_name", { required: true }),
    service_version: core.getInput("service_version", { required: true }),
    folder: (() => {
      const input = core.getInput("folder");
      return input === "" ? "./" : input;
    })(),
  };
}

function trimTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

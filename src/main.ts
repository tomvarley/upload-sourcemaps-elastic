import path from "path";
import * as core from "@actions/core";
import jetpack from "fs-jetpack";
import fetch from "node-fetch";
import { default as FormData } from "form-data";
import { getConfig } from "./action";

async function run(): Promise<void> {
  try {
    const config = getConfig();

    core.info(`Sending sourcemap files to Elastic...`);

    const sourcemaps = jetpack.find(config.folder!, { matching: "*.js.map" });

    if (sourcemaps.length === 0) {
      core.info(`No sourcemaps found in folder '${config.folder}'`);
    }

    for (const sourcemap of sourcemaps) {
      const formData = new FormData();

      const url = `${config.base_url}/${path.parse(sourcemap).base}`;
      const fileStream = jetpack.createReadStream(sourcemap, {
        encoding: "utf8",
      });

      formData.append("service_name", config.service_name);
      formData.append("service_version", config.service_version);
      formData.append("bundle_filepath", url);
      formData.append("sourcemap", fileStream);

      core.debug(`Calling url: ${config.elastic_url}/api/apm/sourcemaps`);

      core.info(`Sending sourcemap: ${sourcemap} with url ${url} to Elastic`);

      const res = await fetch(`${config.elastic_url}/api/apm/sourcemaps`, {
        method: "POST",
        headers: {
          Authorization: `ApiKey ${config.token}`,
          "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
          "kbn-xsrf": "true",
        },
        body: formData,
      });

      const jsonResponse = JSON.stringify(await res.json())

      core.debug(`Response json: ${jsonResponse}`);

      if (!res.ok) {
        core.info(`Response json: ${jsonResponse}`);
        throw new Error(
          `Sending failed with response: [${res.status}] ${res.statusText}`,
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.error(`Failed: ${error.message}`);

      error.stack && core.debug(error.stack);
      core.setFailed(error.message);
    }
  }
}

(() => run())();



async function doTheThing() {
  const FormData = require('form-data');
  const jetpack = require('fs-jetpack')
  const trace_events = require('node:trace_events');
  // const {fileFromSync}= require('node-fetch')

  const tracing = trace_events.createTracing({ categories: ['node.net.native'] });
  tracing.enable();  // Enable trace event capture for the 'node.perf' category



  const formData = new FormData();

  const url = `https://www.test.com`;
  const { promises: fs } = require("fs");
  var file = await fs.readFile('./local-86642694.js.map')
  const fileStream = jetpack.createReadStream('./local-86642694.js.map', {
    encoding: "utf8",
    name: 'file',
    filename: 'local-86642694.js.map',
  });

  formData.append('service_name', '"foo"');
  formData.append('service_version', '"1.0.0"');
  formData.append('bundle_filepath', '"/test/e2e/general-usecase/bundle.js.map"');
  formData.append('sourcemap', fileStream);

  // core.debug(`Calling url: https://phocas-software-elastic-cloud.kb.us-west-2.aws.found.io:9243/api/apm/sourcemaps`);
  //
  // core.info(`Sending sourcemap: ${sourcemap} with url ${url} to Elastic`);

  console.log(formData)

  const res = await fetch(`https://phocas-software-elastic-cloud.kb.us-west-2.aws.found.io:9243/api/apm/sourcemaps`, {
    method: "POST",
    headers: {
      Authorization: `ApiKey RGxvSjg0b0JiY0N5RS0zQ2pSOVc6Y1IzNGs2dnBTUHFWbi1yUnV0SDFmQQ==`,
      "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
      "kbn-xsrf": "true",
    },
    body: formData,
  });


  if (!res.ok) {
    console.log(`Sending failed with response: [${res.status}] ${res.statusText}`)
  }
  console.log(`Response json: ${JSON.stringify(await res.json())}`);
}

doTheThing()

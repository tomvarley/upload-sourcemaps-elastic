# GitHub Action: upload-sourcemaps-elastic

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tomvarley/upload-sourcemaps-elastic/build-test?style=flat-square)](https://github.com/tomvarley/upload-sourcemaps-elastic/actions/workflows/test.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![codecov](https://img.shields.io/codecov/c/github/tomvarley/upload-sourcemaps-elastic?style=flat-square)](https://codecov.io/gh/tomvarley/upload-sourcemaps-elastic)

Github action to take sourcemaps generated as part of the build process and upload them to Elastic, using the process documented here: https://www.elastic.co/guide/en/kibana/current/rum-sourcemap-api.html.

## Usage

```yaml
steps:
  - name: Upload sourcemap to Elastic
    uses: tomvarley/upload-sourcemaps-elastic@v1
    with:
      token: abc123  # Your Elastic external access token
      base_url: https://www.test.com
      elastic_url:
      service_name: 123xyz #Elastic service name
      service_version: 1.0.0 # Elastic service version
      folder: ./sourcemaps # Location to recursively search for sourcemaps with .js.map extension
```

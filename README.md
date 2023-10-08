# GitHub Action: upload-sourcemaps-elastic

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tomvarley/upload-sourcemaps-elastic/build-test?style=flat-square)](https://github.com/tomvarley/upload-sourcemaps-elastic/actions/workflows/test.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![codecov](https://img.shields.io/codecov/c/github/tomvarley/upload-sourcemaps-elastic?style=flat-square)](https://codecov.io/gh/tomvarley/upload-sourcemaps-elastic)

Github action to take sourcemaps generated as part of the build process and upload them to Elastic, using the process documented here: .

## Usage

```yaml
steps:
  - name: Upload sourcemap to Elastic
    uses: tomvarley/upload-sourcemaps-elastic@v1
    with:
      token: abc123  # Your Elastic external access token
      project_id: 123xyz #Elastic app identifier, found under Application Settings -> JS source map center
      base_url: https://www.fancyapp.com/release/V2/static/js/
      folder: ./sourcemaps # Location to recursively search for sourcemaps with .js.map extension
```

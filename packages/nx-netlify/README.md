# nx-netlify

## Usage

Add the following target to your project in `workspace.json`:

```json
"deploy": {
    "executor": "@joshmorony/nx-netlify:deploy",
    "options": {
        "siteId": "<your site id from Netlify>",
        "deployDir": "public",
        "functionsDir": "functions", // optional, folder must contain only compiled functions
    }
},
```

**IMPORTANT:** You will need to define your private Netlify API key as `NETLIFY_TOKEN` in your `.env` file or otherwise you will need to pass it manually as an option through the executor using the `auth` option.

### Supported options

```
siteId: string;
deployDir: string;
functionsDir?: string;
buildTarget?: string;
skipBuild?: boolean;
alias?: string;
auth?: string;
json?: boolean;
message?: string;
open?: boolean;
prod?: boolean;
prodIfUnlocked?: boolean;
skipFunctionsCache?: boolean;
timeout?: string;
debug?: boolean;
httpProxy?: string;
httpProxyCertificateFilename?: string;
```

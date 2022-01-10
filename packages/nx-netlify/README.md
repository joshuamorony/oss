# nx-netlify

## Usage

```
npm install @joshmorony/nx-netlify
```

Add the following target to your project in `workspace.json`:

```json
"deploy": {
    "executor": "@joshmorony/nx-netlify:deploy",
    "options": {
        "siteId": "<your site id from Netlify>", // from the Netlify site you want to deploy to
        "deployDir": "public", // folder that contains the built output to be deployed
        "functionsDir": "functions", // optional, folder must contain only compiled lambda functions
    }
},
```

**IMPORTANT:** You will need to define a Personal access token from Netlify as `NETLIFY_TOKEN` in your `.env` file or otherwise you will need to pass it manually as an option through the executor using the `auth` option.

Trigger deploy:

```
nx mysite deploy
```

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

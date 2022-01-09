export interface DeployExecutorSchema {
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
}

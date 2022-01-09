export interface DeployExecutorSchema {
  siteId: string;
  deployDir: string;
  functionsDir?: string;
  buildTarget?: string;
  skipBuild?: boolean;
  prodIfUnlocked?: boolean;
}

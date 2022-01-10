import { DeployExecutorSchema } from './schema';
import { ExecutorContext, runExecutor as run } from '@nrwl/devkit';
import runCommands from '@nrwl/workspace/src/executors/run-commands/run-commands.impl';

export default async function runExecutor(
  options: DeployExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for deploy', options);

  if (options.skipBuild) {
    console.log(`📦 Skipping build`);
  } else {
    const buildTarget = options.buildTarget ? options.buildTarget : 'build';

    console.log(
      `📦 Building "${context.projectName}". Build Command: ${buildTarget}.`
    );

    let buildResult = false;

    for await (const s of await run(
      { project: context.projectName, target: buildTarget },
      { watch: true },
      context
    )) {
      console.log('Build successful: ', s.success);
      buildResult = s.success;
    }

    if (buildResult !== true) {
      console.error(`❌ Application build failed`);
      return {
        error: `❌ Application build failed`,
        success: false,
      };
    }
  }

  if (!process.env.NETLIFY_TOKEN && !options.auth) {
    console.error(
      '🚨 Define an environment variable for NETLIFY_TOKEN or supply it manually as an option for "auth"'
    );
    return { success: false };
  }

  const projectRoot = `${context.root}/${
    context.workspace.projects[context.projectName].root
  }`;

  const auth = options.auth ? options.auth : '$NETLIFY_TOKEN';

  let deployCommand = `netlify deploy --auth=${auth} --site='${options.siteId}' --dir='${projectRoot}/${options.deployDir}'`;

  if (options.functionsDir) {
    deployCommand += ` --functions='${projectRoot}/${options.functionsDir}'`;
  }

  if (options.alias) {
    deployCommand += ` --alias='${options.alias}'`;
  }

  if (options.json) {
    deployCommand += ` --json`;
  }

  if (options.message) {
    deployCommand += ` --message='${options.message}'`;
  }

  if (options.open) {
    deployCommand += ` --open`;
  }

  if (options.prod) {
    deployCommand += ` --prod`;
  }

  if (options.prodIfUnlocked) {
    deployCommand += ` --prodIfUnlocked`;
  }

  if (options.skipFunctionsCache) {
    deployCommand += ` --skip-functions-cache`;
  }

  if (options.timeout) {
    deployCommand += ` --timeout='${options.timeout}'`;
  }

  if (options.debug) {
    deployCommand += ` --debug`;
  }

  if (options.httpProxy) {
    deployCommand += ` --httpProxy='${options.httpProxy}'`;
  }

  if (options.httpProxyCertificateFilename) {
    deployCommand += ` --httpProxyCertificateFilename='${options.httpProxyCertificateFilename}'`;
  }

  console.log(`Attempting deploy from 📂 ./${options.deployDir}`);

  if (options.functionsDir) {
    console.log(`Deploying functions from 📂 ./${options.functionsDir}`);
  }

  const result = await runCommands({ command: deployCommand }, context);

  if (result.success) {
    console.log(`✔ Your site was successfully deployed`);
    return result;
  } else {
    console.error(`❌ Site deploy failed`);
    return {
      error: '❌ Site deploy failed',
      success: false,
    };
  }
}

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
    if (!context.target) {
      throw new Error('Target required for building');
    }

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

  if (!process.env.NETLIFY_TOKEN) {
    console.error('🚨 Define an environment variable for NETLIFY_TOKEN');
    return { success: false };
  }

  let deployCommand = `netlify deploy --auth=$NETLIFY_TOKEN --site='${options.siteId}' --dir='${options.deployDir}'`;

  if (options.functionsDir) {
    deployCommand += ` --functions='${options.functionsDir}'`;
  }

  if (options.prodIfUnlocked) {
    deployCommand += ` --prodIfUnlocked`;
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

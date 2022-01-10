jest.mock('@nrwl/devkit');
jest.mock('@nrwl/workspace/src/executors/run-commands/run-commands.impl');

import { ExecutorContext } from '@nrwl/devkit';
import { DeployExecutorSchema } from './schema';
import executor from './executor';
import runCommands from '@nrwl/workspace/src/executors/run-commands/run-commands.impl';

const options: DeployExecutorSchema = {
  siteId: 'abc',
  deployDir: 'public',
};

describe('Deploy Executor', () => {
  let context: ExecutorContext;
  let options: DeployExecutorSchema;

  beforeEach(() => {
    context = {
      root: '/root',
      projectName: 'my-app',
    } as ExecutorContext;

    options = {
      siteId: 'abc',
      deployDir: 'public',
    };
  });

  afterEach(() => jest.clearAllMocks());
});

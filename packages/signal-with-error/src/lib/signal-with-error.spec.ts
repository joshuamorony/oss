import { signalWithError } from './signal-with-error';

describe('signalWithError', () => {
  it('should work', () => {
    expect(signalWithError()).toEqual('signal-with-error');
  });
});

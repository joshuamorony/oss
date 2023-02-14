import { remarkShorten } from './remark-shorten';

describe('remarkShorten', () => {
  it('should work', () => {
    expect(remarkShorten()).toEqual('remark-shorten');
  });
});

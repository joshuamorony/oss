import { remarkShorten } from './remark-shorten';
import { remark } from 'remark';

describe('remarkShorten', () => {
  it('should work', () => {
    remark().process('1');
    expect(remarkShorten()).toEqual('remark-shorten');
  });
});

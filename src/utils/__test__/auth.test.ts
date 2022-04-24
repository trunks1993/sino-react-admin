import { setAuthInfo, getAuthInfo } from '../auth';

describe('测试授权信息缓存', () => {
  it('测试setAuthInfo、getAuthInfo', () => {

    setAuthInfo({ access_token: '123' });

    expect(getAuthInfo()).toEqual(JSON.stringify({ access_token: '123' }));
  });
});

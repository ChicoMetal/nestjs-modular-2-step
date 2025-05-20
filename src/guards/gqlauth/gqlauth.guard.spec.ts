import { GqlAuthGuard } from './gqlauth.guard';

describe('GqlauthGuard', () => {
  it('should be defined', () => {
    expect(new GqlAuthGuard()).toBeDefined();
  });
});

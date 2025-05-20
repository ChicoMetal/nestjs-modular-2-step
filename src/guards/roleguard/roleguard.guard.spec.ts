import { RoleGuard } from './role.guard';

describe('RoledGuard', () => {
  it('should be defined', () => {
    expect(new RoleGuard()).toBeDefined();
  });
});

import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('User Entity', () => {
  describe('validatePassword', () => {
    let user : User;

    beforeEach(() => {
      user = new User();
      user.password = 'testPassword';
      user.salt = 'testSalt';
      bcrypt.hash = jest.fn();
    });

    it('returns true as password is valid', async () => {
      bcrypt.hash.mockReturnValue('testPassword');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('12345');

      expect(bcrypt.hash).toHaveBeenCalledWith('12345', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      bcrypt.hash.mockReturnValue('testWrongPassword');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('testWrongPassword');

      expect(bcrypt.hash).toHaveBeenCalledWith('testWrongPassword', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
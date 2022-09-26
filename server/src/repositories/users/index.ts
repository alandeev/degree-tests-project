import { User } from '../../models/user'
import users from '../data'

export const getByUsername = async (
  username: string,
): Promise<User | undefined> => users.find(user => user.username === username)

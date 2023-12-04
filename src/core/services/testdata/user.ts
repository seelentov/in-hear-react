import { User } from "models/User";
import { generateId } from "utils/data/generateId";

export const user = new User({
  id: generateId(),
  login: 'testuser',
  email: 'test@user.ru',
  name: 'Test'
})
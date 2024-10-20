import config from 'config';
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = bcrypt.hashSync(password, salt);
  password = hash;
  return password;
}

export async function comparePassword(
  confirm_password: string,
  password: string,
) {
  const check = await bcrypt
    .compare(confirm_password, password)
    .catch((_) => false);
  console.log(check);
  return check;
}

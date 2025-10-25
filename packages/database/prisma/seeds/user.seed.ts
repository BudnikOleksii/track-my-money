import { PrismaClient, UserRole, Currency, CountryCode } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createSuperAdminUser = async () => {
  console.log('🔐 Creating SUPER_ADMIN user...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@trackmymoney.com' },
  });

  let user;
  if (existingUser) {
    user = existingUser;
    console.log(`👤 Found existing SUPER_ADMIN user: ${user.email}`);
  } else {
    user = await prisma.user.create({
      data: {
        email: 'admin@trackmymoney.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: UserRole.SUPER_ADMIN,
        isEmailVerified: true,
        country: CountryCode.UA,
        baseCurrency: Currency.UAH,
      },
    });
    console.log(`✅ Created SUPER_ADMIN user: ${user.email}`);
  }

  return user;
};

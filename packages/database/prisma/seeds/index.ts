import { PrismaClient } from '@prisma/client';
import { createSuperAdminUser } from './user.seed';
import { createCategories } from './category.seed';
import { createTransactions } from './transaction.seed';
import { loadTransactionData } from './data-loader';

const prisma = new PrismaClient();

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Load transaction data
    console.log('📖 Loading transaction data...');
    const transactions = await loadTransactionData();
    console.log(`📊 Loaded ${transactions.length} transactions`);

    // Create SUPER_ADMIN user
    const user = await createSuperAdminUser();

    // Create categories and subcategories
    const { createdCategories, createdSubcategories } = await createCategories(
      user.id,
      transactions,
    );

    // Create transactions
    await createTransactions(
      user.id,
      transactions,
      createdCategories,
      createdSubcategories,
    );

    console.log('🎉 Database seeding completed successfully!');

    // Show summary
    const userCount = await prisma.user.count();
    const categoryCount = await prisma.category.count();
    const transactionCount = await prisma.transaction.count();

    console.log('\n📈 Database Summary:');
    console.log(`👤 Users: ${userCount}`);
    console.log(`📂 Categories: ${categoryCount}`);
    console.log(`💰 Transactions: ${transactionCount}`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

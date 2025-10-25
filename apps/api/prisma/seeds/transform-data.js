const fs = require('fs');
const path = require('path');

const categoryTranslations = {
  Транспортные: 'Транспорт',
  Бытовые: 'Побутові',
  'Базовые потребности': 'Базові потреби',
  Развлечения: 'Розваги',
  Обучение: 'Навчання',
  Донати: 'Донати',
  Допомога: 'Допомога',
  'Дохід (програмування)': 'Дохід (програмування)',
  'Робота ментором': 'Робота ментором',
  'Зарплата(туризм)': 'Зарплата(туризм)',
  Кешбек: 'Кешбек',
  Проценти: 'Проценти',
  Податки: 'Податки',
  Свята: 'Свята',
  Походи: 'Походи',
};

const subcategoryTranslations = {
  Tакси: 'Tаксі',
  техника: 'Техніка',
  Друзья: 'Друзі',
  Разное: 'Різне',
  обучение: 'Навчання',
  Продукты: 'Продукти',
  Банкинг: 'Банкінг',
  'ТБ+интернет': 'ТБ+інтернет',
  ЄСВ: 'ЄСВ',
  'Єдиний податок': 'Єдиний податок',
  'Бухлішко и т.д.': 'Бухлішко и т.д.',
  'Спорядження та розхідники': 'Спорядження та розхідники',
};

function translateCategory(category) {
  return categoryTranslations[category] || category;
}

function translateSubcategory(subcategory) {
  return subcategoryTranslations[subcategory] || subcategory;
}

function transformTransaction(transaction) {
  const transformed = {
    Date: transaction.Date,
    Category: translateCategory(transaction.Category),
    Type: transaction['Income/Expense'],
    Amount: transaction.Amount,
    Currency: transaction.Currency,
  };

  if (transaction.Subcategory) {
    transformed.Subcategory = translateSubcategory(transaction.Subcategory);
  }

  return transformed;
}

function main() {
  try {
    const sourcePath = path.join(
      __dirname,
      'data',
      'Money Manager_2-3-25.json',
    );
    const targetPath = path.join(
      __dirname,
      'data',
      'transactions-02.03.25.json',
    );

    console.log('Reading source file:', sourcePath);
    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

    console.log(`Processing ${sourceData.length} transactions...`);

    const transformedData = sourceData.map(transformTransaction);

    console.log('Writing transformed data to:', targetPath);
    fs.writeFileSync(
      targetPath,
      JSON.stringify(transformedData, null, 2),
      'utf8',
    );

    console.log('✅ Transformation completed successfully!');
    console.log(`📊 Processed ${transformedData.length} transactions`);

    // Show some statistics
    const categories = [...new Set(transformedData.map((t) => t.Category))];
    const subcategories = [
      ...new Set(transformedData.map((t) => t.Subcategory).filter(Boolean)),
    ];

    console.log(`📈 Categories found: ${categories.length}`);
    console.log(`📈 Subcategories found: ${subcategories.length}`);

    // Show sample of transformed data
    console.log('\n📋 Sample of transformed data:');
    console.log(JSON.stringify(transformedData.slice(0, 3), null, 2));
  } catch (error) {
    console.error('❌ Error during transformation:', error.message);
    process.exit(1);
  }
}

main();

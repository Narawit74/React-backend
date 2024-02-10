const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database todolist_test')
  await prisma.$executeRawUnsafe('CREATE Database todolist_test')
}
console.log('Reset DB')
run()
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function run() {
  try {
    const Password = bcrypt.hashSync('123');
    const UserData = [
      { Username: 'rayko', Password, Email: 'andy@ggmail.com', avatar: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
      { Username: 'rayko2', Password, Email: 'bobby@ggmail.com', avatar: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
      { Username: 'jimmy', Password, Email: 'jimmy@ggmail.com', avatar: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
      { Username: 'Snoool', display:'NackNarawit', Password, Email: 'yocharee74@gmail.com', avatar: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg' },
    ];

    const RentBook = [
      { Title: 'Learn HTML', Duedate: new Date(), UserID: 1 },
      { Title: 'Learn js', Duedate: new Date(), UserID: 2 },
      { Title: 'Learn java', Duedate: new Date(), UserID: 3 },
      { Title: 'Learn your mom', Duedate: new Date(), UserID: 3 },
      { Title: 'Learn your Test Node.js', Duedate: new Date(), UserID: 4 },
      { Title: 'Learn your Test Node.js', Duedate: new Date(), UserID: 4 },
    ];

    await prisma.user.createMany({
      data: UserData
    });

    await prisma.RentBook.createMany({
      data: RentBook
    });

    const usersWithAvatar = await prisma.user.findMany({
      select: {
        Username: true,
        avatar: true
      }
    });

    console.log(usersWithAvatar);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();

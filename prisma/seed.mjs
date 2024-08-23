const mockData = [
  {
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'leanne.graham@example.com',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
  },
  {
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'ervin.howell@example.com',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
  },
  {
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'clementine.bauch@example.com',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
  },
  {
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'patricia.lebsack@example.com',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
  },
  {
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'chelsey.dietrich@example.com',
    phone: '(254)954-1289',
    website: 'demarco.info',
  },
  {
    name: 'Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'dennis.schulist@example.com',
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
  },
  {
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'kurtis.weissnat@example.com',
    phone: '210.067.6132',
    website: 'elvis.io',
  },
  {
    name: 'Nicholas Runolfsdottir',
    username: 'Maxime_Nienow',
    email: 'nicholas.runolfsdottir@example.com',
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
  },
  {
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'glenna.reichert@example.com',
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
  },
  {
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'clementina.dubuque@example.com',
    phone: '024-648-3804',
    website: 'ambrose.net',
  },
  {
    name: 'Sophia Cruz',
    username: 'Sophia_Cruz',
    email: 'sophia.cruz@example.com',
    phone: '098-765-4321',
    website: 'sophiacruz.me',
  },
  {
    name: 'Michael Green',
    username: 'Michael_Green',
    email: 'michael.green@example.com',
    phone: '123-456-7890',
    website: 'michaelgreen.org',
  },
  {
    name: 'Isabella Young',
    username: 'Isabella_Young',
    email: 'isabella.young@example.com',
    phone: '234-567-8901',
    website: 'isabellayoung.net',
  },
  {
    name: 'James Smith',
    username: 'James_Smith',
    email: 'james.smith@example.com',
    phone: '345-678-9012',
    website: 'jamessmith.com',
  },
  {
    name: 'Emily Johnson',
    username: 'Emily_Johnson',
    email: 'emily.johnson@example.com',
    phone: '456-789-0123',
    website: 'emilyjohnson.org',
  },
  {
    name: 'Oliver Martinez',
    username: 'Oliver_Martinez',
    email: 'oliver.martinez@example.com',
    phone: '567-890-1234',
    website: 'olivermartinez.net',
  },
  {
    name: 'Ava Davis',
    username: 'Ava_Davis',
    email: 'ava.davis@example.com',
    phone: '678-901-2345',
    website: 'avadavis.com',
  },
  {
    name: 'Liam Wilson',
    username: 'Liam_Wilson',
    email: 'liam.wilson@example.com',
    phone: '789-012-3456',
    website: 'liamwilson.org',
  },
  {
    name: 'Mia Martinez',
    username: 'Mia_Martinez',
    email: 'mia.martinez@example.com',
    phone: '890-123-4567',
    website: 'miamartinez.com',
  },
  {
    name: 'Noah Brown',
    username: 'Noah_Brown',
    email: 'noah.brown@example.com',
    phone: '901-234-5678',
    website: 'noahbrown.net',
  },
  {
    name: 'Emma Garcia',
    username: 'Emma_Garcia',
    email: 'emma.garcia@example.com',
    phone: '012-345-6789',
    website: 'emmagarcia.org',
  },
  {
    name: 'Lucas Hernandez',
    username: 'Lucas_Hernandez',
    email: 'lucas.hernandez@example.com',
    phone: '123-456-7899',
    website: 'lucashernandez.com',
  },
  {
    name: 'Sophia Lopez',
    username: 'Sophia_Lopez',
    email: 'sophia.lopez@example.com',
    phone: '234-567-8909',
    website: 'sophialopez.net',
  },
  {
    name: 'Mason Gonzalez',
    username: 'Mason_Gonzalez',
    email: 'mason.gonzalez@example.com',
    phone: '345-678-9019',
    website: 'masongonzalez.com',
  },
  {
    name: 'Ella Martinez',
    username: 'Ella_Martinez',
    email: 'ella.martinez@example.com',
    phone: '456-789-0129',
    website: 'ellamartinez.org',
  },
  {
    name: 'Jacob Smith',
    username: 'Jacob_Smith',
    email: 'jacob.smith@example.com',
    phone: '567-890-1239',
    website: 'jacobsmith.com',
  },
  {
    name: 'Aria White',
    username: 'Aria_White',
    email: 'aria.white@example.com',
    phone: '678-901-2349',
    website: 'ariawhite.net',
  },
  {
    name: 'William Moore',
    username: 'William_Moore',
    email: 'william.moore@example.com',
    phone: '789-012-3459',
    website: 'williammoore.com',
  },
  {
    name: 'Isabella Martinez',
    username: 'Isabella_Martinez',
    email: 'isabella.martinez@example.com',
    phone: '890-123-4569',
    website: 'isabellamartinez.net',
  },
  {
    name: 'Michael Johnson',
    username: 'Michael_Johnson',
    email: 'michael.johnson@example.com',
    phone: '901-234-5679',
    website: 'michaeljohnson.com',
  },
  {
    name: 'Mia Gonzalez',
    username: 'Mia_Gonzalez',
    email: 'mia.gonzalez@example.com',
    phone: '012-345-6789',
    website: 'miagonzalez.org',
  },
];

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let user of mockData) {
    await prisma.user.create({
      data: user
    })
  }
}

main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect();
})

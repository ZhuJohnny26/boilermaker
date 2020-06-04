const {db, Game, System, User} = require('./server/db/index')

const games = [{
        name: 'minecraft',
        description: 'In Minecraft, players explore a blocky, procedurally-generated 3D world, and may discover and extract raw materials, craft tools, build structures or earthworks, and depending on game mode, can fight computer-controlled "mobs", as well as either cooperate with or compete against other players in the same world. These modes include a survival mode, in which players must acquire resources to build the world and maintain health, and a creative mode, where players have unlimited resources. Players can modify the game to create new gameplay mechanics, items, and assets.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Minecraft_cover.png/220px-Minecraft_cover.png'
    }, {
        name: 'warcraft III: The Frozen Throne',
        description: "In the game, as in many real-time strategy (RTS) games, players collect resources, train individual units and heroes, and build bases in order to: achieve various goals (in single-player mode), or to defeat the enemy player. Four playable factions can be chosen from: Humans, Orcs, (both of which appeared in the previous games) and two new factions: the Night Elves and the Undead. Warcraft III's single-player campaign is laid out similarly to that of StarCraft, and is told through the races in a progressive manner. Players can also play matches against the computer, or against others—using local area networking (LAN) or Blizzard's Battle.net gaming platform.",
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Warcraftiii-frozen-throne-boxcover.jpg/220px-Warcraftiii-frozen-throne-boxcover.jpg'
    }, {
        name: 'Halo 5: Guardians',
        description: "Halo 5: Guardians is a first-person shooter video game developed by 343 Industries and published by Microsoft Studios for the Xbox One. The fifth mainline entry and tenth overall in the Halo series, it was released worldwide on October 27, 2015. The game's plot follows two fireteams of human supersoldiers: Blue Team, led by Master Chief, and Fireteam Osiris, led by Spartan Locke. When the former goes absent without leave to track down the artificial intelligence construct Cortana, Master Chief's loyalty is called into question, and Fireteam Osiris is sent to retrieve him.",
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Halo_Guardians.png/220px-Halo_Guardians.png'
    }, {
        name: 'God of War (2018 video game)',
        description: "God of War[a] is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment (SIE). Released on April 20, 2018, for the PlayStation 4 (PS4), it is the eighth installment in the God of War series, the eighth chronologically, and the sequel to 2010's God of War III. Unlike previous games, which were loosely based on Greek mythology, this installment is rooted in Norse mythology, with the majority of it set in ancient Norway in the realm of Midgard. For the first time in the series, there are two protagonists: Kratos, the former Greek God of War who remains the only playable character, and his young son Atreus. Following the death of Kratos' second wife and Atreus' mother, they journey to fulfill her request that her ashes be spread at the highest peak of the nine realms. Kratos keeps his troubled past a secret from Atreus, who is unaware of his divine nature. Along their journey, they encounter monsters and gods of the Norse world.",
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/220px-God_of_War_4_cover.jpg'
    }, {
        name: 'terraria ',
        description: 'Terraria is an action-adventure sandbox game developed by Re-Logic. The game was initially released for Microsoft Windows on May 16, 2011, and has since been released for other PC, consoles, handhelds, and mobile platform. Terraria features exploration, crafting, building, and combat with a variety of creatures in a procedurally generated 2D world. Terraria received generally positive reviews, with praise given to its sandbox elements. By April 2020, the game had sold over 30 million copies.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/42/TerrariaLogo2.png/220px-TerrariaLogo2.png'
    }]

const systems = [{
    name: 'PC',
    logo: 'https://www.logolynx.com/images/logolynx/63/633ed2b59706be18123c43f087bcd8d0.jpeg'
}, {
    name: 'Xbox',
    logo: 'https://news.xbox.com/en-us/wp-content/uploads/sites/2/xboxlogoHERO-1-hero-1-hero.jpg?resize=940%2C528'
}, {
    name: 'Playstation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1200px-PlayStation_logo.svg.png'
}]


const seed = async () => {
    try {
        await db.sync({ force: true });
        await Promise.all(games.map(game => {
            return Game.create(game);
        }))
        await Promise.all(systems.map(system => {
            return System.create(system);
        }))
        await User.create({
            email: 'cody@email.com',
            password: 'destruction'

        })
    } catch (err) {
        console.log('Error in Seeding', err);
    }
};

if (require.main === module) {
seed()
    .then(() => {
    console.log('Seeding success!');
    db.close();
    })
    .catch((err) => {
    console.error('Oh noes! Something went wrong!');
    console.error(err);
    db.close();
    });
}

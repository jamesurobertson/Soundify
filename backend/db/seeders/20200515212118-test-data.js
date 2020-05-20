'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        const users = await queryInterface.bulkInsert("Users",
            [
                {
                    userName: 'bryceMorgan',
                    firstName: 'Bryce',
                    lastName: 'Morgan',
                    email: 'Test@email.com',
                    hashedPassword: bcrypt.hashSync(faker.internet.password()),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

            ],
            { returning: true }
        )


        const playlists = await queryInterface.bulkInsert('Playlists',
            [
                {
                    name: 'The best playlist Ever',
                    imageURL: 'path/to/image',
                    createdBy: users[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        const artists = await queryInterface.bulkInsert('Artists',
            [
                {
                    name: 'Blink 182',
                    biography: 'Blinks bio',
                    imageURL: 'path/to/image',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Post Malone',
                    biography: 'Post Malones Bio',
                    imageURL: 'path/to/image',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        const albums = await queryInterface.bulkInsert('Albums',
            [
                {
                    title: 'Blink 182',
                    artistId: artists[0].id,
                    imageURL: 'path/to/image',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Hollywoods Blessing',
                    artistId: 2,
                    imageURL: 'path/to/image',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        const songs = await queryInterface.bulkInsert('Songs',
            [
                {
                    title: `What's my age again?`,
                    songLength: '00:02:28',
                    albumId: albums[0].id,
                    songURL: 'path/to/song/url',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Circles',
                    songLength: '00:02:56',
                    albumId: 2,
                    songURL: 'path/to/song/url',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        const playlistSongs = await queryInterface.bulkInsert('PlaylistSongs',
            [
                {
                    playlistId: playlists[0].id,
                    songId: songs[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    playlistId: playlists[0].id,
                    songId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        // return queryInterface.bulkInsert('Followers',
        //   [
        //     {
        //       title: artists[0].name,
        //       followableType: 'artist',
        //       followableId: users[0].id,
        //       userId: users[0].id,
        //       createdAt: new Date(),
        //       updatedAt: new Date(),
        //     }
        //   ],
        //   {returning: true}
        // )

    },

    down: async (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        await queryInterface.bulkDelete("Followers", null, {});
        await queryInterface.bulkDelete("Playlists", null, {});
        await queryInterface.bulkDelete("Songs", null, {});
        await queryInterface.bulkDelete("Users", null, {});
        await queryInterface.bulkDelete("Albums", null, {});
        await queryInterface.bulkDelete("Artists", null, {});
        return queryInterface.bulkDelete("PlaylistSongs", null, {});
    }

}

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
                {
                    userName: 'Chris',
                    firstName: 'Chris',
                    lastName: 'Tran',
                    email: 'chris@email.com',
                    hashedPassword: bcrypt.hashSync('password'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }

            ],
            { returning: true }
        )


        const playlists = await queryInterface.bulkInsert('Playlists',
            [
                {
                    name: 'The best playlist Ever',
                    imageURL: '../images/generic-artist.png',
                    createdBy: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'The 2nd best playlist Ever',
                    imageURL: '../images/generic-artist.png',
                    createdBy: 2,
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
                    imageURL: '../images/generic-artist.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Post Malone',
                    biography: 'Post Malones Bio',
                    imageURL: '../images/generic-artist.png',
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
                    artistId: 1,
                    imageURL: '../images/Blink-182_cover.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'beerbongs & bentleys',
                    artistId: 2,
                    imageURL: '../images/Post_Malone_cover.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        const songs = await queryInterface.bulkInsert('Songs',
            [
                {
                    title: `What's My Age Again?`,
                    songLength: '00:02:29',
                    albumId: 1,
                    songURL: '../music/blink-182/whats-my-age-again.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: `All The Small Things`,
                    songLength: '00:02:47',
                    albumId: 1,
                    songURL: '../music/blink-182/all-the-small-things.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: `I Miss You`,
                    songLength: '00:02:29',
                    albumId: 1,
                    songURL: '../music/blink-182/i-miss-you.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: `First Date`,
                    songLength: '00:02:51',
                    albumId: 1,
                    songURL: '../music/blink-182/first-date.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: `Feeling This`,
                    songLength: '00:02:52',
                    albumId: 1,
                    songURL: '../music/blink-182/feeling-this.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'rockstar',
                    songLength: '00:03:38',
                    albumId: 2,
                    songURL: '../music/post-malone/rockstar.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Psycho',
                    songLength: '00:03:41',
                    albumId: 2,
                    songURL: '../music/post-malone/psycho.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Better Now',
                    songLength: '00:02:56',
                    albumId: 2,
                    songURL: '../music/post-malone/better-now.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Otherside',
                    songLength: '00:03:48',
                    albumId: 2,
                    songURL: '../music/post-malone/otherside.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Candy Paint',
                    songLength: '00:03:48',
                    albumId: 2,
                    songURL: '../music/post-malone/candy-paint.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            { returning: true }
        )

        const playlistSongs = await queryInterface.bulkInsert('PlaylistSongs',
            [
                {
                    playlistId: 1,
                    songId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    playlistId: 1,
                    songId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    playlistId: 2,
                    songId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

        return queryInterface.bulkInsert('Followers',
            [
                {
                    title: "Hello",
                    followableType: 'artist',
                    followableId: 2,
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            { returning: true }
        )

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

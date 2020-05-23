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
                },
                {
                    userName: 'James',
                    firstName: 'James',
                    lastName: 'Robertson',
                    email: 'jamesurobertson@gmail.com',
                    hashedPassword: bcrypt.hashSync('password'),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userName: 'b',
                    firstName: 'b',
                    lastName: 'b',
                    email: 'b@yahoo.com',
                    hashedPassword: bcrypt.hashSync('password'),
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
                },
                {
                    name: 'Chance The Rapper',
                    biography: 'Chance The Rapper Bio',
                    imageURL: '../images/generic-artist.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Rage Against The Machine',
                    biography: 'Rage Against The Machine Bio',
                    imageURL: '../images/generic-artist.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

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
                },
                {
                    title: 'Acidrap',
                    artistId: 3,
                    imageURL: '../images/Chance_The_Rapper_cover.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Rage Against The Machine',
                    artistId: 4,
                    imageURL: '../images/Rage_Against_The_Machine_cover.jpg',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },

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
                {
                    title: 'Good Ass Intro',
                    songLength: '00:03:59',
                    albumId: 3,
                    songURL: '../music/chance-the-rapper/good-ass-intro.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Pusha Man',
                    songLength: '00:02:19',
                    albumId: 3,
                    songURL: '../music/chance-the-rapper/pusha-man.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Cocoa Butter Kisses',
                    songLength: '00:05:07',
                    albumId: 3,
                    songURL: '../music/chance-the-rapper/cocoa-butter-kisses.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Smoke Again',
                    songLength: '00:04:33',
                    albumId: 3,
                    songURL: '../music/chance-the-rapper/smoke-again.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {

                    title: 'Acid Rain',
                    songLength: '00:03:36',
                    albumId: 3,
                    songURL: '../music/chance-the-rapper/acid-rain.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {

                    title: 'Bombtrack',
                    songLength: '00:04:03',
                    albumId: 4,
                    songURL: '../music/rage-against-the-machine/bombtrack.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {

                    title: 'Killing In The Name',
                    songLength: '00:05:13',
                    albumId: 4,
                    songURL: '../music/rage-against-the-machine/killing-in-the-name.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {

                    title: 'Take The Power Back',
                    songLength: '00:05:36',
                    albumId: 4,
                    songURL: '../music/rage-against-the-machine/take-the-power-back.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {

                    title: 'Settle For Nothing',
                    songLength: '00:04:47',
                    albumId: 4,
                    songURL: '../music/rage-against-the-machine/settle-for-nothing.mp3',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {

                    title: 'Bullet In The Head',
                    songLength: '00:05:07',
                    albumId: 4,
                    songURL: '../music/rage-against-the-machine/bullet-in-the-head.mp3',
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

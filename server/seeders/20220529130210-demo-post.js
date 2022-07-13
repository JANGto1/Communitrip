'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [{
      title: '한라산',
      image: 'https://api.cdn.visitjeju.net/photomng/imgpath/201911/29/48bdb99e-20ba-4fb6-82f2-6ea79ceefb0d.jpg',
      contents: '정상 분화구에 백록담(白鹿潭)이라는 호수가 있다.',
      user_id: '1',
      tag_id: '1',
      total_likes: '8',
      address: '대한민국 제주도',
      latitude: '33.21.41',
      longitude: '126.31.46',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: '충주호',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Chungjuho_Lake.jpg/2560px-Chungjuho_Lake.jpg',
      contents: '충주호(忠州湖)는 1985년에 종민동과 동량면 사이의 계곡을 막아서 지어진 충주댐에 의해 만들어진 인공 호수다',
      user_id: '2',
      tag_id: '2',
      total_likes: '8',
      address: '충청북도 충주시',
      latitude: '36.57.07',
      longitude: '128.02.34',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};

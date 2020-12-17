import Mock from 'mockjs';
import API from '@/ajax/api';
const Random = Mock.Random;

var dataList = [];
for (let i = 0; i < Math.floor(Math.random() * 100 + 1); i++) {
  dataList.push(
    Mock.mock({
      id: Random.integer(1, 5),
      'title|1-5': '测试title',
      image: Random.image('375x120'),
      date: Random.datetime(),
      name: Random.cname(),
      age: Random.integer(25, 50),
      company: '公司',
      category: ['分类1', '分类2'],
      'choose|1': ['choose1', 'choose2', 'choose3'],
      address: Random.county(true),
      price: Random.natural(1000, 9999),
      phone: Random.natural(11311111111, 18900000000)
    })
  );
}

const userList = {
  url: API.requireAuth.userList.url,
  type: API.requireAuth.userList.type,
  data: dataList
};

export default {
  userList
};

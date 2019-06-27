import Mock from 'mockjs'
const Random = Mock.Random

var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': Random.integer(1, 5),
    'title|1-5': '测试title',
    'image': Random.image('375x120'),
    'date': Random.datetime(),
    'name': Random.cname(),
    'company': '公司',
    'category': ['分类1', '分类2'],
    'choose|1': ['choose1', 'choose2', 'choose3'],
    'price': Random.natural(1000, 9999)
  }))
}

const list = {
  url: '/private/list',
  type: 'get',
  data: dataList
}

export default {
  list
}

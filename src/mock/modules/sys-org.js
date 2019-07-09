import Mock from 'mockjs'
import API from '@/ajax/api'
const Random = Mock.Random

let store = Mock.mock({
  'id': Random.integer(1, 5),
  'name': Random.cname(),
  'role|1': ['总店', '直营店', '加盟店'],
  'phone': Random.natural(11311111111, 18900000000),
  'address': Random.county(true),
  'date': Random.datetime()
})

let storeList = []
for (let i = 0; i < Math.floor(Math.random() * 500 + 1); i++) {
  storeList.push(Mock.mock({
    'id': Random.integer(1, 5),
    'name': Random.cname(),
    'role|1': ['总店', '直营店', '加盟店'],
    'phone': Random.natural(11311111111, 18900000000),
    'address': Random.county(true),
    'date': Random.datetime()
  }))
}

const getStoreList = {
  url: API.requireAuth.storeList.url,
  type: API.requireAuth.storeList.type,
  data: {
    'msg': 'success',
    'code': 200,
    'storeList': storeList
  }
}

const getStoreDetail = {
  url: API.requireAuth.oneStore.url,
  type: API.requireAuth.oneStore.type,
  data: {
    'msg': 'success',
    'code': 200,
    'store': store
  }
}

const saveStore = {
  url: API.requireAuth.storeSave.url,
  type: API.requireAuth.storeSave.type,
  data: {
    'msg': 'success',
    'code': 200
  }
}

const deleteStore = {
  url: API.requireAuth.storeDelete.url,
  type: API.requireAuth.storeDelete.type,
  data: {
    'msg': 'success',
    'code': 200
  }
}

const updateStore = {
  url: API.requireAuth.storeUpdate.url,
  type: API.requireAuth.storeUpdate.type,
  data: {
    'msg': 'success',
    'code': 200
  }
}

export default {
  getStoreList,
  getStoreDetail,
  saveStore,
  deleteStore,
  updateStore
}

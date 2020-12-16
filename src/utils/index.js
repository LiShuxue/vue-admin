import { Loading } from 'element-ui';

let loadingInstance = null;
let loadingCount = 0;

export const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
  });
};

export const showLoading = () => {
  if (loadingCount === 0) {
    loadingInstance = Loading.service({
      lock: true,
      text: 'Loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.6)'
    });
  }
  loadingCount++;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount--;
  if (loadingCount === 0) {
    loadingInstance && loadingInstance.close();
    loadingInstance = null;
  }
};

export const isEmpty = value => {
  return value === '' || value === null || value === undefined;
};

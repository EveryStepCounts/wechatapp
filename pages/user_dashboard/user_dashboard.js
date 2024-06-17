import QRCode from '../../utils/weapp-qrcode.js';

Page({
  data: {
    username: '',
    userId: '',
    checkinCount: 0,
    totalDistance: 0,
    distances: ['1 km', '2 km', '3 km', '4 km', '5 km'],
    selectedDistanceIndex: 0,
    qrcodeImage: '',
    checkins: []
  },

  onLoad() {
    this.loadUserData();
  },

  loadUserData() {
    const userId = wx.getStorageSync('user_id');
    wx.request({
      url: `https://nightrunner.org/api/user_dashboard?user_id=${userId}`,
      method: 'GET',
      success: (res) => {
        if (res.data.success) {
          this.setData({
            username: res.data.username,
            userId: userId,
            checkinCount: res.data.checkin_count,
            totalDistance: res.data.total_distance,
            checkins: res.data.checkins
          });
        } else {
          wx.showToast({
            title: 'Failed to load user data',
            icon: 'none'
          });
        }
      }
    });
  },

  onDistanceChange(e) {
    this.setData({
      selectedDistanceIndex: e.detail.value
    });
  },

  onSubmitDistance() {
    const userId = wx.getStorageSync('user_id');
    const distance = this.data.distances[this.data.selectedDistanceIndex].split(' ')[0];
    this.generateQRCode(userId, distance);
  },

  generateQRCode(userId, distance) {
    const data = `${userId}-${distance}`;
    new QRCode('canvas', {
      text: data,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    const that = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success(res) {
        that.setData({
          qrcodeImage: res.tempFilePath
        });
      },
      fail(err) {
        console.error(err);
      }
    });
  }
});

// login.js

Page({
  onLogin(e) {
    const { username, password } = e.detail.value;
    if (!username || !password) {
      wx.showToast({
        title: 'Please enter both username and password',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: 'https://nightrunner.org/api/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      success: (res) => {
        if (res.data.success) {
          wx.setStorageSync('user_id', res.data.user_id);
          wx.redirectTo({
            url: '/pages/user_dashboard/user_dashboard'
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
  }
});

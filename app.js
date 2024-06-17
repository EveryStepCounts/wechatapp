App({
  onLaunch() {
    const userId = wx.getStorageSync('user_id');
    if (!userId) {
      wx.redirectTo({ url: '/pages/login/login' });
    } else {
      wx.redirectTo({ url: '/pages/user_dashboard/user_dashboard' });
    }
  }
});

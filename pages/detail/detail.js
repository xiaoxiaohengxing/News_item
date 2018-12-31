Page({
  data: {
    newsId: 0,
    detailData: {}
  },

  // 页面读取时，获得新闻ID
  onLoad(option) {
    this.setData({
      newsId: option.id
    })
    this.getDetail()
  },
  //获取网络数据
  getDetail() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: { 'id': this.data.newsId },
      success: res => {
        let result = res.data.result
        result.date = result.date.slice(0, 10) + ' ' + result.date.slice(11, 16)
        this.setData({
          detailData: result
        })
      },
      fail: res => {
        wx.showToast({
          icon: "none",
          title: 'code:404'
        })
      }
    })
  },
  //返回键触发函数
  backToHomepage() {
    wx.navigateBack({
      delta: 1
    })
  }
})
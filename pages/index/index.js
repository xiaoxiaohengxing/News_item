var TYPEINDEX = 0 // 新闻种类在this.data.newsTabs数组中的位置
Page({
  data:{
    newsTabs: [//新闻类别栏的data
      {text: '国内',type: 'gn',select: 'selected',selectLine: 'selectedLine',num: 0}, 
      {text: '国际',type: 'gj',select: '',selectLine: '',num: 1},
      {text: '财经',type: 'cj',select: '',selectLine: '',num: 2},
      {text: '娱乐',type: 'yl',select: '',selectLine: '',num: 3},
      {text: '军事',type: 'js',select: '',selectLine: '',num: 4},
      {text: '体育',type: 'ty',select: '',selectLine: '',num: 5},
      {text: '其他',type: 'other',select: '',selectLine: '',num: 6}
      ],
    top:{},//top新闻data
    newsList:[]//一般新闻data
  },

  onLoad(){
    this.getLatestNews(TYPEINDEX);
  },
  //获取网络数据
  getLatestNews(typeIndex, callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', 
      data: { "type": this.data.newsTabs[typeIndex].type },
      success: res=>{
        let result=res.data.result
        this.setNewsData(result)
      },
      fail: res => {
        wx.showToast({
          icon: "none",
          title: 'code:404'
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  //下拉刷新和结束刷新
  onPullDownRefresh() {
    this.getLatestNews(TYPEINDEX, () => {
      wx.stopPullDownRefresh()
    })
  },
  //更新top和newsList
  setNewsData(result){
    let newsList=[]
    let listLength=0  
    listLength = result.length
    for(var i=1 ; i<listLength ; ++i){
        let temp=result[i]
        temp.date = temp.date.slice(11,16)
        newsList.push(temp)
    }
    let top = {}
    top = result[0]
    top.date = top.date.slice(11, 16)
    this.setData({
      top:top,
      newsList:newsList
    })
  },
  //点按新闻类别时触发函数
  onNewsTabsTap(event) {
    TYPEINDEX = event.currentTarget.dataset.type
    this.setNewsTabsStyle()
    this.getLatestNews(TYPEINDEX)
  },
  //设置类别栏的样式
  setNewsTabsStyle() {
    let newsTabs = []
    for (let i = 0; i < 7; i++) {
    let temp = this.data.newsTabs[i]
    temp.select = '' 
    temp.selectLine = ''
    newsTabs.push(temp)
    }
    newsTabs[TYPEINDEX].select = 'selected'
    newsTabs[TYPEINDEX].selectLine = 'selectedLine'
    this.setData({
      newsTabs: newsTabs
    })
  },
  //点击新闻时触发函数
  onNewsTap(event) {
    let id = event.currentTarget.dataset.type
    let newsTabs = this.data.newsTabs[TYPEINDEX].type
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
})
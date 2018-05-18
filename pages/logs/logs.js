

Page({
  data: {
    userInfo: {},
    mealInfoList:[]
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo: userInfo
    })
  },
  onShow:function(){
    var that = this
    var token = wx.getStorageSync("token")
    wx.request({
      url: 'https://m.yangbasui.com/wechat/mealInfoSevenDays',
      data:{
        token:token
      },
      success:res=>{
        console.log(res.data.data)
        that.setData({
          mealInfoList: res.data.data
        })
      }
    })
    


  },
  kindToggle: function (e) {
    
  }
})

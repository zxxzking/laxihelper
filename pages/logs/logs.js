

Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo)
    this.setData({
      userInfo: userInfo
    })
  },
  onShow:function(){
    
    


  }
})

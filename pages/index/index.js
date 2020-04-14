//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    time:'',
    tipArray:[
      {
        text:"订单实际支付金额"
      },
      {
        text: "商品单价"
      },
      {
        text: "总折扣"
      },
      {
        text: "其他费用(服务费 or 准时达)"
      }, 
      {
        text: "运费"
      }
    ],
    actualPaid:0,
    merchantValue:0,
    allDiscount:0,
    otherFee:0,
    freight:0
    
    
  },
  
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync("userInfo", res.userInfo)
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
          doLogin();
        }
      })
    }

    // 获取个人信息
    function doLogin() {
      wx.login({
        success: function (res) {
          var code = res.code
          console.log(code)
        }
      })
    }
  },

  onShow:function(){
    
  },

  bindblur:function(e){
    var id = e.currentTarget.id

    if(id == 0){
      this.data.actualPaid = e.detail.value;
    }
    if (id == 1) {
      this.data.merchantValue = e.detail.value;
    }
    if (id == 2) {
      this.data.allDiscount = e.detail.value;
    }
    if (id == 3) {
      this.data.otherFee = e.detail.value;
    }
    if (id == 4) {
      this.data.freight = e.detail.value;
    }
  },
  recordLaxi:function(){
    // var token = wx.getStorageSync("token");
    // // 默认没拉
    // var laxiStatus = "0";
    // wx.showModal({
    //   title: '今儿您拉稀了吗',
    //   cancelText:"没拉",
    //   confirmText:"拉了",
    //   success: function (res) {
    //     var tipMsg = "拉的顺畅~";
    //     if (res.cancel) {
    //       tipMsg = "吃的开心~";
    //     }
    //     wx.showModal({
    //       title: tipMsg,
    //       showCancel: false,
    //       confirmText: "妥了"
    //     })
    //   }
    // })
    
    var originalValue = parseFloat(this.data.actualPaid) + parseFloat(this.data.allDiscount);
    var rate = this.data.merchantValue / originalValue;
    var currentDiscount = this.data.allDiscount * rate;
    var currentFee = this.data.otherFee * rate;
    var currentFreight = this.data.freight * rate;

    var subtract = this.data.merchantValue - currentDiscount;
    var result = subtract + currentFee + currentFreight;
    result = result.toFixed(2);
    result = result + "!"
    wx.showModal({
      title: '计算结果',
      content: result,
      showCancel: false,
    })
  }

})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    time:'',
    tips:"还未到吃饭时间",
    mealArray:[
      {
        text:"早餐",
        judge:true,
        meal:""
      },
      {
        text: "午餐",
        judge: true,
        meal: ""
      },
      {
        text: "晚餐",
        judge: true,
        meal: ""
      },
      {
        text: "其他小食",
        judge: false,
        meal: ""
      }
    ],
    breakfast:"",
    lunch:"",
    dinner:"",
    other:"",
    token:""
    
    
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
     
    }
  },

  onShow:function(){
    
    wx.request({
      
      url: 'https://m.yangbasui.com/wechat/currentTime',
      method:'get',
      success:res => {
        this.setData({
          time:res.data.data
        })
        
        var mealsArray = this.data.mealArray;
        // 服务器时间来判断是否显示保存按钮
        var time = this.data.time 
        // 早餐时间        
        if (time>=8){
          mealsArray[0].judge = false
          console.log("早餐时间")
        }
        // 午餐时间
        if(time>=11){
          mealsArray[1].judge = false
          console.log("午餐时间")
        }
        // 晚餐时间
        if (time >= 18) {
          mealsArray[2].judge = false
          console.log("晚餐时间")
        }

        this.setData({
          mealArray: mealsArray
        })

      }
    })



  },

  saveMealInfo:function(e){
    var id = e.currentTarget.id
    var meal = ''

    if(id == 0){
      meal = this.data.breakfast
    }
    if (id == 1) {
      meal = this.data.lunch
    }
    if (id == 2) {
      meal = this.data.dinner
    }
    if (id == 3) {
      meal = this.data.other
    }
    if(null == meal || meal == ""){
      wx.showModal({
        title: '您似乎还没有填写吃了什么',
        showCancel:false,
        confirmText:"再看看"
      })
      return false;
    }

    var token = wx.getStorageSync("token")

    
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'post',
      url: 'https://m.yangbasui.com/wechat/saveMealInfo',
      data: {
        token: token,
        meal: meal,
        type: id
      },
      success: function (res) {
        wx.showModal({
          title: '保存成功',
          showCancel: false,
          confirmText: "妥了"
        })
      }
    })
    
  },

  bindInput:function(e){
    var id = e.currentTarget.id
    if(id == 0){
      this.setData({
        breakfast:e.detail.value
      })
    }
    if (id == 1) {
      this.setData({
        lunch: e.detail.value
      })
    }
    if (id == 2) {
      this.setData({
        dinner: e.detail.value
      })
    }

    if (id == 3) {
      this.setData({
        other: e.detail.value
      })
    }

  },
  recordLaxi:function(){
    var token = wx.getStorageSync("token");
    // 默认没拉
    var laxiStatus = "0";
    wx.showModal({
      title: '今儿您拉稀了吗',
      cancelText:"没拉",
      confirmText:"拉了",
      success: function (res) {
        if (res.confirm) {
          laxiStatus = "1"
        } else if (res.cancel) {
          laxiStatus = "0"
        }
        wx.request({
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'post',
          url: 'https://m.yangbasui.com/wechat/recordLaxi',
          data: {
            token: token,
            laxiStatus: laxiStatus
          },
          success:res=>{
            wx.showModal({
              title: '保存成功',
              showCancel: false,
              confirmText: "妥了"
            })
          }
        })
      }
    })


  }


})

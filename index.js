// pages/location/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTip: false,
    hotCities: [
      "北京", "成都", "重庆", "广州",
      "杭州", "南京", "上海", "深圳",
      "苏州", "天津", "武汉", "西安"
    ],
    cityList: [{
        letter: 'A',
        cities: ['安阳', '鞍山']
      },
      {
        letter: 'B',
        cities: ['北京', '保定', '包头']
      },
      {
        letter: 'C',
        cities: ['重庆', '长沙', '常州']
      },
      {
        letter: 'D',
        cities: ['大连', '东莞']
      },
      {
        letter: 'E',
        cities: ['鄂尔多斯']
      },
      {
        letter: 'F',
        cities: ['福州']
      },
      {
        letter: 'G',
        cities: ['广州', '贵阳']
      },
      {
        letter: 'H',
        cities: ['杭州', '哈尔滨']
      },
      {
        letter: 'I',
        cities: []
      }, // 没有I开头城市
      {
        letter: 'J',
        cities: ['济南', '济宁']
      },
      {
        letter: 'K',
        cities: ['昆明']
      },
      {
        letter: 'L',
        cities: ['兰州', '洛阳']
      },
      {
        letter: 'M',
        cities: ['绵阳']
      },
      {
        letter: 'N',
        cities: ['南京', '南昌']
      },
      {
        letter: 'O',
        cities: []
      }, // 没有O开头城市
      {
        letter: 'P',
        cities: ['盘锦']
      },
      {
        letter: 'Q',
        cities: ['青岛']
      },
      {
        letter: 'R',
        cities: ['日照']
      },
      {
        letter: 'S',
        cities: ['上海', '深圳', '苏州']
      },
      {
        letter: 'T',
        cities: ['天津', '唐山']
      },
      {
        letter: 'U',
        cities: []
      },
      {
        letter: 'V',
        cities: []
      },
      {
        letter: 'W',
        cities: ['武汉', '乌鲁木齐']
      },
      {
        letter: 'X',
        cities: ['西安', '厦门']
      },
      {
        letter: 'Y',
        cities: ['扬州']
      },
      {
        letter: 'Z',
        cities: ['郑州', '珠海']
      }
    ],
    selectedLetter: '',
    currentIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.calculateNavArea();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  // 字母导航点击事件
  handleLetterClick(e) {
    const letter = e.currentTarget.dataset.letter
    this.showLetter(letter);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleTouchStart(e) {
    this.touching = true;
    this.getLetterByTouch(e);
  },
  handleTouchEnd() {
    this.touching = false;
  },
  handleTouchMove(e) {
    if (this.touching) {
      this.getLetterByTouch(e);
    }
  },
  calcTouchLetter(e) {
    const touchY = e.touches[0].clientY; // 获取触摸点Y轴坐标

    // 使用选择器查询导航栏元素
    const query = wx.createSelectorQuery();
    query.select('.letter-nav').boundingClientRect((rect) => {
      if (rect) {
        const navTop = rect.top; // 导航栏顶部位置
        const letterHeight = rect.height / this.data.cityList.length; // 每个字母的高度

        // 计算触摸点相对于导航栏顶部的偏移量
        let index = Math.floor((touchY - navTop) / letterHeight);

        // 检查索引是否在有效范围内
        if (index >= 0 && index < this.data.cityList.length) {
          this.showLetter(this.data.cityList[index].letter);
        }
      }
    }).exec();
  },
  showLetter(letter) {
    this.setData({
      selectedLetter: letter,
      showTip: true
    });

    setTimeout(() => {
      this.setData({
        showTip: false
      });
    }, 800);
  },
  calculateNavArea() {
    const query = wx.createSelectorQuery();
    query.select('.letter-nav').boundingClientRect(res => {
      this.navTop = res.top;
      this.navHeight = res.height;
      this.itemHeight = res.height / this.data.cityList.length;
    }).exec();
  },
  getLetterByTouch(e) {
    const touchY = e.touches[0].clientY;
    if (touchY >= this.navTop && touchY <= this.navTop + this.navHeight) {
      const index = Math.floor((touchY - this.navTop) / this.itemHeight);
      const letter = this.data.cityList[index]?.letter;

      if (letter && letter !== this.data.selectedLetter) {
       this.showLetter(letter);
      }
    }
  }
})

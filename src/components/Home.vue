<template>
  <div class="swiper-container home-drawer-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide menu-drawer">
        <img id="headerIcon" src="../assets/user_header_icon.png"></img>
        <ul>
          <li v-for="(drawerMenu, index) in drawerMenus" @click="drawerClick(drawerMenu.id)">
            <p>{{drawerMenu.name}}</p>
          </li>
        </ul>
      </div>
      <div class="swiper-slide">
        <div class="top-menu">
          <div class="search-bar">
            <img class="menu-icon" src="../assets/top_menu.png" @click="showMenu()"></img>
            <p>
              <img class="search-icon" src="../assets/search.png"></img>
              <input id="keywords" type="text" placeholder="搜索">
            </p>
          </div>
          <div class="main-oper-bar">
            <ul>
              <li v-for="(mainMenu, index) in mainMenus">
                <div class="main-list-item" :id="mainMenu.id">
                  <img :src="mainMenu.src"></img>
                  <p>{{mainMenu.name}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="second-oper-bar">
          <ul>
            <li v-for="(secMenu, index) in secMenus">
              <div class="second-list-item">
                <img :src="secMenu.src"></img>
                <p>{{secMenu.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="home-top-rank">
          <p class="home-top-title"></p>
          <div class="swiper-container home-rank-swiper">
            <div class="swiper-wrapper" id="homeRankList">
              <div class="swiper-slide top-rank-item" v-for="(book, index) in rankBooks" @click="showBookDetail(book.book_id)">
                <p style="font-size:12px;">{{book.owner_name}}</p>
                <img :src="book.cover"></img>
                <p>{{book.book_name}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-drawer-shadow" @click="drawerShadowClick()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Swiper from './../../static/swiper-3.4.1.min.js'
require('./../../static/swiper-3.4.1.min.css')

export default {
  name: 'home',
  data () {
    return {
      homeSwiper: '',
      rankSwiper: '',
      drawerMenus: [
        {name: '我的图书', id: 1},
        {name: '我的积分', id: 2},
        {name: '借阅记录', id: 3},
        {name: '公告', id: 4},
        {name: '关于', id: 5}
      ],
      mainMenus: [
        {id: 'borrowByCode', src: require('../assets/borrow_by_code.png'), name: '码上借'},
        {id: 'uploadBook', src: require('../assets/upload_book.png'), name: '上传'},
        {id: 'returnByCode', src: require('../assets/return_by_code.png'), name: '码上还'}
      ],
      secMenus: [
        {src: require('../assets/all_icon.png'), name: '所有', url: 'all'},
        {src: require('../assets/rank_icon.png'), name: '排行', ulr: 'rank'},
        {src: require('../assets/exchange_icon.png'), name: '积分', url: 'score'},
        {src: require('../assets/borrow_icon.png'), name: '圈子', url: 'circle'}
      ],
      rankBooks: [],
      doubanUrl: 'https://api.douban.com/v2/book/isbn/9787541142185'
    }
  },
  mounted () {
    this.homeSwiper = new Swiper('.home-drawer-swiper', {
      slidesPerView: 'auto',
      initialSlide: 1,
      onTouchStart: function () {
        $('.menu-drawer').css('height', $(window).height())
      },
      onSlideNextStart: function () {
        $('.menu-drawer-shadow').css('display', 'none')
      },
      onSlidePrevStart: function () {
        $('.menu-drawer-shadow').css('height', $(window).height())
        $('.menu-drawer-shadow').css('display', 'block')
      }
    })
    this.$http.get('/getTopThree').then((response) => {
      this.rankBooks = response.data
    })
  },
  updated () {
    this.rankSwiper = new Swiper('.home-rank-swiper', {
      slidesPerView: 4,
      spaceBetween: 10,
      initialSlide: 0
    })
  },
  methods: {
    showMenu () {
      $('.menu-drawer').css('height', $(window).height())
      this.homeSwiper.slideTo(0)
      $('.menu-drawer-shadow').css('height', $(window).height())
      $('.menu-drawer-shadow').css('display', 'block')
    },
    showBookDetail (id) {
      this.$http.get('/getBookDetail?bookId=' + id).then((response) => {
        this.$router.push({path: 'book-detail', query: { data: response.data }})
      })
    },
    drawerClick (id) {
      console.log(id)
    },
    drawerShadowClick () {
      this.homeSwiper.slideTo(1)
      $('.menu-drawer-shadow').css('display', 'none')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
p{
  margin: 0;
  font-size: 14px;
}
.top-menu{
  background-image: url('../assets/index_header_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 210px;
  text-align: center;
}
.search-bar{
  height: 50px;
  position: relative;

  .menu-icon{
    position: absolute;
    height: 20px;
    width: 25px;
    top: 15px;
    left: 15px;
  }

  p{
    position: relative;
    top: 10px;
    margin: 0 15px 0 55px;
    width: auto;
    background: #30477b;
    border-radius: 6px;
    height: 30px;
  }

  .search-icon{
    height: 20px;
    width: 18px;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  input[type=text]{
    outline: none;
    height: 30px;
    border: none;
    padding-left: 30px;
    background: #586780;
    line-height: 30px;
    width: 100%;
    border-radius: 6px;
    color: #fff;
    box-sizing: border-box;
  }
}
.main-oper-bar{
  margin-top: 20px;

  ul li{
    width: 33.3%;
    float: left;
  }
}
.main-list-item{
  position: relative;
  text-align: center;
  height: 100px;
  width: 100px;
  background-image: url(../assets/index_header_icon_bg.png);
  margin:0 auto;
  background-size: 100% 100%;

  img{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -25px;
  }

  p{
    color: #fff;
    padding-top: 70px;
  }
}
.second-oper-bar{
  height: 120px;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 25px;
  border-bottom: 2px solid #d3d3d3;

  ul li{
    width: 25%;
    float: left;
  }
}
.second-list-item img{
  width: 40px;
  height: 40px;
}
.second-list-item p{
  color: #565656;
}
.home-top-rank{
  margin-top: 10px;
  text-align: center;
  position: relative;
  color: #1c4182;

  a{
    position: absolute;
    right: 2px;
    font-size: 14px;
  }
}
.home-rank-swiper{
  margin-top: 10px;
}
.top-rank-item img{
  height: 100px;
  width: 80px;
}
.top-rank-item p{
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.home-top-title{
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0;
}

.menu-drawer{
  z-index: 9999;
  color: #fff;
  text-align: center;
  width: 50%;
  background: #444;

  img{
    height: 70px;
    width: 70px;
    margin-top: 100px;
    border-radius: 70px;
  }

  ul{
    margin-top: 30px;
  }

  ul li{
    border-bottom: 1px solid #fff;
    margin-left: 30px;
    margin-right: 30px;
  }

  p{
    height: 50px;
    margin: 0;
    font-size: 16px;
    line-height: 50px;
  }
}
.menu-drawer-shadow{
  width: 100%;
  background: #000;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 9000;
}
</style>

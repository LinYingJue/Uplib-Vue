<template>
  <div class="book-list-div">
    <div class="title-bar">
      <img src="../assets/arrow-left.png" @click="goBack()"></img>
      <p>所有图书</p>
    </div>
    <div class="content-tab">
      <ul>
        <li><a @click="tabClick(0)" class="active-a" id="allBookA">图书</a></li>
        <li><a @click="tabClick(1)" id="allUser">用户</a></li>
      </ul>
    </div>
    <div class="swiper-container all-book-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide all-book-list swiper-no-swiping" id="allBookList">
          <ul style="position:relative;z-index:2;" v-if="bookList.length > 0">
            <li v-for="(book, index) in bookList">
              <div class="book-list-item">
                <img class="book-pic" :src="book.cover" @click="showBookDetail(book.book_id)"></img>
                <img class="book-pic-status" v-if="book.status === '00'" src="../assets/borrow_icon.png"></img>
                <img class="book-pic-status" v-else-if="book.status === '01'" src="../assets/lent_icon.png"></img>
                <img class="book-pic-status" v-else src="../assets/down_icon.png"></img>
                <div class="list-item-info">
                  <p class="book-title-p">{{book.book_name}}</p>
                  <p>{{book.owner_name}} - {{book.owner_team}}</p>
                  <p class="book-count-p"><img src="../assets/like_icon.png" style="width:16px;"></img>{{book.like_nums}}&nbsp;<img src="../assets/borrow_icon.png" style="width:18px;margin-left:5px;"></img>{{book.borrow_nums}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="swiper-slide rank-list swiper-no-swiping" id="allUserList">
          <ul style="position:relative;z-index:2;" v-if="userList.length > 0">
            <li v-for="(user, index) in userList">
              <div class="user-list-item">
                <img class="user-header" src='../assets/user_header_icon.png'></img>
                <p class="user-name">{{user.empname}}</p>
                <p class="user-team">{{user.team}}</p>
                <span class="user-score prize-metal">{{user.score}}本</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Swiper from './../../static/swiper-3.4.1.min.js'
require('./../../static/swiper-3.4.1.min.css')

export default {
  data () {
    return {
      mySwiper: '',
      bookList: '',
      userList: ''
    }
  },
  mounted () {
    this.$http.get('/getAllBookAndUserList').then((response) => {
      this.bookList = response.data.bookList
      this.userList = response.data.userList
    })

    $('.all-book-swiper').css('height', $(window).height() - 90)
    this.mySwiper = new Swiper('.all-book-swiper', {
      slidesPerView: 'auto',
      noSwiping: true,
      onSlideNextStart: (swiper) => {
        if (swiper.activeIndex === 0) {
          $('#allBookA').attr('class', 'active-a')
          $('#allUser').removeAttr('class')
        } else {
          $('#allUser').attr('class', 'active-a')
          $('#allBookA').removeAttr('class')
        }
      },
      onSlidePrevStart: (swiper) => {
        if (swiper.activeIndex === 0) {
          $('#allBookA').attr('class', 'active-a')
          $('#allUser').removeAttr('class')
        } else {
          $('#allUser').attr('class', 'active-a')
          $('#allBookA').removeAttr('class')
        }
      }
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    tabClick (val) {
      this.mySwiper.slideTo(val)
    },
    showBookDetail (id) {
      this.$http.get('/getBookDetail?bookId=' + id).then((response) => {
        this.$router.push({path: 'book-detail', query: { data: response.data }})
      })
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
.book-list-div{
  overflow: hidden;
}
.title-bar{
  height: 50px;
  background-image: url("../assets/index_header_bg.png");
  background-size: 100%;
  color: #fff;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 9000;
  img{
    position: absolute;
    top: 14px;
    left: 10px;
  }
  p{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin: 0;
  }
}
.content-tab{
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 40px;
  background: #fff;
  z-index: 9000;
  .active-a{
    border-bottom: 2px solid #2a4883;
    color: #2a4883;
  }
  ul{
    height: 40px;
    line-height: 40px;
    li{
      width: 50%;
      float: left;
      text-align: center;
      a{
        display: block;
        height: 40px;
        margin-bottom: 0;
        border-bottom: 1px solid #dbdbdb;
        color: #888;
      }
    }
  }
}
.all-book-swiper{
  margin-top: 90px;
  ul li{
    height: 120px;
    background: #fff;
  }
}
.user-list-item{
  height: 70px;
  position: relative;
  p{
    margin-bottom: 0;
    margin-left: 70px;
  }
  .user-header{
    position: absolute;
    left: 10px;
    height: 50px;
    width: 50px;
    top: 10px;
    border-radius: 40px;
  }
  .user-name{
    height: 40px;
    line-height: 30px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .user-team{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #888;
  }
  .user-score{
    position: absolute;
    height: 45px;
    line-height: 38px;
    top: 15px;
    right: 5px;
    text-align: center;
    width: 36px;
  }
  .prize-metal{
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.book-list{
  margin-top: 50px;
  ul li{
    height: 120px;
    background: #fff;
  }
}
.book-list-item{
  position: relative;
  .book-pic{
    width: 80px;
    height: 100px;
    margin-top: 10px;
    position: absolute;
    left: 10px;
  }
  .book-pic-status{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 55px;
    bottom: 15px;
    z-index: 8888;
  }
  .list-item-info{
    margin-left: 100px;
    height: 120px;
    padding-top: 10px;
  }
  .book-like{
    position: absolute;
    height: 16px;
    width: 16px;
    top: 80px;
    right: 15px;
  }
  .book-count-p{
    position: absolute;
    color: #888;
    bottom: 10px;
    height: 20px;
    line-height: 20px;
    span{
      height: 20px;
      line-height: 20px;
    }
  }
  button{
    color: #fff;
    height: 30px;
    border-radius: 4px;
    background-image: url("../assets/index_header_bg.png");
    background-size: 100%;
    position: absolute;
    top: 15px;
    right: 10px;
  }
  .arrow-right{
    position: absolute;
    top: 50%;
    margin-top: -12px;
    right: 5px;
  }
}
.list-item-info{
  p{
    margin-bottom: 0;
    margin-top: 0;
    font-size: 14px;
  }
  .book-title-p{
    font-size: 16px;
    font-weight: bold;
    word-break: break-word;
    color: #1c4182;
  }
  div{
    position: relative;
    height: 30px;
  }
  i{
    width: 25px;
    height: 30px;
    background-position: center;
    background-size: 15px 20px;
    background-repeat: no-repeat;
    position: absolute;
    background-image: url("../assets/hot_icon.png");
  }
}
.rank-list{
  overflow: auto;
  ul li{
    height: 70px;
    background: #fff;
    border-bottom: 1px solid #dbdbdb;
  }
}
</style>

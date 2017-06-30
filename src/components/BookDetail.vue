<template>
  <div class="book-detail-div">
    <div class="title-bar">
      <img src="../assets/arrow-left.png" @click="goBack()"></img>
      <p>图书详情</p>
    </div>
    <div class="book-detail-img">
      <img class="book-pic" :src="bookDetail.cover"></img>
      <img class="book-status-pic" v-if="bookDetail.status === '00'" src="../assets/borrowable_icon.png"></img>
      <img class="book-status-pic" v-else-if="bookDetail.status === '01'" src="../assets/lent_icon.png"></img>
      <img class="book-status-pic" v-else src="../assets/down_icon.png"></img>
    </div>
    <div class="book-detail-info">
      <p class="book-title">{{bookDetail.book_name}}</p>
      <p class="book-owner">{{bookDetail.owner_name}} - {{bookDetail.owner_team}}
        <span>
          <img class="book-like-icon" src="../assets/like_icon.png"></img>
          <font id="likeNum" v-if="bookDetail.like_numes > 0">{{bookDetail.like_numes}}</font>
          <font id="likeNum" v-else>0</font>
          <img class="book-borrow-icon" src="../assets/borrow_icon.png"></img>
          <font v-if="bookDetail.borrow_nums > 0">{{bookDetail.borrow_nums}}</font>
          <font v-else>0</font>
        </span>
      </p>
      <p class="book-desc" v-if="bookDetail.summary !== ''">{{bookDetail.summary}}</p>
      <p class="book-desc" v-else>该书暂无简介...</p>
    </div>
    <div class="book-other-info">
      <p v-if="bookDetail.status === '00' && bookDetail.borrow_type === '01'">交换条件<span>{{bookDetail.exchange_condition}}</span></p>
      <p v-else-if="bookDetail.status === '00'">可借时间<span>{{bookDetail.last_day}}</span></p>
      <p v-if="bookDetail.status === '01'">借阅者<span>{{bookBorrow.name}}</span></p>
      <p v-if="bookDetail.status === '01'">到期时间<span>{{realEndTime}}</span></p>
    </div>
    <div class="book-comment-info" v-if="reviewList.length > 0">
      <p class="title">精选评论</p>
      <ul>
        <li v-for="reviewItem in reviewList">
          <div>
            <img v-if="reviewItem.reviewer_icon !== ''" class="review-header" :src="reviewItem.reviewer_icon"></img>
            <img v-else class="review-header" src="../assets/user_header_icon.png"></img>
            <p class="review-user">{{reviewItem.reviewer}}</p>
            <p class="review-content">{{reviewItem.review_content}}</p>
            <p class="review-time">{{translateDate(reviewItem.review_time)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      bookDetail: this.$route.query.data.bookDetail,
      reviewList: this.$route.query.data.bookComment,
      bookBorrow: this.$route.query.data.bookBorrow
    }
  },
  computed: {
    realEndTime: function () {
      var newDate = new Date(this.bookBorrow.end_time)
      return newDate.toLocaleDateString()
    }
  },
  mounted () {
    $('.book-pic').css('height', $(window).height() * 0.4)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    translateDate (val) {
      var newDate = new Date(val)
      return newDate.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.title-bar{
  height: 50px;
  background-image: url("../assets/index_header_bg.png");
  background-size: 100%;
  color: #fff;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 9000;
}
.title-bar img{
  position: absolute;
  top: 14px;
  left: 10px;
}
.title-bar p{
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  margin: 0;
}
.book-detail-img{
  position: relative;
  background: #fff;
  margin-top: 50px;
}
.book-detail-img .book-pic{
  display: block;
  margin: 0 auto;
  padding-top: 2px;
  max-width: 100%;
}
.book-detail-img .book-tag{
  position: absolute;
  top: 10px;
  right: 20px;
  height: 70px;
}
.book-detail-img .book-status-pic{
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  z-index: 8000;
}
.book-detail-info{
  padding-left: 10px;
  padding-right: 10px;
  background: #fff;
}
.book-detail-info .book-title{
  word-wrap: break-word;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  padding-top: 20px;
}
.book-detail-info .book-owner{
  font-size: 12px;
  color: #8d8d8d;
  padding-left: 10px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}
.book-detail-info .book-owner span{
  color: #888;
  padding-right: 10px;
  float: right;
  height: 32px;
  line-height: 32px;
}
.book-detail-info .book-desc{
  min-height: 50px;
  font-size: 14px;
  margin: 20px 0 0 0;
  padding-left: 10px;
  padding-right: 10px;
  text-align: justify;
}
.book-detail-info ul{
  margin-top: 20px;
}
.book-detail-info ul li{
  padding-left: 10px;
}
.book-detail-info ul li p{
  margin: 0;
  height: 30px;
  line-height: 30px;
}
.book-detail-info .book-like-icon{
  width: 16px;
}
.book-detail-info .book-borrow-icon{
  width: 18px;
  margin-left: 5px;
}
.book-other-info{
  margin: 10px;
  border-top: 1px solid #dbdbdb;
  font-size: 14px;
}
.book-other-info p{
  margin: 10px;
  color: #8d8d8d;
}
.book-other-info p span{
  float: right;
  color: #000;
}
.book-comment-info{
  margin-top: 20px;
  font-size:14px;
  background: #eee;
  color: #8d8d8d;
  padding: 10px;
}
.book-comment-info .title{
  margin: 10px;
  position: relative;
  text-align: center;
}
.book-comment-info .title::before{
  content: '';
  border-top: 1px solid #dbdbdb;
  display: inline-block;
  width: 100px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.book-comment-info .title::after{
  content: '';
  border-top: 1px solid #dbdbdb;
  display: inline-block;
  width: 100px;
  margin-left: 5px;
  margin-bottom: 5px;
}
.book-comment-info li{
  margin-bottom: 10px;
}
.book-comment-info div{
  position: relative;
}
.book-comment-info img{
  position: absolute;
  top: 10px;
  left: 10px;
  height: 40px;
  width: 40px;
}
.book-comment-info .review-user{
  margin: 0;
  padding-top: 10px;
  margin-left: 60px;
  font-size: 16px;
  color: #333;
}
.book-comment-info .review-content{
  margin: 0;
  margin-left: 60px;
  color: #666;
  word-wrap: break-word;
}
.book-comment-info .review-time{
  margin: 0;
  font-size: 12px;
  text-align: right;
}
</style>

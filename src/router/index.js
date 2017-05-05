import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import BookDetail from 'components/BookDetail'
import AllBookList from 'components/AllBookList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/book-detail',
      name: 'Book',
      component: BookDetail
    },
    {
      path: '/all',
      name: 'AllBook',
      component: AllBookList
    }
  ]
})

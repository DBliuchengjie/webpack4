import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

//引入某个store对象
import two from './two'

/**
 * mutations 是不分模块的,任何.vue页面的方法都可以出发任何模块的mutations方法 ，所以定义 mutations方法时 要避免重名
 *
 * mutations方法里面 必须是同步的一些操作
 *
 * commit 触发 mutations
 *
 * dispatch 触发 actions
 *
 * 异步操作放在 actions
 * **/
export default new vuex.Store({
    modules: {
        two
    }
})
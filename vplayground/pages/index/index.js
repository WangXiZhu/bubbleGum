import './index.less';

import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

// 子页面
// import Main from './routes/Main.vue';
import Playground from './routes/playground.vue';

// 初始化
Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({

        // 添加路由
        routes: [{
            path: '/',
            component: Playground
        }]
        // 添加路由结束

    });

new Vue({
    router
}).$mount('#app');

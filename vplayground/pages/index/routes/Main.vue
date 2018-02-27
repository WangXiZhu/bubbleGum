<template>
    <div>
        <h-nav></h-nav>
        <p>{{message}}</p>
        <h-button>这是微店 UI 组件库 hotpot 的一个按钮</h-button>
    </div>
</template>

<script>

// 微店 UI 组件库
import Button from 'hotpot/Button/Button.vue';

// 导航模块
import Nav from '../modules/Nav.vue';

export default {
    components: {
        'h-button': Button,
        'h-nav': Nav
    },
    data() {
        return {
            message: 'Hello World'
        };
    }
};

</script>

<style lang="less">
div {
    font-size: 20px;
    text-align: center;
}
</style>

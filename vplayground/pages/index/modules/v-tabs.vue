<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Flex" name="first">
            <Flex></Flex>
        </el-tab-pane>
        <el-tab-pane label="Alignment" name="second">
            <Alignment></Alignment>
        </el-tab-pane>
        <el-tab-pane label="Layout" name="third">
            <Layout></Layout>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Alignment from '../modules/alignment.vue';
    import Layout from '../modules/layout.vue';
    import Flex from '../modules/flex.vue';

    export default {
        data(){
            return {
                activeName: 'first'
            }
        },
        methods: {
            handleClick(){

            }
        },
        components: {
            Alignment,
            Layout,
            Flex
        }
    }
</script>

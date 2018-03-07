<template>
    <div>
        <div class="justify-content">
            <h2>JUSTIFY CONTENT
                <i class="el-icon-info "></i>
            </h2>
            <el-select v-model="justifyContent" placeholder="row">
                <el-option v-for="(item, index) in justifyContents" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>

        <div class="align-items">
            <h2>ALIGN ITEMS
                <i class="el-icon-info "></i>
            </h2>
            <el-select v-model="alignItem" placeholder="row">
                <el-option v-for="(item, index) in alignItems" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>

        <div class="align-self">
            <h2>ALIGN SELF
                <i class="el-icon-info "></i>
            </h2>
            <el-select v-model="alignSelf" placeholder="row">
                <el-option v-for="(item, index) in alignSelfs" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>


        <div class="align-items">
            <h2>ALIGN CONTENT
                <i class="el-icon-info "></i>
            </h2>
            <el-select v-model="alignContent" placeholder="row">
                <el-option v-for="(item, index) in alignContents" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
export default {
    props: ['justifyContent', 'alignItem', 'alignSelf', 'alignContent'],
    data(){
        return {
            justifyContents: ['flex start', 'center', 'flex end', 'row reserve', 'space between', 'space around', 'row evenly'],
            alignItems: ['auto','flex start','center','flex end','stretch','baseline','space between','space around'],
            alignContents: ['auto','flex start','center','flex end','stretch','baseline','space between','space around'],
            alignSelfs: ['auto','flex start','center','flex end','stretch','baseline','space between','space around'],
        }
    }
}
</script>

<style>
    @import './common.less';
</style>

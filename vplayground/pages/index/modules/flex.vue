<template>
    <div class="flex">
        <div class="direction">
            <h2>DIRECTION 
                <el-popover class="item" effect="dark" title="Defines the direction of which text and items are laid out" placement="top">
                    <slot name="content">
                        
                    </slot>

                    <i class="el-icon-info "></i>
                </el-popover>
            </h2>  
            <el-radio-group v-model="direction" size="medium">
                <el-radio-button label="inherit">inhrit</el-radio-button>
                <el-radio-button label="ltr">ltr</el-radio-button>
                <el-radio-button label="rtl">rtl</el-radio-button>
            </el-radio-group>
        </div>

        <div class="flex-direction">
            <h2>FLEX DIRECTION <i class="el-icon-info "></i></h2>  
            <el-select v-model="flexDirectionValue" placeholder="row">
                <el-option
                    v-for="(item, index) in flexDirectionOptions"
                    :key="index"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
        </div>

        <div class="flex-basic-grow ">
            <el-row class="" :gutter="10">
                <el-col  :span="8">
                    <h2>BASIS <i class="el-icon-info "></i></h2>
                    <el-input v-model="flexBasic" placeholder="undefined"></el-input>
                </el-col>
                <el-col  :span="8">
                    <h2>GROW <i class="el-icon-info "></i></h2>
                    <el-input v-model="flexGrow" placeholder="undefined"></el-input>
                </el-col>
                <el-col  :span="8">
                    <h2>SHRINK <i class="el-icon-info "></i></h2>
                    <el-input v-model="flexShrink" placeholder="undefined"></el-input>
                </el-col>
            </el-row>
        </div>


        <div class="flex-wrap">
            <h2>FLEX WRAP <i class="el-icon-info "></i></h2>
            <el-radio-group v-model="flexWrap" size="medium">
                <el-radio-button label="nowrap">no wrap</el-radio-button>
                <el-radio-button label="wrap">wrap</el-radio-button>
                <el-radio-button label="wrapreverse">wrap reverse</el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
export default {
    props: ['justifyContent', 'alignItem', 'alignSelf', 'alignContent'],
    data(){
        return {
            direction: 'inherit',
            flexDirectionOptions: ['column', 'column reserve', 'row', 'row reserve'],
            flexDirectionValue: 'row',
            flexBasic: 'auto',
            flexShrink: 1,
            flexGrow: 0,
            flexWrap: 'nowrap',
        }
    }
}
</script>

<style>
    @import './common.less';
</style>

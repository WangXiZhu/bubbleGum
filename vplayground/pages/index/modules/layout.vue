<template>
    <div>
        <div class="width-height">
            <h2>WIDTH × HEIGHT
                <i class="el-icon-info "></i>
            </h2>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input v-model="width" placeholder="undefined"></el-input>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="height" placeholder="undefined"></el-input>
                </el-col>
            </el-row>
        </div>

        <div class="aspect-ratio">
            <h2>ASPECT RATIO
                <i class="el-icon-info "></i>
            </h2>
            <el-row>
                <el-col :span="24">
                    <el-input v-model="ratio" placeholder="undefined"></el-input>
                </el-col>
            </el-row>
        </div>

        <div class="positionEditor">
            <el-input class="input" v-model="paddingTop" ></el-input>
            <div class="positionEditorRow">
                <el-input class="input" v-model="paddingLeft"></el-input>
                <h2>PADDING</h2>
                <el-input class="input" v-model="paddingRight" ></el-input>
            </div>
            <el-input class="input" v-model="paddingBottom"></el-input>
        </div>
        

        <div class="positionEditor">
            <el-input class="input" v-model="borderTop" ></el-input>
            <div class="positionEditorRow">
                <el-input class="input" v-model="borderLeft"></el-input>
                <h2>BORDER</h2>
                <el-input class="input" v-model="borderRight" ></el-input>
            </div>
            <el-input class="input" v-model="borderBottom"></el-input>
        </div>

        <div class="positionEditor">
            <el-input class="input" v-model="marginTop" ></el-input>
            <div class="positionEditorRow">
                <el-input class="input" v-model="marginLeft"></el-input>
                <h2>MARGIN</h2>
                <el-input class="input" v-model="marginRight" ></el-input>
            </div>
            <el-input class="input" v-model="marginBottom"></el-input>
        </div>

        <div class="position-type">
            <h2>POSITION TYPE
                <i class="el-icon-info "></i>
            </h2>
            <el-row>
                <el-col :span="24">
                    <el-radio-group v-model="positionType" size="medium">
                        <el-radio-button label="relative">relative</el-radio-button>
                        <el-radio-button label="absolute">absolute</el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>

        <div class="positionEditor">
            <el-input class="input" v-model="positionTop" ></el-input>
            <div class="positionEditorRow">
                <el-input class="input" v-model="positionLeft"></el-input>
                <h2>POSITION</h2>
                <el-input class="input" v-model="positionRight" ></el-input>
            </div>
            <el-input class="input" v-model="positionBottom"></el-input>
        </div>

    </div>
</template>

<script>
export default {
    props: ['width', 'height', 'padding', 'margin', 'border', 'positionType'],
    data(){
        return {
            justifyContents: ['flex start', 'center', 'flex end', 'row reserve', 'space between', 'space around', 'row evenly'],
            alignItems: ['auto','flex start','center','flex end','stretch','baseline','space between','space around'],
            alignContents: ['auto','flex start','center','flex end','stretch','baseline','space between','space around'],
            alignSelfs: ['auto','flex start','center','flex end','stretch','baseline','space between','space around'],
        }
    },
    computed: {
        paddingTop(){
            return this.padding && this.padding.top;
        },
        paddingRight(){
            return this.padding && this.padding.right;
        },
        paddingBottom(){
            return this.padding && this.padding.bottom;
        },
        paddingLeft(){
            return this.padding && this.padding.left;
        }
    }
}
</script>

<style lang="less">
    @import './common.less';

    .positionEditor{
        text-align: center;
        width: 60%;
        margin: 20px auto;
        border: 1p solid red;

        .positionEditorRow{
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-direction: row;
            flex-direction: row;
            font-size: 12px;
            font-weight: 700;
            color: #444950;
            h2{
                display: inline-block;
                margin: 0;
            }
        }

        .input{
            display: inline-block;
            width: 30%;
        }
    }
</style>

<template>
    <div class="actions">
        <el-row>
            <el-col :span="12">
                <el-dropdown type="primary" class="dropdown">
                    <el-button type="primary" class="btn">
                        Get Code
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>Vue</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

            <el-col :span="12">
                <el-button class="share-btn btn">
                    share URL
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less">
    .actions{
        .dropdown{
            width: 100%;
            padding: 0 7px;
            box-sizing: border-box;
        }

        .btn{
            width: 100%;
        }
        .share-btn{
            box-sizing: border-box;
        }
    }
</style>

<template>
    <div class="pageContent">
        <div class="playgrond" v-html="nodeContent">
            <!-- <div class="node" style="width: 500px;height: 500px;" > -->
                <!-- <div class="label">root</div>

                <template class="content" v-html="nodeContent">

                </template> -->
            <!-- </div> -->
        </div>

        <div class="sliderBar">
            <div class="actions">

            </div>
            <div class="editor">

            </div>
        </div>
    </div>
</template>

<script>
    import {Button} from 'element-ui';
    export default {
        data(){
            return {
                // nodeContent: '<div>123</div>',
                positionGuideBgColor: {
                    margin: 'rgba(214, 43, 28, 0.1)',
                    padding: 'rgba(123, 179, 41, 0.1)',
                    border: 'rgba(251, 170, 51, 0.15)'
                },
                tree: {
                    label: 'root',
                    id: "1",
                    isRoot: true,
                    child: [
                        {   
                            id: "11",
                            label: 1,
                            style: {
                                width : 100,
                                height: 100,
                            },
                            child: [],
                            positionGuide: {
                                marginTop: 20,
                                paddintTop: 20,
                                borderTop: 20
                            }
                        },
                        {
                            id: "12",
                            label: 2,                                
                            style: {
                                width : 100,
                                height: 100
                            }
                        }
                    ],
                    style: {
                        width : 500,
                        height: 500
                    },
                    positionGuide: {
                        paddintTop: 20,
                        borderTop: 20
                    }
                },
                _html: ''
            }
        },
        computed: {
            
            // 遍历树结构
            nodeContent(){
                let html = '', 
                    style = '',
                    positionGuide = '';
                
                var node = this.tree;
                var index = 1;
                
                // this.bfsTree(this.tree, function(node){
                    
                // });

                while(node.child.length){
                    style = this.getStyle(node.style);
                    html += `
                    <div class="node" style='${style}'>
                        <div class="label">${node.label || index}</div>`
                    `</div>`;
                }

                this.tree.child.forEach((node, index) => {

                    style = this.getStyle(node.style);

                    Object.keys(node.positionGuide).forEach(guide=> {
                        // 上下则参考宽，左右参考高
                        
                        let style = {
                            backgroundColor: this.getPositionGuideBgColor(guide),
                            top: this.getPositionGuideTop(node, guide),
                            left: this.getPositionGuideLeft(node, guide),

                        }

                        if (guide.toLowerCase().indexOf('top') > -1 || guide.toLowerCase().indexOf('bottom') > -1) {
                            
                            // positionGuide += ``;

                        } else {

                        }
                    })

                    html += `<div class="node" style='${style}'>
                        <div class="label">${index+1}</div>
                    </div>`;
                });
                return html;
            },
            
        },
        methods:{
            render(node){
                var style = this.getStyle(node.style);
                this._html += `<div class="node" style='${style}'>`;

                node.child.forEach(child=>{
                    this.render(child);
                });

                this._html += '</div>';
            },
            getPositionGuideTop(node, guide){
                if (guide.indexOf('marginTop') > -1) {
                    // return node.style.top - guide.;
                }
                if (guide.indexOf('paddingTop') > -1) {

                }

                if (guide.indexOf('marginBottom') > -1){
                    return (node.style.top||0) + (node.style.height || 0) + (node.positionGuide.marginTop || 0);
                }

            },
            /**
             * 获取不同属性的背景颜色
             */
            getPositionGuideBgColor(guide){
                let {margin, padding, border} = this.positionGuideBgColor;
                if (guide.indexOf('margin') > -1) {
                    return margin;
                } else if(guide.indexOf('padding') > -1){
                    return padding;
                } 
                return border;
            },
            getStyle(style){
                var html = '';
                style = this.getPosition(style);
                for(let node in style){
                    html += `${node}:${style[node]}px;`;
                }
                return html;
            },
            // 通过盒子模型获得节点的定位
            
            getPosition(node){
                var style = {};
                var sibling = [];
                
                this.bfsTree(node, function(child){
                    var width = 0;
                    if (!sibling.length || child.id.substring(0,1) == sibling[0].id.substring(0,1)){    // 判断是否为同一个父亲
                        sibling.push(child);
                    } else {
                        sibling = [];
                    }
                    
                    sibling.forEach(item=>{
                        width = (item.marginLeft || 0) + item.width + (item.marginRight || 0)
                    });
                    child.style.left = width || 0;
                    child.style.top = item.marginTop || 0;
                });
            },
            bindEvent(){
                var nodes = document.querySelectorAll('.node');
                nodes.forEach(ele=>{
                    ele.addEventListener('mousemove', function(e){
                        // ele.classList.add();
                        document.querySelectorAll('.node').forEach(ele=>
                            ele.classList.remove('hover')
                        );

                        e.target.classList.add('hover');
                    });
                    ele.addEventListener('mouseleave', function(e){
                        e.target.classList.remove('hover');
                    });
                });

                document.querySelector('.node').addEventListener('click', function(e){
                    document.querySelectorAll('.node').forEach(ele=>
                            ele.classList.remove('focus')
                    );

                    e.target.classList.add('focus');
                });
            },
            /**
             * // 广度遍历队列
            input: 
            var tree = {
                    label: 1,
                    child: [
                        {
                            label: 2,
                            child: [
                                {
                                    label: '2-1',
                                    child: []
                                }
                            ]
                        },{
                            label: 3,
                            child: [
                                {
                                    label: '3-1',
                                    child: []
                                }
                            ]
                        }
                    ]
                }

            output: 
                1
                2
                3
                2-1
                3-1
             */
            // breadth
            bfsTree(root, cb){
                var queue = [];     
                queue.push(root);

                while(queue.length) {
                    var node = queue.shift();
                    cb && cb(node);
                    queue = queue.concat(node.child);
                }
            },
        },
        mounted(){
            this.bindEvent();
        },
        components: {
            'el-button': Button,
        }
    }
</script>

<style lang="less">
    .pageContent{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        background: linear-gradient(-90deg,rgba(0,0,0,.02) 1px,transparent 0),linear-gradient(rgba(0,0,0,.02) 1px,transparent 0),linear-gradient(-90deg,rgba(0,0,0,.03) 1px,transparent 0),linear-gradient(rgba(0,0,0,.03) 1px,transparent 0),linear-gradient(transparent 4px,#f5f5f5 0,#f5f5f5 97px,transparent 0),linear-gradient(-90deg,#e5e5e5 1px,transparent 0),linear-gradient(-90deg,transparent 4px,#f5f5f5 0,#f5f5f5 97px,transparent 0),linear-gradient(#e5e5e5 1px,transparent 0),#f5f5f5;
        background-size: 10px 10px,10px 10px,100px 100px,100px 100px,100px 100px,100px 100px,100px 100px,100px 100px;
    }

    .playgrond{
        display: flex;
        -ms-flex-positive: 1;
        flex-grow: 1;
        width: 100%;
        height: 100%;

        >.node{
            transform: translateX(-175px);
            margin: auto;
            position: static;
            -ms-flex-item-align: center;
            -ms-grid-row-align: center;
            align-self: center;
        }
    }

    .node{
        position: absolute;
        -ms-transform: scale(1);
        transform: scale(1);
        box-shadow: inset 0 0 0 1px rgba(48,56,69,.2);
        transition: all .2s,outline 0s,box-shadow 0s;
        cursor: pointer;
        background: #fff;

        

        .label{
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            pointer-events: none;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 300;
            letter-spacing: 1px;
        }

        &.focus{
            box-shadow: 0 0 0 2px #68cfbb, 0 0 15px rgba(0,0,0,.2), inset 0 0 0 1px hsla(0,0%,100%,.2);
            z-index: 2;
        }

        &.hover{
            background-color: #f0fff9;
        }
    }

   

    ::selection {
        background: #6bcebb;
        color: #fff;
    }

    .positionGuide{
        position: absolute;
        pointer-events: none;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        font-size: 10px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .sliderBar{
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
        width: 350px;
        background: #fff;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        margin: 25px;
        max-height: calc(100% - 50px);
        border-radius: 6px;
        bottom: auto;
        box-shadow: 3px 3px 15px rgba(0,0,0,.15);

        .actions{
            padding: 15px;
        }

        .editor{
            display: flex;

            -ms-flex-direction: column;
            flex-direction: column;
            height: 100%;
            border-top: 1px solid #e8e8e8;
        }
    }
</style>
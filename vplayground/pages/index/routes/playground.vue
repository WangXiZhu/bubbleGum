<template>
    <div class="pageContent">
        <div class="playgrond" v-html="nodeContent">

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
    import {postOrder} from '../../lib/tree';

    export default {
        data(){
            return {
                positionGuideBgColor: {
                    margin: 'rgba(214, 43, 28, 0.1)',
                    padding: 'rgba(123, 179, 41, 0.1)',
                    border: 'rgba(251, 170, 51, 0.15)'
                },
                nodeContent: '',
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
                                paddingTop: 20,
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
                        paddingTop: 20,
                        borderTop: 20
                    }
                }
            }
        },
        computed: {
            tree2PlainObj(){
                var obj = {};
                this.bfsTree(this.tree, function(node){
                    obj[node.id+''] = node
                });
                return obj;
            },
            positionTree(){
                var siblings = [];       // 兄弟元素
                var parent = {
                    positionGuide: {},
                    style: {}
                };        // 父级元素
                var self = this;
                var tree = this.tree;
                this.bfsTree(tree, function(child){
                    let siblingId = ''; 
                    var width = 0;
                    
                    child.positionGuide = child.positionGuide || {};
                    child.style =  child.style || {};
                    
                    let isSibling = (siblings.length && self.isSibling(child, siblings[0]));
                    if (!isSibling) {
                        siblings = [];
                    }
                    Array.isArray(siblings) && siblings.forEach(item => {
                        width = (item.positionGuide.marginLeft || 0) + (item.style.width || 0) + (item.positionGuide.marginRight || 0);
                    });
                    
                    if (!child.isRoot){
                        parent = self.getParent(child.id); 
                    }

                    // 与parent的left,top相关
                    child.style.left = (width || 0) 
                                    + (child.positionGuide.marginLeft || 0) 
                                    + self.getProperty(parent, 'positionGuide', 'borderLeft') 
                                    + self.getProperty(parent, 'positionGuide', 'paddingLeft');

                    child.style.top = (child.positionGuide.marginTop || 0) 
                                    + self.getProperty(parent, 'style', 'top')
                                    + self.getProperty(parent, 'positionGuide', 'borderTop')
                                    + self.getProperty(parent, 'positionGuide', 'paddingTop');

                    if (!siblings.length || isSibling) {    // 判断是否为同一个父亲
                        siblings.push(child);
                    } 
                });

                return tree;
            },
        },
        methods:{
            render(node){
                var style = this.getStyle(node.style);
                this.nodeContent += `<div class="node" style='${style}'>
                    <div class="label">${node.label || node.id.substr(-1)}</div>
                `;

                // positionGuide
                Object.keys(node.positionGuide).forEach(guide=>{
                    let guideStyle = this.getStyle(this.getGuideStyle(node, guide));
                    this.nodeContent += `<div class="positionGuide" style="${guideStyle}" data-text="${guide}">${node.positionGuide[guide]}</div>`
                })
                node.child && Array.isArray(node.child) && node.child.forEach(child=>{
                    this.render(child);
                });

                this.nodeContent += '</div>';
            },
            getGuideStyle(node , name){
                var guideStyle = {
                    'background-color': this.getPositionGuideBgColor(name) 
                };
                var value = node.positionGuide[name];
                var hasTop = name.toLowerCase().indexOf('top') > 0;
                var hasBottom = name.toLowerCase().indexOf('bottom') > 0
                
                if (hasTop || hasBottom) {
                    guideStyle.width = node.style.width;
                    guideStyle.height = value;
                } else {
                    guideStyle.width = value;
                    guideStyle.height = node.style.height;
                }
                
                node.style = node.style || {};
                let {top, left, width, heigth} = node.style;
                top = top || 0;
                left = left || 0;
                width = width || 0;
                heigth = heigth || 0;

                switch(name){
                    case 'marginTop':
                        guideStyle.top = - value;
                        guideStyle.left = - this.getProperty(node, 'positionGuide', 'marginLeft') ;
                        break;
                    case 'marginBottom': 
                        guideStyle.top = height;
                        guideStyle.left = - this.getProperty(node, 'positionGuide', 'marginLeft');
                        break;
                    case 'marginLeft': 
                        guideStyle.top = 0;
                        guideStyle.left = - value;
                        break;
                    case 'marginRight':
                        guideStyle.top = 0;
                        guideStyle.left = width;
                        break;

                    case 'borderTop':
                        guideStyle.top = 0;
                        guideStyle.left = left;
                        break;

                    case 'paddingTop':
                        guideStyle.top = this.getProperty(node, 'positionGuide', 'borderTop');
                        guideStyle.left = 0;
                        break;
                }   

                return guideStyle;
            },
            getCamelStyle(str){
                 return str.replace(/[A-Z]/g, '-$1').toLowerCase();
            },
            getProperty(){
                var value = 0;
                try{
                    var arr = Array.prototype.slice.call(arguments);
                    value = arr.shift();
                    
                    arr.forEach(key => {
                        value = value[key];
                    });

                }catch(e){
                    value = 0;
                }
                return value || 0;
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
                for(let node in style){
                    var key = this.getCamelStyle(node);
                    if (typeof style[node] == 'number'){
                        html += `${key}:${style[node]}px;`;
                    } else {
                        html += `${key}:${style[node]};`;
                    }
                }
                return html;
            },
            // 获取父节点
            getParent(childId){
                var parentId = childId.substring(0, childId.length - 1);
                return this.tree2PlainObj[parentId] || {};
            },
            // 判断是否是兄弟
            isSibling(left, right){
                if (left.id.length !== right.id.length){
                    return false;
                }
                var parentId = left.id.substring(0, left.id.length - 1);
                if (parentId == right.id.substring(0, right.id.length - 1)){
                    return true;
                }
                return false;
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
                    queue = queue.concat( (node && node.child || []) );
                }
            },
        },

        mounted(){
            this.bindEvent();
        },
        created(){
            this.render(this.positionTree);
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
            >.positionGuide{
                visibility: visible;
            }
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
        visibility: hidden;
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
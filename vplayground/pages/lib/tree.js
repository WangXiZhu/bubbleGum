
var tree = {
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
            child: [
                {
                    id: "111",
                    child: [
                        {
                            id: "1111",
                        },
                        {
                            id: "1112",
                        },
                    ]
                },
                {
                    id: "112",
                },
                {
                    id: "113",
                }
            ],
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
            },
            child: [
                {
                    id: "121",
                },
                {
                    id: "122",
                }
            ],
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
};

// 广度遍历队列
function bfsTree(root){
    var queue = [];     
    queue.push(root);

    while(queue.length) {
        var node = queue.shift();
        cb && cb(node);
        if (Array.isArray(node.child) && node.child.length){
            queue = queue.concat(node.child);
        }
    }
}

var preListRec = [];



// 前序递归
function preOrder(node, cb){
    if (node) {
        preListRec.push(node.id);

        if (node.child && node.child instanceof Array) {
            node.child.forEach(child=>{
                preOrder(child);
            });
        }
    }
}

// 前序非递归
function preOrderRecursion (node){
    if (node.child) {
        var queue = [node];
        while(queue.length != 0) {
            node = queue.pop();
            preListRec.push(node.id);
            queue = queue.concat((node.child || []).reverse());
        } 
    }
}



// 中序遍历-> 只能针对二叉树
function midOrder(node){
    if (node){
        midOrder(node.left);
        preListRec.push(node.id);
        midOrder(node.right);        
    }
}

// 中序遍历-非递归
function midOrderUnRec(node){
    if (node) {
        var stack = [];
        while(stack.length ) {
            if (node) {
                stack.push(node.left);
                node = node.left;
            } else {
                stack.pop();
                preListRec.push(node.id);
                node = node.right;
            }
        }
    }
}


// 后序-递归
function postOrder(node, cb){
    if (node) {
        if (node.child && node.child instanceof Array) {
            node.child.forEach(child=>{
                postOrder(child);
            });
        } 
        cb && cb (node);
        // preListRec.push(node.id);
    }
}

// 后序-非递归
function postOrderUnRec(node){
    if (node){
        var queue = [node];
        while(queue.length != 0) {
            queue = queue.concat(node.child || []);
            preListRec.unshift(node.id);
            node = queue.pop();
        } 
    }
}

function main(){
    // preOrder(tree);
    // console.log(preListRec);
    
    // preListRec = [];
    // preOrderRecursion(tree);

    // midOrder(tree);

    postOrder(tree);
    console.log(preListRec);
    
    preListRec = [];
    postOrderUnRec(tree);
    console.log(preListRec);
}

// main();

module.exports = {
    postOrder
}

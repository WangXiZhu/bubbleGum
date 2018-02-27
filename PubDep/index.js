
var recorder = {};      // 记录

// recorder.list = [];     // 记录列表,会推送每个消息

// 优化，区分类型
recorder.list = {};

recorder.listen = function(key, fn ){
    // this.list.push(fn);
    if (!this.list[key]) {
        this.list[key] = [];        // 可能同一个事件有多个订阅者
    }
    this.list[key].push(fn);
}

recorder.trigger = function(){
    var key = Array.prototype.shift.call(arguments);
    
    if (!this.list[key] || !this.list[key].length){
        return;
    }
    for (let index = 0; index < this.list[key].length; index++) {
        var fn = this.list[key][index];
        fn.apply(this, arguments);
    }
}

recorder.listen('fn1', function(price){     // user1
    console.log('价格:',price);
});

recorder.listen('fn2',function(price){     // user2
    console.log('价格:',price);
});

recorder.trigger('fn1', 2);
recorder.trigger('fn2', 4);
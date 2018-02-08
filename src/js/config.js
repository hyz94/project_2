require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.gdsZoom/jquery.gdsZoom',
        'carousel':'../lib/carousel/carousel'
    },
    shim:{
        // 设置依赖

        
        'zoom':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.gdsZoom'
        },
        'carousel':{
            deps: ["jquery"],//设置依赖
            exports:'jQuery.prototype.carousel'
        }
    }
});
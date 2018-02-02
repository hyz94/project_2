require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.gdsZoom/jquery.gdsZoom'
    },
    shim:{
        // 设置依赖
        'zoom':['jquery'],
        // 'common':['jquery']
    }
});
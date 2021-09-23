/**
 * Created by baidm in 2021/8/7 on 14:50
 */
let fullScreen = function () {
    document.getElementById("map").requestFullscreen().then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    });
};
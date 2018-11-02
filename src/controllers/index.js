
class BaseHander{

    static async func1() {

        console.log("服务器已启动~")


    }
}

class FlowMomonitoring {
    static async sayHello(ctx) {
        console.log("hello 服务器已经启动")
        ctx.body = {
            "a" : 1,
            "b" : 2,
        }

    }

    static async show(ctx){
        console.log(ctx.request)
        ctx.body = ctx.request
    }
}

module.exports = {
    FlowMomonitoring
};
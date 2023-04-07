import { query_station_info } from '@/api/factory' //接口
export default class viewMap {
    constructor (numPoint, zoom) {
        this.numPoint = numPoint
        this.zoom = zoom
        this.map = new BMapGL.Map('container')
        this.initMap()
    }
    initMap () {
        let point = new BMapGL.Point(105.291, 37.094) //全国中心位置
        this.map.centerAndZoom(point, 5)
        this.map.enableScrollWheelZoom(true)
        this.onNumPoint()
        // 创建添加点标记
        // let marker = new BMapGL.Marker(point)
        // this.map.addOverlay(marker)
        // this.theLocation(118.920079, 32.086119, []) // 详情窗口
    }
    // 初始化所有点位
    onNumPoint () {
        const vm = this
        // eslint-disable-next-line no-array-constructor
        let point = new Array()// 定义数组标注经纬信息
        for (let i = 0; i < vm.numPoint.length; i++) { // 遍历
            point[i] = new BMapGL.Point(vm.numPoint[i].lng, vm.numPoint[i].lat)
            let marker = new BMapGL.Marker(point[i])// 坐标添加到Marker中
            vm.map.addOverlay(marker)
            // marker.setLabel(new BMapGL.Label(vm.numPoint[i].name))
            this.infoUniq(marker, vm.numPoint[i].uniq, point[i])
            // marker添加点击事件
            // marker.addEventListener('click', function (e) {
            //     // console.log(point[i])
            //     // let lng = Number(e.latLng.lng.toFixed(6))
            //     // let lat = Number(e.latLng.lat.toFixed(6))

            //     // vm.infoUniq(lng, lat)
            // })
        }
    }
    // 初始化加载所有弹框点位信息
    infoWin (marker, modalList) {
        let vm = this
        // 创建图文信息窗口
        let sContent = this.htmlView(modalList)
        let A = ''
        A = modalList.cname ? modalList.cname : '--'
        let opts = {
            title: A, // 信息窗口标题
            message: ''
        }
        let infoWindow = new BMapGL.InfoWindow(sContent, opts)
        marker.addEventListener('click', function () {
            this.openInfoWindow(infoWindow)
        })
    }
    // 初始化弹框
    infoUniq (marker, uniq) {
        let modalList = []
        const params = {
            station_uniq: uniq
        }
        query_station_info(params).then(res => {
            if (res.code === '00000') {
                modalList = res.data
                // 创建图文信息窗口
                this.infoWin(marker, modalList)
            }
        })
    }
    // 点击用经纬度设置地图中心点
    theLocation (lng, lat, modalList) {
        let vm = this
        let zoom = 14
        // this.map.clearOverlays() // 清空覆盖物
        let new_point = new BMapGL.Point(lng, lat)
        this.map.centerAndZoom(new_point, zoom) // 中心点  展示级别
        this.map.enableScrollWheelZoom(true)
        // 注释。如果点击再创建标注就会出现点击点位无法显示堂框
        // let marker = new BMapGL.Marker(new_point) // 创建标注
        // this.map.addOverlay(marker) // 将标注添加到地图中
        this.map.panTo(new_point) // 地图中心显示
        this.infoWins(new_point, modalList) // 详情窗口
    }

    // 点击自动显示弹框
    infoWins (new_point, modalList) {
        // 创建图文信息窗口
        let sContent = this.htmlView(modalList)
        let A = ''
        A = modalList.cname ? modalList.cname : '--'
        let opts = {
            title: A, // 信息窗口标题
            message: ''
        }
        let infoWindow = new BMapGL.InfoWindow(sContent, opts)
        this.map.openInfoWindow(infoWindow, new_point)
    }
　　// 自定义Dom
    htmlView (modalList) {
        return `
        <div style="width:560px;padding-left:15px;margin-top:10px">
        <div style="overflow: hidden;width:100%">
            <div style="float:left;width:50%">
                <p>
                    <span class="box_left">厂站状态 :</span>
                    <span style="display: inline-block;">
                        <img
                            style="width: 15px;height:15px; margin-right: 5px; margin-bottom: 2px;"
                            src="${modalList.status ? (modalList.status === 's' ? '/static/img/map/xh.png' : '/static/img/map/xh2.png') : ''}"
                            alt=""
                        />
                        ${modalList.status ? (modalList.status === 's' ? '已入网' : '未入网') : '--'}
                    </span>
                </p>
                <p>
                    <span class="box_left">处水能力 :</span>
                    <span>${ modalList.capacity ? modalList.capacity + '吨/天' : '--' } </span>
                </p>
                
                <p>
                    <span class="box_left">工艺介绍 :</span>
                    <span>${ modalList.description ? modalList.description : '--' }</span>
                </p>
                <p>
                    <span class="box_left">水质标准 :</span>
                    <span>${ modalList.water_standard ? modalList.water_standard : '--' }</span>
                </p>
                <p>
                    <span class="box_left">工艺标准 :</span>
                    <span>${ modalList.technology_standard ? modalList.technology_standard : '--' }</span>
                </p>
            </div>
            <div style="float:left;width:50%"">
                <p>
                    <span class="box_left">项目周期 :</span>
                    <span>${ modalList.op_stime ? modalList.op_stime : '--' } - ${ modalList.op_etime ? modalList.op_etime : '--' }</span>
                </p>
                <p>
                    <span class="box_left">项目地址 :</span>
                    <span style="overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">${ modalList.address ? modalList.address : '--' }</span>
                </p>
            </div>
        </div>
        </div>
        `
    }
}
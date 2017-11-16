$('.flexslider').flexslider();
$('a.topLink').click(function () {
  $('html, body').animate({
    scrollTop: $($(this).attr('href')).offset().top + 'px'
  }, {
    duration: 500,
    easing: 'swing'
  });
  return false;
});
$('.j-jump_more').click(function () {
  window.location.href = 'news.html';
});
var old = null;
$('.j-nav').each(function () {
  $(this).hover(
    function (e) {
      if (old == null) old = $(this).siblings('.active');
      $(this).addClass('active').siblings().removeClass('active');
    },
    function (e) {
      old.addClass('active').siblings().removeClass('active');
    });
});


//地图初始化时，在地图上添加一个marker标记,鼠标点击marker可弹出自定义的信息窗体
var marker;
var map = new AMap.Map('address-location', {
  resizeEnable: true,
  center: [120.2336800000, 30.2683300000],
  zoom: 17
});
addMarker();

//添加marker标记
function addMarker() {
  map.clearMap();
  marker = new AMap.Marker({
    map: map,
    position: [120.2336800000, 30.2683300000]
  });
  //鼠标点击marker弹出自定义的信息窗体
  AMap.event.addListener(marker, 'click', function () {
    infoWindow.open(map, marker.getPosition());
  });
}

//实例化信息窗体
var title = '木庄',
  content = [];
content.push('公司地址：杭州市江干区之江东路越秀维多利中心B幢5A' + '<br/>');
content.push('客服热线：0571-86779786');
var infoWindow = new AMap.InfoWindow({
  isCustom: true, //使用自定义窗体
  content: createInfoWindow(title, content.join('<br/>')),
  offset: new AMap.Pixel(20, -30)
});

infoWindow.open(map, marker.getPosition());

//构建自定义信息窗体
function createInfoWindow(title, content) {
  var info = document.createElement('div');
  info.className = 'info';

  //可以通过下面的方式修改自定义窗体的宽高
  info.style.width = '200px';
  // 定义顶部标题
  var top = document.createElement('div');
  var titleD = document.createElement('div');
  var closeX = document.createElement('img');
  top.className = 'info-top';
  titleD.innerHTML = title;
  closeX.src = 'http://webapi.amap.com/images/close2.gif';
  closeX.onclick = closeInfoWindow;

  top.appendChild(titleD);
  top.appendChild(closeX);
  info.appendChild(top);

  // 定义中部内容
  var middle = document.createElement('div');
  middle.className = 'info-middle';
  middle.style.backgroundColor = 'white';
  middle.innerHTML = content;
  info.appendChild(middle);

  return info;
}

//关闭信息窗体
function closeInfoWindow() {
  map.clearInfoWindow();
}

setTimeout(function () {
  $('.spinner-content').hide();
}, 500);

function isEmpty(str) {

    if (typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false;
}

/**
 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * @param str           : 체크할 문자열
 * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
 */
function nvl(str, defaultStr) {

    if (typeof str == "undefined" || str == null || str == "")
        str = defaultStr;

    return str;
}

function init() {
    var urlParams = location.search.split(/[?&]/).slice(1).map(function(paramPair) {

        return paramPair.split(/=(.+)?/).slice(0, 2);

    }).reduce(function(obj, pairArray) {

        obj[pairArray[0]] = pairArray[1];

        return obj;

    }, {});

    document.getElementById("uid").value = nvl(urlParams.code, "");

}

var clipboard = new ClipboardJS('.btn');
clipboard.on('success', function(e) {
    console.log(e);
});
clipboard.on('error', function(e) {
    console.log(e);
});

function inputcode(code) {
    //alert("test");
    var uid = document.getElementsByTagName('input')[0].value
    //alert(uid);
    //alert(code);
    $.ajax({
        type: 'POST',
        url: 'https://couponview.netmarble.com/coupon/sknightsmmo/1304/apply',
        data: {
            'pid': uid,
            'channelCode': 100,
            'couponCode': code,
            'worldId': '',
            'nickname': ''
        },
        success: function(data) {
            if (data['resultCode'] === 'SUCCESS') {
                alert('성공');
            } else if (data['resultCode'] === 'NOT_EXISTS_PID') {
                alert('계정코드 오류');
            } else if (data['resultCode'] === 'COUPON_ALREADY_USE') {
                alert('이미 사용한 쿠폰');
            } else if (data['resultCode'] === 'COUPON_WRONG') {
                alert('잘못된 쿠폰 코드');
            } else {
                alert('모르는 응답코드');
            }
        }
    })
}

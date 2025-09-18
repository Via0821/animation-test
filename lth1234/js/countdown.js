//DOMの解析終了時にブラウザから呼び出されるイベント。3通りの記述方法がある（どれも意味は同じ）
//$(document).ready(function() {
//$(function() {
	
	   function Keycheck() {
        var ele = document.getElementById('kc01'); 
        if(
        ele.className=="kc03"
        )
        {
                return true;
        }else
        {
                return false;
        }
   };

jQuery(function($) {

	//=============================================================
	// 動作設定
	//=============================================================
	var COKKIE_NAME = 'my_count';		//Cookieのデータ名を定義
	var COUNT_STOP_AFTER = 1;			//何日後にカウントダウン終了するか
	var SELECTOR_NAME = '.count';		//カウンタを設置するHTMLのセレクタ
	var STOP_MESSAGE = '終了しました';	//カウントダウン終了後の表示
	//=============================================================
	// 関数名：writeCookie
	// 引数　：key　cokkieに登録するキー
	// 引数　：v　　cokkieに登録する値
	// 備考　：指定されたキーと値の組み合わせをCookieに書き込む
	//=============================================================
	function writeCookie( key, v ){
		var str = key + "=" + escape( v ) + ";";
		var dt = new Date();
		dt.setDate( dt.getDate() + 100 );	//Cookieの有効期限：デフォルトは100日間とする
		str += "expires=" + dt.toGMTString() + ";";
		document.cookie = str;
		return false;
	}
	//=============================================================
	// 関数名：readCookie
	// 引数　：key　読取値が保存されているキー
	// 備考　：指定されたキーの値をCookieから読み取って返す
	//=============================================================
	function readCookie( key ){
		var sCookie = document.cookie;
		var aData = sCookie.split(";");			//Cookieの文字列を「;」で分割する
		var oExp = new RegExp(" ", "g");
		key = key.replace(oExp,"");				//keyからスペースを除去する（念のため）
		var i = 0;
		while ( aData[i] ) { 					//分割したCookieの中からkeyに該当する「key,valueの組み合わせ」を検索し、valueを抜き出す
			var aWord = aData[i].split("=");
			aWord[0] = aWord[0].replace( oExp,"");
			if( key == aWord[0] ) return unescape(aWord[1]);	//keyに該当するデータが見つかった場合、valueを返す
			if( ++i >= aData.length ) {			//keyに該当するデータが見つからなかった場合
				break;							//検索ループを強制的に抜ける
			}
		}
		return "";
	}
	//=============================================================
	// 関数名：addDay
	// 引数　：dateObj　日付加算の基準日
	// 引数　：day　　　加算する日数
	// 備考　：基準日に日数を加算した日付オブジェクトを返す
	//=============================================================
	function addDay (dateObj, day) {
		//return now + 540000;
		var date = new Date (dateObj);
		date.setDate(date.getDate () + day);
		//var count = (date  - (new Date));
		return date;
	}
	function computeDate() {
    var dt = now;
    var baseSec = dt.getTime();
	var targetSec = new Date("2025/4/2 23:59");
    //var addSec = 360000000;//日数 * 1日のミリ秒数
    //var targetSec = baseSec + addSec;
    dt.setTime(targetSec);
    return dt;
}

	function Zeropadding(number, digit) {
    var numberLength = String(number).length;
    if (digit > numberLength) {
        return (new Array((digit - numberLength) + 1).join(0)) + number;
    } else {
        return number;
    }
    }

	//=============================================================
	// 関数名：main
	// 引数　：なし
	// 備考　：カウントの残り時間を計算して画面に表示する
	//=============================================================
	function main () {
	
	if(Keycheck()==false){return;}
	
		//カウントダウン終了日までの残り日数をミリ秒単位で求める
		var count = (target_date  - (new Date));
		//表示文字列を作成
		
		n1 = Math.floor(count/86400000)
		n2 = (Math.floor(count/3600000) - Math.floor(count/86400000)*24)
		n3 = Math.floor(count/60000) - Math.floor(count/3600000)*60
		n4 = Math.floor(count/1000) - ( (Math.floor(count/3600000))*60*60 + (Math.floor(count/60000) - Math.floor(count/3600000)*60)*60 ) 
		n5=('00' + (count%1000)).slice(2,4)


		
		var timer_string = [
		'<span class="count_number">' +Zeropadding(n1,2)+ '</span>日'+
		'<span class="count_number">' +Zeropadding(n2,2)+ '</span>時間'+
		   '<span class="count_number">' +Zeropadding(n3,2)+ '</span>分'+
		   '<span class="count_number">' +Zeropadding(n4,2)+ '</span>秒',
		'<span class="count_number">' +Zeropadding(n5,2)+ '</span>',
		].join ('');


		//表示する
//		target.innerHTML = timer_string;
		target.html(timer_string);

		//まだ残り日時があれば20ミリ秒間隔で繰り返す
		if (0 < count) {
			setTimeout(main, 20);
		}
		//残り日時がなければ、カウントダウンを終了して表示を変更
		else {
//			target.innerHTML = STOP_MESSAGE;
			target.html(STOP_MESSAGE);
			return;
		}
	}


	//Cookieからカウントダウン終了日を読み込む
	var target_date = readCookie(COKKIE_NAME);

	//現在日時を取得
	var now = new Date;
	
	//Cookieにカウントダウン終了日があれば、文字列型から日付型オブジェクトに変換
	if (target_date) {
		target_date = Date.parse (target_date);
	}
	//Cookieにカウントダウン終了日が設定されていなければ（＝はじめてページを開いた場合）、
	//現在日時の「COUNT_STOP_AFTER」日後を終了日としてCookieに書き込む。
	else {
		target_date = computeDate();
		//writeCookie (COKKIE_NAME, String(target_date));
		target_date = +target_date;
	}

	//カウントを表示するHTML要素を取得
//	var target = document.getElementById(SELECTOR_NAME);
	var target = $(SELECTOR_NAME);
	
	//カウントダウンを実行
	main();

});	// end of jQuery

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

console.log("login動いてるよ");
// Initialize Firebase
var config = {
	apiKey: "AIzaSyCehyBWYJQ_CDE2SbwK_lGpvWDRsrQ4E8g",
	authDomain: "connect-2018.firebaseapp.com",
	databaseURL: "https://connect-2018.firebaseio.com",
	projectId: "connect-2018",
	storageBucket: "connect-2018.appspot.com",
	messagingSenderId: "1095684289814"
};
firebase.initializeApp(config);

// realtimedatabaseを使えるようにする
var database = firebase.database();

// DOMを登録
var inputarea = document.getElementById('login-input-area');
var newuser = document.getElementById('newuser');
var username = document.getElementById('username');
var login = document.getElementById('login');
var logout = document.getElementById('logout');
var info = document.getElementById('info');
var change_login = document.getElementById('change_login');
var change_user = document.getElementById('change_user');
var haveaccount = document.getElementById('haveaccount');
var connect_content = document.getElementById('connect_content');
var currentUser = void 0; //ログイン中ユーザーの認証に使う
var userId = void 0;
var name = void 0;

// 新規登録の処理
newuser.addEventListener('click', function (e) {
	// メールアドレスとパスワードを取得
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	name = document.getElementById('username').value;
	//新規ユーザーを登録
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
		alert('登録できません(' + error.message + ')');
		//上記をappendとかに書き換えよう
	});
});

// ログインの処理
login.addEventListener('click', function (e) {
	// メールアドレスとパスワードを取得
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	// ログインする
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		alert('ログインできません(' + error.message + ')');
		//上記をappendとかに書き換えよう
	});
});

// ログアウト処置
logout.addEventListener('click', function () {
	firebase.auth().signOut();
});

// 新規登録とログインの切り替え
change_login.addEventListener('click', function (e) {
	change_user.classList.remove('hide');
	change_login.classList.add('hide');
	username.classList.add('hide');
	newuser.classList.add('hide');
	login.classList.remove('hide');
});
change_user.addEventListener('click', function (e) {
	change_user.classList.add('hide');
	change_login.classList.remove('hide');
	username.classList.remove('hide');
	newuser.classList.remove('hide');
	login.classList.add('hide');
});

// 認証状態の確認
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);
		if (user.displayName === null) {
			runUserInfoRegister();
			createCounts();
		}
		loginDislay();
		disp_iraira();
		disp_nadenade();
	} else {
		logoutDisplay();
	}
});

// ユーザー情報を登録する
var runUserInfoRegister = function runUserInfoRegister() {
	console.log(name);
	var user = firebase.auth().currentUser;
	user.updateProfile({
		displayName: name
	});
};

//databaseにイライラカウントの雛が他を作成する
var createCounts = function createCounts() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//RealtimeDatabaseに登録
	firebase.database().ref('users/' + userId).set({
		iraira_number: 0,
		nadenade_number: 0
	});
};

// ログイン状態の表記関数s
function loginDislay() {
	logout.classList.remove('hide');
	inputarea.classList.add('hide');
	haveaccount.classList.add('hide');
	connect_content.classList.remove('hide');
	currentUser = firebase.auth().currentUser;
	userId = currentUser.uid;
	// databaseから取得して名前を右上に表示する
	var user = firebase.auth().currentUser;
	info.textContent = user.displayName;
}
function logoutDisplay() {
	logout.classList.add('hide');
	inputarea.classList.remove('hide');
	connect_content.classList.add('hide');
	info.textContent = "";
}

// import character_action from './character_action.js';
// この下のファイルを実は分離したい...

console.log("character_action動いてるよ");

// DOMを登録
var btn_iraira = document.getElementById('btn_iraira');
var btn_nadenade = document.getElementById('btn_nadenade');
var iraira_count = document.getElementById('iraira_count');
var nadenade_count = document.getElementById('nadenade_count');
var iraira_num = void 0;
var nadenade_num = void 0;

//イライラカウントを表示する
function disp_iraira() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//イライラを表示
	var iraira_countRef = firebase.database().ref('users/' + userId);
	iraira_countRef.on('value', function (snapshot) {
		iraira_count.textContent = snapshot.child('iraira_number').val();
	});
}

// なでなでカウントを表示する
function disp_nadenade() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//なでなでを表示
	var nadenade_countRef = firebase.database().ref('users/' + userId);
	nadenade_countRef.on('value', function (snapshot) {
		nadenade_count.textContent = snapshot.child('nadenade_number').val();
	});
}

//イライラを押したらイライラデータが更新される
btn_iraira.addEventListener('click', function (e) {
	// データベースから数字を持ってくる
});

},{}],2:[function(require,module,exports){
'use strict';

var _login = require('./components/login.js');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import character_action from './components/character_action.js';
// こっからスタート
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM読み込んだよ');
}); // import $ from 'jquery';

},{"./components/login.js":1}]},{},[2]);

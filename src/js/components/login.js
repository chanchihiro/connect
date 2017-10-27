console.log("login動いてるよ")
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
let database = firebase.database();


// DOMを登録
const inputarea = document.getElementById('login-input-area');
const newuser = document.getElementById('newuser');
const username = document.getElementById('username');
const login = document.getElementById('login');
const logout = document.getElementById('logout');
const info = document.getElementById('info');
const change_login = document.getElementById('change_login');
const change_user = document.getElementById('change_user');
const haveaccount = document.getElementById('haveaccount');
const connect_content = document.getElementById('connect_content');
const chara_img = document.getElementById('chara_img');
let currentUser; //ログイン中ユーザーの認証に使う
let userId;
let name;


// 新規登録の処理
newuser.addEventListener('click', function(e) {
	// メールアドレスとパスワードを取得
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	name = document.getElementById('username').value;
	//新規ユーザーを登録
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch( function(error) {
		alert('登録できません(' + error.message + ')');
		//上記をappendとかに書き換えよう
	});
});


// ログインの処理
login.addEventListener('click', function(e) {
	// メールアドレスとパスワードを取得
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	// ログインする
	firebase.auth().signInWithEmailAndPassword(email, password)
	.catch( function(error) {
		alert('ログインできません(' + error.message + ')');
		//上記をappendとかに書き換えよう
	});
});


// ログアウト処置
logout.addEventListener('click', function() {
	firebase.auth().signOut();
})


// 新規登録とログインの切り替え
change_login.addEventListener('click', function(e) {
	change_user.classList.remove('hide');
	change_login.classList.add('hide');
	username.classList.add('hide');
	newuser.classList.add('hide');
	login.classList.remove('hide');
});
change_user.addEventListener('click', function(e) {
	change_user.classList.add('hide');
	change_login.classList.remove('hide');
	username.classList.remove('hide');
	newuser.classList.remove('hide');
	login.classList.add('hide');
})


// 認証状態の確認
firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
		console.log(user);
		if(user.displayName === null) {
			runUserInfoRegister();
			createCounts();
		}
		loginDislay();
		disp_iraira();
		disp_nadenade();
	}else{
		logoutDisplay();
	}
});


// ユーザー情報を登録する
let runUserInfoRegister = function() {
	console.log(name);
	let user = firebase.auth().currentUser;
	user.updateProfile({
        displayName: name
    });
}


//databaseにイライラカウントの雛が他を作成する
let createCounts = function() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//RealtimeDatabaseに登録
	firebase.database().ref('users/' + userId).set({
		iraira_number: 0,
		nadenade_number: 0
	});
}


// ログイン状態の表記関数s
function loginDislay() {
	logout.classList.remove('hide');
	inputarea.classList.add('hide');
	haveaccount.classList.add('hide');
	connect_content.classList.remove('hide');
	currentUser = firebase.auth().currentUser;
	userId = currentUser.uid;
	// databaseから取得して名前を右上に表示する
	let user = firebase.auth().currentUser;
	info.textContent = user.displayName ;
}
function logoutDisplay() {
	logout.classList.add('hide');
	inputarea.classList.remove('hide');
	connect_content.classList.add('hide');
	haveaccount.classList.remove('hide');
	info.textContent = "";
}




// import character_action from './character_action.js';
// この下のファイルを実は分離したい...

console.log("character_action動いてるよ");

// DOMを登録
const btn_iraira = document.getElementById('btn_iraira');
const btn_nadenade = document.getElementById('btn_nadenade');
const iraira_count = document.getElementById('iraira_count');
const nadenade_count = document.getElementById('nadenade_count');
let iraira_num;
let nadenade_num;


//イライラカウントを表示する
function disp_iraira() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//イライラを表示
	let iraira_countRef = firebase.database().ref('users/' + userId);
	iraira_countRef.on('value', function(snapshot) {
		let ira_num = snapshot.child('iraira_number').val();
		iraira_count.textContent = ira_num;
		console.log(ira_num);
		chara_replace(ira_num);
	});
}


// なでなでカウントを表示する
function disp_nadenade() {
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//なでなでを表示
	let nadenade_countRef = firebase.database().ref('users/' + userId);
	nadenade_countRef.on('value', function(snapshot) {
		let nade_num = snapshot.child('nadenade_number').val();
		nadenade_count.textContent = nade_num;
		console.log(nade_num);
	});
}


//イライラを押したらイライラデータが更新されて、一定数を超えるとキャラの表示が変わる
btn_iraira.addEventListener('click', function(e) {
	// データベースから数字を持ってくる
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//イライラとなでなでをとる
	let iraira_countRef = firebase.database().ref('users/' + userId);
	iraira_countRef.on('value', function(snapshot) {
		iraira_num = snapshot.child('iraira_number').val();
		nadenade_num = snapshot.child('nadenade_number').val();
	});
	iraira_num = iraira_num + 1;
	nadenade_num = nadenade_num;
	iraira_countRef.set({
		iraira_number: iraira_num,
		nadenade_number: nadenade_num
	});
});

// 数字でキャラの表示を変える
function chara_replace(ira_num) {
	if(ira_num % 2 == 0) {
		chara_img.setAttribute('src', 'img/chara.png');
		console.log("ちゃら！");
	}else{
		chara_img.setAttribute('src', 'img/chara2.png');
		console.log("ちゃら2！");
	}
}


//なでなでを押したらイライラデータが更新される
btn_nadenade.addEventListener('click', function(e) {
	// データベースから数字を持ってくる
	//現在ログイン中のユーザーを取得
	currentUser = firebase.auth().currentUser;
	//現在ログインしているユーザーIDを取得
	userId = currentUser.uid;
	//なでなでとイライラをとる
	let iraira_countRef = firebase.database().ref('users/' + userId);
	iraira_countRef.on('value', function(snapshot) {
		iraira_num = snapshot.child('iraira_number').val();
		nadenade_num = snapshot.child('nadenade_number').val();
	});
	iraira_num = iraira_num;
	nadenade_num = nadenade_num + 1;
	iraira_countRef.set({
		iraira_number: iraira_num,
		nadenade_number: nadenade_num
	});
});



